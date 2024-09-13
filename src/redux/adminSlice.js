import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebaseConfig.js';
import { collection, getDocs } from 'firebase/firestore';

// Async Thunks
export const fetchRooms = createAsyncThunk('admin/fetchRooms', async () => {
  const querySnapshot = await getDocs(collection(db, 'rooms'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const fetchAccommodations = createAsyncThunk('admin/fetchAccommodations', async () => {
  const querySnapshot = await getDocs(collection(db, 'accommodations'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// Slice Definition
const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    rooms: [],
    accommodations: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous error
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAccommodations.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.loading = false;
        state.accommodations = action.payload;
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
