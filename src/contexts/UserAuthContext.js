import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { formatData } from "./utils"; // Import the formatData function

export const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  async function logIn(email, password) {
    try {
      // Fetch users from Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email), where("isAdmin", "==", true));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/rooms");
      } else {
        alert("Please Sign in with Admin Account.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  }

  async function fetchData() {
    try {
      // Fetch data from Firestore
      const roomsRef = collection(db, "rooms");
      const querySnapshot = await getDocs(roomsRef);

      // Format the fetched data
      const formattedData = formatData(querySnapshot.docs);
      console.log("Formatted Data:", formattedData);

      // Do something with the formatted data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserAuthContext.Provider value={{ user, logIn, logOut, fetchData }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
