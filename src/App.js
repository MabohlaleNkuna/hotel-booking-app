import React, { useEffect, useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import UserNavbar from './components/UserNavbar.jsx';
import Register from './pages/user/RegisterPage.js';
import Login from './pages/user/LoginPage.js';
import UserHomePage from './pages/user/UserHomepage.js';
import RoomDetails from './components/RoomDetails.jsx';
import ProfilePage from './pages/user/ProfilePage.jsx';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          index         
          element={
            <>
              <UserNavbar />
              <UserHomePage />
            </>
          } 
        />
        {/* Protected Routes */}
        <Route 
          path="/user-homepage" 
          element={
            user ? (
              <>
                <UserNavbar />
                <UserHomePage />
              </>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route path="/room/:id" element={<RoomDetails />} />
        <Route 
          path="/profile" 
          element={
            user ? (
              <>
                <UserNavbar />
                <ProfilePage />
              </>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/" 
          element={<Navigate to={user ? "/user-homepage" : "/login"} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
