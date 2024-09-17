import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../src/firebaseConfig.js'; // Use db instead of firestore
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; // Import Firestore functions

export const bookRoomRequest = createAsyncThunk(
  'booking/bookRoomRequest',
  async ({ room, checkIn, checkOut, token }, thunkAPI) => {
    try {
      // Save booking to Firestore
      const bookingRef = doc(db, 'bookings', new Date().getTime().toString()); // Create a new document reference
      await setDoc(bookingRef, {
        room,
        checkIn,
        checkOut,
        token,
        createdAt: serverTimestamp() // Use serverTimestamp function
      });

      return { room, checkIn, checkOut, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookRoomRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(bookRoomRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings.push(action.payload);
      })
      .addCase(bookRoomRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default bookingSlice.reducer;
