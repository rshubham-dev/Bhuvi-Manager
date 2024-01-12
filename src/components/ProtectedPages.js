import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};
