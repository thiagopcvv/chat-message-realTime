import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_5iACqnGSA1xvEFq1fPHpNbupd1PYC5E",
  authDomain: "chatreal-85824.firebaseapp.com",
  projectId: "chatreal-85824",
  storageBucket: "chatreal-85824.appspot.com",
  messagingSenderId: "780523524710",
  appId: "1:780523524710:web:fc2d892487c825aa6313a7",
  measurementId: "G-KF5LBKC0WS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users')
export const roomRef = collection(db, 'rooms')
