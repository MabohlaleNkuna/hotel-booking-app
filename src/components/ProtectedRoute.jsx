import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  const user = useSelector((state) => state.auth.user); 

  return isAuthenticated || user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
