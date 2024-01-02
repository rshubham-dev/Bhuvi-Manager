import React from 'react'
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ LoggedIn, children }) => {
    if (LoggedIn) {
      return children
    }
    else {
      return <Navigate to={'/login'} />
    }
  }