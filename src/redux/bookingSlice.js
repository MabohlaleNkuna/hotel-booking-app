import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../src/firebaseConfig.js'; 
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; 

export const bookRoomRequest = createAsyncThunk(
  'booking/bookRoomRequest',
  async ({ room, checkIn, checkOut, token }, thunkAPI) => {
    try {
 
      const bookingRef = doc(db, 'bookings', new Date().getTime().toString()); 
      await setDoc(bookingRef, {
        room,
        checkIn,
        checkOut,
        token,
        createdAt: serverTimestamp() 
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
