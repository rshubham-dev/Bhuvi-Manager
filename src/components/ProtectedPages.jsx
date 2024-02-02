import React from 'react';
import Home from '../pages/Home.jsx';

export const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Home/>;
};
