import React from 'react';
import Home from '../pages/Home.js';

export const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Home/>;
};
