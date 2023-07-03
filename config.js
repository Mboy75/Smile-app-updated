import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "fake",
  authDomain: "fake",
  databaseURL:
    "fake",
  projectId: "fake",
  storageBucket: "fake",
  messagingSenderId: "fake",
  appId: "fake",
  //measurementId: "fake",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

