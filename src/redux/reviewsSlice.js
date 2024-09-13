import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../src/firebaseConfig.js';

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const snapshot = await getDocs(collection(db, 'reviews'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const removeReview = createAsyncThunk('reviews/removeReview', async (reviewId) => {
  await deleteDoc(doc(db, 'reviews', reviewId));
  return reviewId;
});

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: { reviews: [], loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchReviews.pending, state => { state.loading = true; })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(review => review.id !== action.payload);
      });
  }
});

export default reviewsSlice.reducer;
