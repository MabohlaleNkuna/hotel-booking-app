import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomById } from '../redux/roomSlice.js';
import { fetchReviewsForRoom } from '../redux/reviewsSlice.js';
import { getAuth } from 'firebase/auth';
import BookingForm from './BookingForm.jsx';
import ReviewForm from './ReviewForm.jsx';

const RoomDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const { room, loading, error } = useSelector((state) => state.rooms);
  const { loading: reviewsLoading, error: reviewsError } = useSelector((state) => state.reviews);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [bookingSummary, setBookingSummary] = useState(null);

  useEffect(() => {
    dispatch(fetchRoomById(id));
    dispatch(fetchReviewsForRoom(id));
  }, [dispatch, id]);

  if (loading || reviewsLoading) return <p>Loading...</p>;
  if (error || reviewsError) return <p>Error: {error || reviewsError}</p>;
  if (!room) return <p>Room not found</p>;

  const handleBookRoom = () => {
    if (!user) {
      alert('Please log in to book a room.');
      navigate('/login');
    } else {
      setShowBookingForm(true);
    }
  };

  // Initialize price to ensure no NaN errors
  const price = room?.price ? parseFloat(room.price) : 0;

  // Calculate the number of days for booking
  const calculateNumberOfDays = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const differenceInTime = checkOut.getTime() - checkIn.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days
    return differenceInDays;
  };

  return (
    <div style={styles.container}>
      <button style={styles.closeButton} onClick={() => navigate(-1)}>✖</button>
      <h1 style={styles.heading}>{room.name}</h1>
      {room.imageUrls?.length > 0 ? (
        room.imageUrls.map((url, index) => <img key={index} src={url} alt={room.name} style={styles.image} />)
      ) : (
        <p style={styles.text}>No images available</p>
      )}
      <p style={styles.text}>{room.description}</p>
      <p style={styles.text}>Capacity: {room.capacity}</p>
      <p style={styles.text}>Price: R{price.toFixed(2)}</p>
      <p style={styles.text}>Amenities: {Array.isArray(room.amenities) ? room.amenities.join(', ') : 'N/A'}</p>
      <p style={styles.text}>Room Type: {room.roomType}</p>
      <button style={styles.button} onClick={handleBookRoom}>Book Now</button>
      <button style={styles.button} onClick={() => setShowReviewForm(true)}>Leave a Review</button>
      {showBookingForm && <BookingForm room={room} onClose={() => setShowBookingForm(false)} onBookingSuccess={setBookingSummary} />}
      {showReviewForm && <ReviewForm room={room} onClose={() => setShowReviewForm(false)} />}
      {bookingSummary && (
        <div style={styles.bookingSummary}>
          <h2 style={styles.summaryHeading}>Booking Summary</h2>
          <p style={styles.text}><strong>Room:</strong> {bookingSummary.room}</p>
          <p style={styles.text}><strong>Check-in Date:</strong> {bookingSummary.checkIn}</p>
          <p style={styles.text}><strong>Check-out Date:</strong> {bookingSummary.checkOut}</p>
          <p style={styles.text}><strong>Total Amount:</strong> R{(price * calculateNumberOfDays(bookingSummary.checkIn, bookingSummary.checkOut)).toFixed(2)}</p>
          <p style={styles.text}><strong>Payment Method:</strong> {bookingSummary.paymentMethod}</p>
          <p style={styles.text}><strong>Date:</strong> {bookingSummary.date}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f8ff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color: '#333',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#pink',
  },
  heading: { color: '#004aad', textAlign: 'center', marginBottom: '20px' },
  image: { width: '100%', height: 'auto', borderRadius: '10px', marginBottom: '15px' },
  text: { fontSize: '16px', lineHeight: '1.6', marginBottom: '10px' },
  button: {
    backgroundColor: '#004aad',
    color: '#fff',
    padding: '10px 20px',
    margin: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  bookingSummary: {
    marginTop: '20px',
    padding: '15px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  summaryHeading: { color: '#004aad', marginBottom: '15px' },
};

export default RoomDetailsPage;
