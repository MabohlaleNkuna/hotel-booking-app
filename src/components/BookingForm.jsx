import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bookRoomRequest } from '../../src/redux/bookingSlice.js'; 
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Stripe's test key
const stripePromise = loadStripe('pk_test_51PzVFSRpGIk6DHpcj0EOqcKYvLEvHOqqiegKzczzNzsMtdERTyN8vekJB8X0DWoGfty1MLY3jhDDitC32xD2UDMF00lv91Ixh5');

const BookingForm = ({ room, onClose }) => {
  const dispatch = useDispatch();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [paymentToken, setPaymentToken] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const calculateTotalAmount = () => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const numDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    return room.pricePerNight * numDays;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setPaymentError('Stripe has not yet loaded.');
      return;
    }

    if (!checkIn || !checkOut) {
      setPaymentError('Please select check-in and check-out dates.');
      return;
    }

    const { error, token } = await stripe.createToken(elements.getElement(CardElement));
    if (error) {
      setPaymentError(error.message);
      return;
    }

    setPaymentToken(token.id); // Save the payment token for review

    setIsReviewing(true); // Switch to the review form
  };

  const handleConfirmBooking = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setPaymentError('Stripe has not yet loaded.');
      return;
    }

    try {
      await dispatch(bookRoomRequest({ room, checkIn, checkOut, token: paymentToken })).unwrap();
      
      // Save receipt data to local storage
      localStorage.setItem('receipt', JSON.stringify({
        room: room.name,
        amount: calculateTotalAmount().toFixed(2),
        paymentMethod: 'Visa',
        date: new Date().toLocaleDateString(),
      }));

      setSuccessMessage('Booking successful! Receipt will be available on the Room Details page.');
      setTimeout(() => {
        onClose();
      }, 2000); // Close the form after 2 seconds
    } catch (err) {
      setPaymentError('Failed to book room. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', maxWidth: '400px', margin: '0 auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ color: '#004AAD' }}>Book {room.name}</h2>
      {!isReviewing ? (
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Check-in Date:
            <input 
              type="date" 
              value={checkIn} 
              onChange={(e) => setCheckIn(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #004AAD' }} 
            />
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Check-out Date:
            <input 
              type="date" 
              value={checkOut} 
              onChange={(e) => setCheckOut(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #004AAD' }} 
            />
          </label>
          <label style={{ display: 'block', marginBottom: '20px' }}>
            Payment Details:
            <div style={{ padding: '10px', border: '1px solid #004AAD', borderRadius: '5px' }}>
              <CardElement />
            </div>
          </label>
          <button 
            type="submit" 
            disabled={!stripe} 
            style={{ backgroundColor: '#004AAD', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
          >
            Review Booking
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            style={{ backgroundColor: '#ccc', color: '#333', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Close
          </button>
        </form>
      ) : (
        <div>
          <h3>Booking Summary</h3>
          <p><strong>Room:</strong> {room.name}</p>
          <p><strong>Check-in Date:</strong> {checkIn}</p>
          <p><strong>Check-out Date:</strong> {checkOut}</p>
          <p><strong>Total Amount:</strong> R{calculateTotalAmount().toFixed(2)}</p>
          <p><strong>Payment Token:</strong> {paymentToken}</p> {/* Display payment token */}
          <form onSubmit={handleConfirmBooking}>
            {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <button 
              type="submit" 
              disabled={!stripe} 
              style={{ backgroundColor: '#004AAD', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
            >
              Confirm Booking
            </button>
            <button 
              type="button" 
              onClick={() => setIsReviewing(false)} 
              style={{ backgroundColor: '#ccc', color: '#333', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Back
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ backgroundColor: '#ccc', color: '#333', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const WrappedBookingForm = (props) => (
  <Elements stripe={stripePromise}>
    <BookingForm {...props} />
  </Elements>
);

export default WrappedBookingForm;
