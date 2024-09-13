import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import accommodationsReducer from './accommodationsSlice.js';
import roomsReducer from './roomSlice.js';
import bookingsReducer from './bookingsSlice.js';
import usersReducer from './usersSlice.js';
import reviewsReducer from './reviewsSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    accommodations: accommodationsReducer, 
    rooms: roomsReducer,
    bookings: bookingsReducer,
    users: usersReducer, // Add this if managing users separately
    reviews: reviewsReducer,
  },
});

export default store;
