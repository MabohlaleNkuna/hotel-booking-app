import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { checkAdminStatus } from './utils/authUtils.js'; 
import AdminNavbar from './components/AdminNavbar.jsx';
import UserNavbar from './components/UserNavbar.jsx';
import Register from './pages/user/RegisterPage.js';
import Login from './pages/user/LoginPage.js';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ManageAccommodations from './pages/admin/ManageAccommodations.jsx';
import ManageRoom from './pages/admin/ManageRoom.js';
import UserHomePage from './pages/user/UserHomepage.js';
import RoomDetails from './components/RoomDetails.jsx'; 
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Import the HOC

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
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/register" 
          element={
            <ProtectedRoute 
              isAuthenticated={!!user} 
              isAdmin={isAdmin} 
              adminRequired={false}
            >
              <Register />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <ProtectedRoute 
              isAuthenticated={!!user} 
              isAdmin={isAdmin} 
              adminRequired={false}
            >
              <Login />
            </ProtectedRoute>
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute 
              isAuthenticated={!!user} 
              isAdmin={isAdmin} 
              adminRequired={true}
            >
              <>
                <AdminNavbar />
                <AdminDashboard />
              </>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/manage-accommodations" 
          element={
            <ProtectedRoute 
              isAuthenticated={!!user} 
              isAdmin={isAdmin} 
              adminRequired={true}
            >
              <>
                <AdminNavbar />
                <ManageAccommodations />
              </>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/manage-rooms" 
          element={
            <ProtectedRoute 
              isAuthenticated={!!user} 
              isAdmin={isAdmin} 
              adminRequired={true}
            >
              <>
                <AdminNavbar />
                <ManageRoom />
              </>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/user-homepage" 
          element={
            <ProtectedRoute 
              isAuthenticated={!!user} 
              isAdmin={isAdmin} 
              adminRequired={false}
            >
              <>
                <UserNavbar />
                <UserHomePage />
              </>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/room/:id" 
          element={<RoomDetails />} 
        />
        <Route 
          path="/" 
          element={
            <Navigate to={user ? (isAdmin ? "/dashboard" : "/user-homepage") : "/login"} />
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
