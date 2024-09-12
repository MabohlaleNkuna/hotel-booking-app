import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import accommodationsReducer from './accommodationsSlice.js';
import roomsReducer from './roomSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    accommodations: accommodationsReducer, 
    rooms: roomsReducer,
  },
});

export default store;
