import { createSlice } from '@reduxjs/toolkit';
import { authOperations } from './auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isModalLog: false,
  isModalReg: false,
};

const authSlice = createSlice({
  name: 'auth',
  reducers: {
    logModalOpen: (state, _) => {
      state.isModalLog = true;
      state.isModalReg = false;
    },
    logModalClose: (state, _) => {
      state.isModalLog = false;
    },
    regModalOpen: (state, _) => {
      state.isModalReg = true;
      state.isModalLog = false;
    },
    regModalClose: (state, _) => {
      state.isModalReg = false;
    },
  },
  initialState,
  extraReducers: builder => {
    builder.addCase(authOperations.register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    });
    builder.addCase(authOperations.logIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    });
    builder.addCase(authOperations.logOut.fulfilled, state => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    });
    builder.addCase(authOperations.refresh.pending, state => {
      state.isRefreshing = true;
    });
    builder.addCase(authOperations.refresh.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    });
    builder.addCase(authOperations.refresh.rejected, state => {
      state.isRefreshing = false;
    });
  },
});

export const { logModalOpen, regModalOpen, logModalClose, regModalClose } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
