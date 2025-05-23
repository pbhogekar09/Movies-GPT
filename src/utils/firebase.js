// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4oT4BjHk4fpuseYy_PNquG900cNP4pMs",
  authDomain: "moviesgpt-bfb78.firebaseapp.com",
  projectId: "moviesgpt-bfb78",
  storageBucket: "moviesgpt-bfb78.firebasestorage.app",
  messagingSenderId: "841436563959",
  appId: "1:841436563959:web:913e9581d2e00639a586f2",
  measurementId: "G-Z5ELJ7GF6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
