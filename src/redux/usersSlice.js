import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const removeUser = createAsyncThunk('users/removeUser', async (userId) => {
  await deleteDoc(doc(db, 'users', userId));
  return userId;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  }
});

export default usersSlice.reducer;
