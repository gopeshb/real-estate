// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "real-estate-315ad.firebaseapp.com",
  projectId: "real-estate-315ad",
  storageBucket: "real-estate-315ad.appspot.com",
  messagingSenderId: "185301631193",
  appId: "1:185301631193:web:cf006d1b28b233eccc7ec8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);