import { createSlice } from "@reduxjs/toolkit";
import { logIn, signUp } from "../operations";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const initialState = {
  user: { name: null, email: null, photo: null, id: null },
  accessToken: null,
  isLoading: false,
  error: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      (state.user.email = null),
        (state.user.name = null),
        (state.user.photo = null),
        (state.accessToken = null),
        (state.isLoggedIn = false);
    },
    changePhoto: (state, action) => {
      state.user.photo = action.payload;
    },
    clearError: (state) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user.email = action.payload.userEmail;
        state.user.photo = action.payload.photoUri;
        state.user.name = action.payload.userName;
        state.user.id = action.payload.uid;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(logIn.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user.email = action.payload.userEmail;
        state.user.photo = action.payload.photoUri;
        state.user.name = action.payload.userName;
        state.user.id = action.payload.uid;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const { changePhoto } = authSlice.actions;

export const { logOut } = authSlice.actions;

export const { clearError } = authSlice.actions;

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
