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
  
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    
    const { token, error } = await stripe.createToken(elements.getElement(CardElement));
    if (error) {
      setPaymentError(error.message);
      return;
    }
    
    dispatch(bookRoomRequest({ room, checkIn, checkOut, token: token.id }));
  };

  return (
    <div className="booking-form">
      <h2>Book {room.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Check-in Date:
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
        </label>
        <label>
          Check-out Date:
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
        </label>
        <label>
          Payment Details:
          <CardElement />
        </label>
        {paymentError && <p>{paymentError}</p>}
        <button type="submit" disabled={!stripe}>Submit</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

const WrappedBookingForm = (props) => (
  <Elements stripe={stripePromise}>
    <BookingForm {...props} />
  </Elements>
);

export default WrappedBookingForm;
