import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../config";
import { collection, addDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredential;

      const {
        photoURL: photoUri,
        displayName: userName,
        email: userEmail,
        accessToken,
        uid,
      } = user;

      return { userEmail, accessToken, userName, photoUri, uid };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, displayName, photoURL }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        displayName
      );

      const { user } = userCredential;

      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });

      const {
        photoURL: photoUri,
        displayName: userName,
        email: userEmail,
        accessToken,
        uid,
      } = user;

      const docRef = await addDoc(collection(db, "users"), {
        name: displayName,
        email,
      });

      return { userEmail, accessToken, userName, photoUri, uid };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update",
  async ({ photoURL }, { rejectWithValue }) => {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: photoURL,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
