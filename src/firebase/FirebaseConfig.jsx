// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs8rTC71QdpEu4cwoHbudtDdrkIqrT8NA",
  authDomain: "ecommerce-app-3f667.firebaseapp.com",
  projectId: "ecommerce-app-3f667",
  storageBucket: "ecommerce-app-3f667.firebasestorage.app",
  messagingSenderId: "724999799024",
  appId: "1:724999799024:web:4ebdaf4b94d66ac1190235"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth};