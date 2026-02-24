// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIKaECXD7k4r7FzeabUSdPXXLKZtmJsdc",
  authDomain: "mibasededatosfirebase.firebaseapp.com",
  projectId: "mibasededatosfirebase",
  storageBucket: "mibasededatosfirebase.firebasestorage.app",
  messagingSenderId: "645421443594",
  appId: "1:645421443594:web:8db0168d5b2c257148cdf3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

