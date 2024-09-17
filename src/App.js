import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth functions
import { checkAdminStatus } from './utils/authUtils.js'; // Import the function to check admin status
import AdminNavbar from './components/AdminNavbar.jsx';
import UserNavbar from './components/UserNavbar.jsx';
import Register from './pages/user/RegisterPage.js';
import Login from './pages/user/LoginPage.js';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ManageAccommodations from './pages/admin/ManageAccommodations.jsx';
import ManageRoom from './pages/admin/ManageRoom.js';
import UserHomePage from './pages/user/UserHomepage.js';
import RoomDetailsPage from './components/RoomDetals.jsx'; // Ensure the path is correct

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const adminStatus = await checkAdminStatus(currentUser);
        setIsAdmin(adminStatus);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Optionally add a loading spinner or message here
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route 
          path="/dashboard" 
          element={user && isAdmin ? (
            <>
              <AdminNavbar />
              <AdminDashboard />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route 
          path="/manage-accommodations" 
          element={user && isAdmin ? (
            <>
              <AdminNavbar />
              <ManageAccommodations />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route 
          path="/manage-rooms" 
          element={user && isAdmin ? (
            <>
              <AdminNavbar />
              <ManageRoom />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />

        {/* User Routes */}
        <Route 
          path="/user-homepage" 
          element={user ? (
            <>
              <UserNavbar />
              <UserHomePage />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route 
          path="/room-details" 
          element={user ? (
            <>
              <UserNavbar />
              <RoomDetailsPage />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />

        {/* Default Route */}
        <Route 
          path="/" 
          element={<Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
