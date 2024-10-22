import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../services/internals/Cookies/getCookie';
import { LoginModel, RegisterModel } from '../types/Auths/auth';
import { loginUser, refreshAccessToken as apiRefreshAccessToken, registerUser } from '../services/apis/authService';
import { deleteCookie } from '../services/internals/Cookies/deleteCookie';
import { isTokenExpired } from '../services/internals/Cookies/isTokenExpired';
import { logout as logoutService, updateUserbiografyService } from '../services/apis/userService';
import alertify from 'alertifyjs';

export const checkAuthentication = createAsyncThunk(
  'auth/checkAuthentication',
  async (_, { dispatch }) => {

    const accessToken = getCookie('accessToken');
    if (accessToken && !isTokenExpired(accessToken)) {
      return true;
    } else if (accessToken && isTokenExpired(accessToken)) {
      const refreshResponse = await apiRefreshAccessToken();
      if (refreshResponse.success) {
        alertify.success(refreshResponse.message);
        return true;
      } else {
        await dispatch(logout());
        return false;
      }
    } else {
      return false;
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (model: LoginModel, { rejectWithValue }) => {
    try {
      const response = await loginUser(model);
      if (response?.success) {
        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (model: RegisterModel, { rejectWithValue }) => {
    try {
      const response = await registerUser(model);
      if (response.success) {
        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const updateUserbiografy = createAsyncThunk(
  'auth/updateUserbiografy',
  async (biografy: string, { rejectWithValue }) => {
    try {

      const response = await updateUserbiografyService(biografy);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }

  });

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {

      const response = await logoutService();
      if (response.success) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        return true;
      } else {
        return rejectWithValue('Token refresh failed');
      }
    } catch (error) {
      return rejectWithValue(error);
    }

  });

// Initial state
const initialState = {
  isAuthenticated: false,
  isCompleted: false,
  errorMessage: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // checkAuthentication
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
        state.isCompleted = true;
      })
      .addCase(checkAuthentication.rejected, (state) => {
        state.isAuthenticated = false;
        state.isCompleted = true;
      })
      // login
      .addCase(login.fulfilled, (state) => {
        state.isCompleted = true;
        state.isAuthenticated = true;
        state.errorMessage = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isCompleted = true;
        state.errorMessage = action.payload as string;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isCompleted = true;
      })
      // refreshAccessToken
      // .addCase(checkAuthentication.fulfilled, (state, action) => {
      //   state.isAuthenticated = action.payload;
      //   state.isCompleted = true;
      // })
      // .addCase(checkAuthentication.rejected, (state) => {
      //   state.isAuthenticated = false;
      //   state.isCompleted = true;
      // });
  }
});

export default authSlice.reducer;

