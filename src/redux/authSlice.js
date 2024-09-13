import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../src/firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, name, phone }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), { name, email, phone, role: 'user' });
      return { uid: user.uid, name, email, phone };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null, success: null },
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = 'Registration successful!';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
