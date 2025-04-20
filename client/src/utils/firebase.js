// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "taskmanager2025-2d65c.firebaseapp.com",
  projectId: "taskmanager2025-2d65c",
  storageBucket: "taskmanager2025-2d65c.firebasestorage.app",
  messagingSenderId: "697967510836",
  appId: "1:697967510836:web:473f1a69e148dcf491d161",
  measurementId: "G-7T2XYYR58M",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
