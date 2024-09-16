import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';

function ProtectedRouteUser({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/register" />;
}

export default ProtectedRouteUser;
