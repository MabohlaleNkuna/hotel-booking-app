import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, storage } from '../firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Async Thunks
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const querySnapshot = await getDocs(collection(db, 'rooms'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addRoom = createAsyncThunk('rooms/addRoom', async (roomData) => {
  const { name, description, capacity, price, amenities, roomType, imageFiles } = roomData;
  const imageUrls = [];

  for (const imageFile of imageFiles) {
    const storageRef = ref(storage, `rooms/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);
    imageUrls.push(imageUrl);
  }

  const docRef = await addDoc(collection(db, 'rooms'), {
    name,
    description,
    capacity,
    price,
    amenities,
    roomType,
    imageUrls,
  });

  return { id: docRef.id, name, description, capacity, price, amenities, roomType, imageUrls };
});

export const editRoom = createAsyncThunk('rooms/editRoom', async ({ id, updatedData, imageFiles }) => {
  const imageUrls = updatedData.imageUrls || [];
  if (imageFiles && imageFiles.length > 0) {
    for (const imageFile of imageFiles) {
      const storageRef = ref(storage, `rooms/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);
      imageUrls.push(imageUrl);
    }
  }
  await updateDoc(doc(db, 'rooms', id), { ...updatedData, imageUrls });
  return { id, ...updatedData, imageUrls };
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id) => {
  await deleteDoc(doc(db, 'rooms', id));
  return id;
});

// Slice Definition
const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(editRoom.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(room => room.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(editRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(room => room.id !== action.payload);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default roomSlice.reducer;
