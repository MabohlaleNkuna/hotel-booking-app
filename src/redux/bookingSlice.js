// redux/bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Booking actions
    bookRoomRequest: (state) => {
      state.loading = true;
    },
    bookRoomSuccess: (state, action) => {
      state.loading = false;
      state.bookings.push(action.payload);
    },
    bookRoomFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Review actions
    addReviewRequest: (state) => {
      state.loading = true;
    },
    addReviewSuccess: (state, action) => {
      state.loading = false;
      state.reviews.push(action.payload);
    },
    addReviewFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear errors
    clearBookingError: (state) => {
      state.error = null;
    },
  },
});

export const {
  bookRoomRequest,
  bookRoomSuccess,
  bookRoomFailure,
  addReviewRequest,
  addReviewSuccess,
  addReviewFailure,
  clearBookingError,
} = bookingSlice.actions;

export default bookingSlice.reducer;
