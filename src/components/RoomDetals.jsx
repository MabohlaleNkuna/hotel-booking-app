import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomById } from '../../src/redux/roomSlice.js';
import BookingForm from './BookingForm.jsx';
import ReviewForm from './ReviewForm.jsx';

const RoomDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { room, loading, error } = useSelector((state) => state.rooms);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    dispatch(fetchRoomById(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log('Room:', room); // Debugging: check if room data is fetched
  }, [room]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
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

  return (
    <div>
      <h1>{room.name}</h1>
      {room.imageUrls && room.imageUrls.length > 0 ? (
        room.imageUrls.map((url, index) => (
          <img key={index} src={url} alt={room.name} style={{ width: '100%', height: 'auto', marginBottom: '15px' }} />
        ))
      ) : (
        <p>No images available</p>
      )}
      <p>{room.description}</p>
      <p>Capacity: {room.capacity}</p>
      <p>Price: R{room.price}</p>
      <p>Amenities: {Array.isArray(room.amenities) ? room.amenities.join(', ') : 'N/A'}</p>
      <button onClick={handleBookRoom}>Book Now</button>
      <button onClick={handleReviewRoom}>Leave a Review</button>

      {showBookingForm && (
        <BookingForm
          room={room}
          onClose={handleCloseBooking}
        />
      )}

      {showReviewForm && (
        <ReviewForm
          room={room}
          onClose={handleCloseReview}
        />
      )}
    </div>
  );
};

export default RoomDetailsPage;
