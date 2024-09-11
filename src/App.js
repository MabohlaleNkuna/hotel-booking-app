import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import AdminDashboard from './pages/admin/AdminDashboard'; 
import UserHomepage from './pages/user/UserHomepage';
import AdminLogin from './pages/admin/AdminLogin';
import UserLogin from './pages/user/UserLogin';
import ProtectedRoute from './components/ProtectedRoute'; // Make sure the import is correct
import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector(state => state.auth.user); // Get the current user from the Redux store

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Navigation />
        <Routes>
          {/* Public routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/user/login" element={<UserLogin />} />

          {/* Protected routes */}
          <Route path="/user/homepage" element={<ProtectedRoute element={<UserHomepage />} requiredRole="user" />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} />

          {/* Redirect to a default route */}
          <Route path="/" element={<Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/user/homepage'} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
