import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace these with your actual Firebase project credentials using environment variables
const firebaseConfig = {
  apiKey: "AIzaSyBXr84pa6scptkqIGryfny5xfF0rX2FPiI",
  authDomain: "ranga-15943.firebaseapp.com",
  projectId: "ranga-15943",
  storageBucket: "ranga-15943.firebasestorage.app",
  messagingSenderId: "60660475132",
  appId: "1:60660475132:web:3d4e924da83804fc056379",
  measurementId: "G-ZQ04CWVYP5"
};

// Safety check: Ensure the app doesn't crash if keys are missing
const isFirebaseConfigValid = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

if (!isFirebaseConfigValid) {
  console.warn("Firebase configuration is missing. Authentication and database features will be disabled.");
}

const app = isFirebaseConfigValid ? initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : null as any;
export const db = app ? getFirestore(app) : null as any;
export const googleProvider = new GoogleAuthProvider();
