import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, storage } from '../firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const querySnapshot = await getDocs(collection(db, 'rooms'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addRoom = createAsyncThunk('rooms/addRoom', async ({ newRoomData, imageFiles }) => {
  const imageUrls = [];
  for (const imageFile of imageFiles) {
    const storageRef = ref(storage, `rooms/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);
    imageUrls.push(imageUrl);
  }
  const docRef = await addDoc(collection(db, 'rooms'), { ...newRoomData, imageUrls });
  return { id: docRef.id, ...newRoomData, imageUrls };
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
  return { id, updatedData: { ...updatedData, imageUrls } };
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id) => {
  await deleteDoc(doc(db, 'rooms', id));
  return id;
});

const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editRoom.fulfilled, (state, action) => {
        const index = state.list.findIndex((room) => room.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...action.payload.updatedData };
        }
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.list = state.list.filter((room) => room.id !== action.payload);
      });
  },
});

export default roomSlice.reducer;
