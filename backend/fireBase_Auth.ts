import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6eHTXkKoVTe8MIQPB6uqfITZbZGvNPi8",
  authDomain: "finalprojecttrends-dbd69.firebaseapp.com",
  projectId: "finalprojecttrends-dbd69",
  storageBucket: "finalprojecttrends-dbd69.firebasestorage.app",
  messagingSenderId: "243008259752",
  appId: "1:243008259752:web:7a82dbe38a1c768ff8e49d",
  measurementId: "G-T12J5RMZCN"
};

// apiKey: "AIzaSyA6eHTXkKoVTe8MIQPB6uqfITZbZGvNPi8",
//   authDomain: "finalprojecttrends-dbd69.firebaseapp.com",
//   projectId: "finalprojecttrends-dbd69",
//   storageBucket: "finalprojecttrends-dbd69.firebasestorage.app",
//   messagingSenderId: "243008259752",
//   appId: "1:243008259752:web:7a82dbe38a1c768ff8e49d",
//   measurementId: "G-T12J5RMZCN"

// apiKey: `${process.env.FIREBASE_API_KEY}`,
// authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
// projectId:  `${process.env.FIREBASE_PROJECT_ID}`,
// storageBucket:  `${process.env.FIREBASE_STORAGE_BUCKET}`,
// messagingSenderId:  `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
// appId:  `${process.env.FIREBASE_APP_ID}`,
// measurementId: `${process.env.FIREBASE_MEASUREMENT_ID}`

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
