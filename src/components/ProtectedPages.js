import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};
