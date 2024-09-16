// src/components/ProtectedRouteAdmin.jsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../src/contexts/AuthContext.js';
import { checkAdminStatus } from '../utils/authUtils.js'; // Update path if necessary

function AdminRoute({ children }) {
  const { user } = useAuth(); // Assuming `user` is used instead of `currentUser`
  const [hasAdminAccess, setHasAdminAccess] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsCheckingAccess(false);
      return;
    }

    const validateAdminAccess = async () => {
      const adminAccess = await checkAdminStatus(user);
      setHasAdminAccess(adminAccess);
      setIsCheckingAccess(false);
    };

    validateAdminAccess();
  }, [user]);

  if (isCheckingAccess) return <p>Loading...</p>;

  return hasAdminAccess ? children : <Navigate to="/" />;
}

export default AdminRoute;
