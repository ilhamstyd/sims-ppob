import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { profile, setAuthToken, profileEdit, ProfileEditImage, Balance, Services, Banner, Topup, Transaction, ListTransaction } from '../config/api';
import Swal from 'sweetalert2';

const profileAdapter = createEntityAdapter();
export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async () => {
      setAuthToken(localStorage.getItem("authToken"))
    try {
      const response = await profile()
      return response.data.data;
    } catch (error) {
        console.log("kesalahan profile :", error)
      throw error;
    }
  }
);

export const editProfileAsync = createAsyncThunk(
    'profile/editProfile',
    async (profileData) => {
      setAuthToken(localStorage.getItem('authToken'));
      try {
        const response = await profileEdit(profileData); // Use your API function to update profile
        console.log("ini dari edit profile", response.data.data)
        return response.data.data;
      } catch (error) {
        console.log('kesalahan edit profile :', error);
        throw error.response.data.message;
      }
    }
  );
export const editProfileImageAsync = createAsyncThunk(
    'profile/editProfileImage',
    async (profileData) => {
      setAuthToken(localStorage.getItem('authToken'));
      try {
        const response = await ProfileEditImage(profileData); // Use your API function to update profile
        console.log("ini dari edit image", response.data.data)
        return response.data.data;
      } catch (error) {
        console.log('kesalahan edit image :', error);
        throw error.response.data.message;
      }
    }
  );

  export const fetchBalance = createAsyncThunk(
    'profile/fetchBalance',
    async () => {
      setAuthToken(localStorage.getItem("authToken"))
    try {
      const response = await Balance()
      return response.data.data;
    } catch (error) {
        console.log("kesalahan balance :", error)
      throw error;
    }
  }
);
  export const fetchServices = createAsyncThunk(
    'profile/fetchServices',
    async () => {
      setAuthToken(localStorage.getItem("authToken"))
    try {
      const response = await Services()
      console.log("ini service :", response.data.data);
      return response.data.data;
    } catch (error) {
        console.log("kesalahan services :", error)
      throw error;
    }
  }
);

  export const fetchBanner = createAsyncThunk(
    'profile/fetchBanner',
    async () => {
      setAuthToken(localStorage.getItem("authToken"))
    try {
      const response = await Banner()
      console.log("ini banner", response.data);
      return response.data.data;
    } catch (error) {
        console.log("kesalahan banner :", error)
      throw error;
    }
  }
);

export const TopUpMoney = createAsyncThunk(
  'profile/topup',
  async (profileData) => {
    setAuthToken(localStorage.getItem('authToken'));
    try {
      const response = await Topup(profileData); // Use your API function to update profile
      console.log("ini dari top up", response.data.data)
      return response.data.data;
    } catch (error) {
      console.log('kesalahan top up :', error);
      throw error.response.data.message;
    }
  }
);
export const TransactioAsync = createAsyncThunk(
  'profile/transaction',
  async (profileData) => {
    setAuthToken(localStorage.getItem('authToken'));
    try {
      const response = await Transaction(profileData); // Use your API function to update profile
      console.log("ini transaction", response.data.data)
      return response.data.data;
    } catch (error) {
      console.log('kesalahan transaction:', error);
      throw error.response.data.message;
    }
  }
);
export const listTransactionAsync = createAsyncThunk(
  'profile/listTransaction',
  async ({offset, limit}) => {
    setAuthToken(localStorage.getItem("authToken"))
  try {
    const response = await ListTransaction(offset, limit)
    console.log("ini list transaction", response.data.data);
    return response.data.data.records;
  } catch (error) {
    Swal.fire({
      position:'center',
      icon: 'error',
      title: 'Gagal Top Up',
      text: `${error.response.data.message}`,
    });
    throw error;
  }
}
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    merges:{
      data: null,
      balance:null,
      services:null,
      banner:null,
      transaction:[],
      offset:0,
      limit:5,
    },
    error: null,
    status: 'idle',
  },
  reducers: {
    incrementOffset: (state) => {
      state.offset += state.limit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(editProfileAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editProfileAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(editProfileAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editProfileImageAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editProfileImageAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(editProfileImageAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
        state.balance = action.payload.balance;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'success';
        state.merges.services = action.payload;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.status = 'success';
        state.merges.banner = action.payload;
      })
      .addCase(TopUpMoney.fulfilled, (state, action) => {
        state.status = 'success';
        state.merges.balance = action.payload;
      })
      .addCase(TransactioAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.merges.balance = action.payload;
      })
      .addCase(listTransactionAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.merges.transaction =state.merges.transaction.concat(action.payload);
      });
  },
});

export default profileSlice.reducer;
export const { selectAll: selectAllprofiles } = profileAdapter.getSelectors((state) => state.profile.merges);
export const {incrementOffset} = profileSlice.actions;