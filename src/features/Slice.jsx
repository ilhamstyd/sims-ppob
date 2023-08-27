import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { loginUser, registerUser} from '../config/api';

const userAdapter = createEntityAdapter();

export const registerUserAsync = createAsyncThunk(
  'user/registerUser',
  async (userData) => {
    try {
      const response = await registerUser(userData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (userData) => {
    try {
      const response = await loginUser(userData);
      return response.data;
    } catch (error) {
      console.log('Kesalahan dari API login:', error.response.data.message);
      throw error.response.data.message;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    ...userAdapter.getInitialState(),
    status: 'idle', 
    error: null,
    message: null,
    token: null, // Tambahkan default value untuk token
    user: null,  // Tambahkan default value untuk user
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        userAdapter.addOne(state, action.payload);
        state.status = 'success';
        state.message = action.payload.message;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.message = action.payload.message;
        state.token = action.payload.token;
        console.log("ini token bukan", action.payload.token);
        state.user = action.payload.user;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const { selectAll: selectAllUsers } = userAdapter.getSelectors((state) => state.user);