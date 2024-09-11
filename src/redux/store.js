// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import accommodationsReducer from './accommodationsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    accommodations: accommodationsReducer, // Add the accommodations slice
  },
});

export default store;
