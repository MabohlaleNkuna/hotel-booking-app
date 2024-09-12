// accommodationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions


export const fetchAccommodations = createAsyncThunk('accommodations/fetchAccommodations', async () => {
  const snapshot = await db.collection('accommodations').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addAccommodation = createAsyncThunk('accommodations/addAccommodation', async ({ newAccommodationData, imageFile }) => {

  let imageUrl = '';
  if (imageFile) {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(storageRef);
  }

 
  const docRef = await db.collection('accommodations').add({
    ...newAccommodationData,
    imageUrl,
  });
  return { id: docRef.id, ...newAccommodationData, imageUrl };
});

export const editAccommodation = createAsyncThunk('accommodations/editAccommodation', async ({ id, updatedData, imageFile }) => {
 
  let imageUrl = updatedData.imageUrl;
  if (imageFile) {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(storageRef);
  }

  
  await db.collection('accommodations').doc(id).update({
    ...updatedData,
    imageUrl,
  });
  return { id, updatedData: { ...updatedData, imageUrl } };
});

export const removeAccommodation = createAsyncThunk('accommodations/removeAccommodation', async (id) => {
  await db.collection('accommodations').doc(id).delete();
  return id;
});

// Slice
const accommodationsSlice = createSlice({
  name: 'accommodations',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addAccommodation.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editAccommodation.fulfilled, (state, action) => {
        const index = state.list.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...action.payload.updatedData };
        }
      })
      .addCase(removeAccommodation.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      });
  },
});

export default accommodationsSlice.reducer;
