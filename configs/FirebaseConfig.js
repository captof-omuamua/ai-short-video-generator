// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-short-video-generator-3ef36.firebaseapp.com",
  projectId: "ai-short-video-generator-3ef36",
  storageBucket: "ai-short-video-generator-3ef36.firebasestorage.app",
  messagingSenderId: "136707129776",
  appId: "1:136707129776:web:2bb6321d57923874ff1675",
  measurementId: "G-WXK22NWC5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);
