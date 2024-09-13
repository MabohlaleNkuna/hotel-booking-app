import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../src/firebaseConfig.js';

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
  const snapshot = await getDocs(collection(db, 'bookings'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const updateBookingStatus = createAsyncThunk('bookings/updateBookingStatus', async ({ bookingId, status }) => {
  const bookingRef = doc(db, 'bookings', bookingId);
  await updateDoc(bookingRef, { status });
  return { bookingId, status };
});

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: { bookings: [], loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchBookings.pending, state => { state.loading = true; })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const { bookingId, status } = action.payload;
        const index = state.bookings.findIndex(booking => booking.id === bookingId);
        if (index !== -1) state.bookings[index].status = status;
      });
  }
});

export default bookingsSlice.reducer;
