import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomById } from '../../src/redux/roomSlice.js';
import { fetchReviewsForRoom } from '../../src/redux/reviewsSlice.js';
import BookingForm from './BookingForm.jsx';
import ReviewForm from './ReviewForm.jsx';

const RoomDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { room, loading, error } = useSelector((state) => state.rooms);
  const { reviews, loading: reviewsLoading, error: reviewsError } = useSelector((state) => state.reviews);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReviews, setShowReviews] = useState(false); // State to manage review visibility

  useEffect(() => {
    dispatch(fetchRoomById(id));
    dispatch(fetchReviewsForRoom(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log('Room:', room);
  }, [room]);

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
  
      <button style={styles.button} onClick={handleBookRoom}>Book Now</button>
      <button style={styles.button} onClick={handleReviewRoom}>Leave a Review</button>

      {showBookingForm && (
        <BookingForm room={room} onClose={handleCloseBooking} />
      )}

      {showReviewForm && (
        <ReviewForm room={room} onClose={handleCloseReview} />
      )}

      {/* Reviews section */}
      <div style={styles.reviewsSection}>
        <h2 style={styles.reviewsHeading}>Reviews</h2>
        <a href="#" onClick={toggleReviews} style={styles.reviewToggleLink}>
          {showReviews ? 'Hide Reviews' : 'Show Reviews'}
        </a>
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
    marginLeft: '5px', 
  },
  review: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    marginBottom: '10px',
    
  },
  reviewToggleLink: {
    color: '#004aad',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '20px',
    display: 'block',
    marginLeft: '5px', 
  },
  reviewsSection: {
    marginTop: '20px',
  },
  reviewsHeading: {
    color: '#004aad',
    marginLeft: '5px', 
    marginBottom: '10px',
  },
};

export default RoomDetailsPage;
