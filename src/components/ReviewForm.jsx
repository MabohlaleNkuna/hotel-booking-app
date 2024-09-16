import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReviewRequest } from '../../src/redux/bookingSlice.js'; 

const ReviewForm = ({ room, onClose }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addReviewRequest({ roomId: room.id, review }));
    onClose();
  };

  return (
    <div className="review-form">
      <h2>Review for {room.name}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default ReviewForm;
