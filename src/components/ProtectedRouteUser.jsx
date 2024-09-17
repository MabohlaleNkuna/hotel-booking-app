import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';

function ProtectedRouteUser({ children }) {
  const { user } = useAuth(); // Use user from AuthContext

  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRouteUser;
