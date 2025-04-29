// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuEJGuRClqyHUSvTAEKOKDwYSesyVnWgU",
  authDomain: "social-media-app-5684e.firebaseapp.com",
  projectId: "social-media-app-5684e",
  storageBucket: "social-media-app-5684e.firebasestorage.app",
  messagingSenderId: "114271779679",
  appId: "1:114271779679:web:3446af9b1aee1da03cd4ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);