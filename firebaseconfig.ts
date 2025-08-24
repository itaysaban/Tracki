// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzBSKcM1lbxrVEIlokUbtF4rTaDKdX0uI",
  authDomain: "tracki-5cbbb.firebaseapp.com",
  projectId: "tracki-5cbbb",
  storageBucket: "tracki-5cbbb.firebasestorage.app",
  messagingSenderId: "204772710254",
  appId: "1:204772710254:web:68cf231dc4927beae1137f",
  measurementId: "G-MJ49H32CL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);