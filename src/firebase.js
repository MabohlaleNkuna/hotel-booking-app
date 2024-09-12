import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl4u9Z-okoAj34XzkMNVNVJ5gzhFn567o",
  authDomain: "hotel-booking-app-25eb5.firebaseapp.com",
  projectId: "hotel-booking-app-25eb5",
  storageBucket: "hotel-booking-app-25eb5.appspot.com",
  messagingSenderId: "449659420472",
  appId: "1:449659420472:web:f3a653bb5ac550dcd58bcd",
  measurementId: "G-8NYW3Y8F7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
