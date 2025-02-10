import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomById } from '../redux/roomSlice.js';
import { fetchReviewsForRoom } from '../redux/reviewsSlice.js';
import BookingForm from './BookingForm.jsx';
import ReviewForm from './ReviewForm.jsx';

const RoomDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { room, loading, error } = useSelector((state) => state.rooms);
  const { reviews, loading: reviewsLoading, error: reviewsError } = useSelector((state) => state.reviews);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [bookingSummary, setBookingSummary] = useState(null);

  useEffect(() => {
    dispatch(fetchRoomById(id));
    dispatch(fetchReviewsForRoom(id));
  }, [dispatch, id]);

  if (loading || reviewsLoading) return <p>Loading...</p>;
  if (error || reviewsError) return <p>Error: {error || reviewsError}</p>;
  if (!room) return <p>Room not found</p>;

  const handleBookRoom = () => {
    setShowBookingForm(true);
  };

  const handleCloseBooking = () => {
    setShowBookingForm(false);
  };

  const handleReviewRoom = () => {
    setShowReviewForm(true);
  };

  const handleCloseReview = () => {
    setShowReviewForm(false);
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const handleBookingSuccess = (summary) => {
    setBookingSummary(summary);
    setShowBookingForm(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{room.name}</h1>
      {room.imageUrls && room.imageUrls.length > 0 ? (
        room.imageUrls.map((url, index) => (
          <img key={index} src={url} alt={room.name} style={styles.image} />
        ))
      ) : (
        <p style={styles.text}>No images available</p>
      )}
      <p style={styles.text}>{room.description}</p>
      <p style={styles.text}>Capacity: {room.capacity}</p>
      <p style={styles.text}>Price: R{room.price}</p>
      <p style={styles.text}>Amenities: {Array.isArray(room.amenities) ? room.amenities.join(', ') : 'N/A'}</p>
      <p style={styles.text}>Room Type: {room.roomType}</p>

      <button style={styles.button} onClick={handleBookRoom}>Book Now</button>
      <button style={styles.button} onClick={handleReviewRoom}>Leave a Review</button>

      {showBookingForm && (
        <BookingForm room={room} onClose={handleCloseBooking} onBookingSuccess={handleBookingSuccess} />
      )}

      {showReviewForm && (
        <ReviewForm room={room} onClose={handleCloseReview} />
      )}

      {bookingSummary && (
        <div style={styles.bookingSummary}>
          <h2 style={styles.summaryHeading}>Booking Summary</h2>
          <p style={styles.text}><strong>Room:</strong> {bookingSummary.room}</p>
          <p style={styles.text}><strong>Check-in Date:</strong> {bookingSummary.checkIn}</p>
          <p style={styles.text}><strong>Check-out Date:</strong> {bookingSummary.checkOut}</p>
          <p style={styles.text}><strong>Total Amount:</strong> R{bookingSummary.amount}</p>
          <p style={styles.text}><strong>Payment Method:</strong> {bookingSummary.paymentMethod}</p>
          <p style={styles.text}><strong>Date:</strong> {bookingSummary.date}</p>
        </div>
      )}

      <div style={styles.reviewsSection}>
        <h2 style={styles.reviewsHeading}>Reviews</h2>
        <span onClick={toggleReviews} style={styles.reviewToggleLink} role="button" tabIndex="0">
          {showReviews ? 'Hide Reviews' : 'Show Reviews'}
        </span>
        {showReviews && (
          <div>
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review.id} style={styles.review}>
                  <p style={styles.text}><strong>Rating:</strong> {review.rating} ★</p>
                  <p style={styles.text}>{review.review}</p>
                  <p style={styles.text}><em>{new Date(review.timestamp.toDate()).toLocaleString()}</em></p>
                </div>
              ))
            ) : (
              <p style={styles.text}>No reviews yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Styling object
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f8ff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color: '#333',
  },
  heading: {
    color: '#004aad',
    textAlign: 'center',
    marginBottom: '20px',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  text: {
    color: '#333',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
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
  summaryHeading: {
    color: '#004aad',
    marginBottom: '15px',
  },
  reviewsSection: {
    marginTop: '30px',
  },
  reviewsHeading: {
    color: '#004aad',
    marginBottom: '10px',
  },
  review: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  reviewToggleLink: {
    color: '#004aad',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default RoomDetailsPage;
