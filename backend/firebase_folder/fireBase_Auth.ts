// Firebase-Auth.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config object (update with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyA6eHTXkKoVTe8MIQPB6uqfITZbZGvNPi8",
  authDomain: "finalprojecttrends-dbd69.firebaseapp.com",
  projectId: "finalprojecttrends-dbd69",
  storageBucket: "finalprojecttrends-dbd69.firebasestorage.app",
  messagingSenderId: "243008259752",
  appId: "1:243008259752:web:7a82dbe38a1c768ff8e49d",
  measurementId: "G-T12J5RMZCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
