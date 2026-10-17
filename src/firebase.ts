import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIMZbXQ154aL898cAmizvetSaNy1lUXF0",
  authDomain: "chancepalace-acb04.firebaseapp.com",
  projectId: "chancepalace-acb04",
  storageBucket: "chancepalace-acb04.firebasestorage.app",
  messagingSenderId: "102302764414",
  appId: "1:102302764414:web:b6031dabe4ae779568b72f",
  measurementId: "G-Y68P65BJJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and export it
export const db = getFirestore(app);