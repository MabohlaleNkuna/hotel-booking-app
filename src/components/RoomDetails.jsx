import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomById } from '../redux/roomSlice.js';
import { fetchReviewsForRoom } from '../redux/reviewsSlice.js';
import BookingForm from './BookingForm.jsx';
import ReviewForm from './ReviewForm.jsx';
import { FaTimes } from 'react-icons/fa'; 
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
    <div className="container bg-light p-4 rounded shadow-sm">
      <h1 className="text-center text-primary mb-4">{room.name}</h1>
      
      <button
        className="btn btn-danger position-absolute top-0 end-0 m-3"
        onClick={() => window.history.back()}
      >
        <FaTimes />
      </button>

      {room.imageUrls && room.imageUrls.length > 0 ? (
        room.imageUrls.map((url, index) => (
          <img key={index} src={url} alt={room.name} className="img-fluid rounded mb-3 shadow-sm" />
        ))
      ) : (
        <p className="text-muted">No images available</p>
      )}

      <p className="lead">{room.description}</p>
      <p><strong>Capacity:</strong> {room.capacity}</p>
      <p><strong>Price:</strong> R{room.price}</p>
      <p><strong>Amenities:</strong> {Array.isArray(room.amenities) ? room.amenities.join(', ') : 'N/A'}</p>
      <p><strong>Room Type:</strong> {room.roomType}</p>

      <button className="btn btn-primary mb-2" onClick={handleBookRoom}>Book Now</button>
      <button className="btn btn-secondary" onClick={handleReviewRoom}>Leave a Review</button>

      {showBookingForm && (
        <BookingForm room={room} onClose={handleCloseBooking} onBookingSuccess={handleBookingSuccess} />
      )}

      {showReviewForm && (
        <ReviewForm room={room} onClose={handleCloseReview} />
      )}

      {bookingSummary && (
        <div className="mt-4 p-3 bg-white rounded shadow-sm">
          <h2 className="text-primary mb-3">Booking Summary</h2>
          <p><strong>Room:</strong> {bookingSummary.room}</p>
          <p><strong>Check-in Date:</strong> {bookingSummary.checkIn}</p>
          <p><strong>Check-out Date:</strong> {bookingSummary.checkOut}</p>
          <p><strong>Total Amount:</strong> R{bookingSummary.amount}</p>
          <p><strong>Payment Method:</strong> {bookingSummary.paymentMethod}</p>
          <p><strong>Date:</strong> {bookingSummary.date}</p>
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-primary mb-3">Reviews</h2>
        <span onClick={toggleReviews} className="text-primary cursor-pointer">
          {showReviews ? 'Hide Reviews' : 'Show Reviews'}
        </span>
        {showReviews && (
          <div>
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review.id} className="bg-white p-3 rounded shadow-sm mb-3">
                  <p><strong>Rating:</strong> {review.rating} ★</p>
                  <p>{review.review}</p>
                  <p className="text-muted"><em>{new Date(review.timestamp.toDate()).toLocaleString()}</em></p>
                </div>
              ))
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetailsPage;
