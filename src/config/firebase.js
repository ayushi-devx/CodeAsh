import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2mlSOnmhIgbrkYvd_pGAkQZUPXILVzpY",
  authDomain: "codeash-b3227.firebaseapp.com",
  projectId: "codeash-b3227",
  storageBucket: "codeash-b3227.firebasestorage.app",
  messagingSenderId: "3546821353",
  appId: "1:3546821353:web:4385a92a2e958d3b92b678",
  measurementId: "G-D0080XXWL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
