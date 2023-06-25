import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVvx_E3ZoooBmuf653_YICj5mqRGEgu3g",
  authDomain: "massi-app.firebaseapp.com",
  databaseURL:
    "https://massi-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "massi-app",
  storageBucket: "massi-app.appspot.com",
  messagingSenderId: "562177997146",
  appId: "1:562177997146:ios:52b9880dfe4a32af7adb63",
  //measurementId: "G-4X2SDX07TP",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

