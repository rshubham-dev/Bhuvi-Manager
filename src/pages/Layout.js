import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.js';
import MobileBar from '../components/MobileBar.js';

const Layout = () => {
  // This component represents the overall layout structure of the application.
  // It includes a navigation bar, the main content (provided by Outlet), and a mobile bar.
  return (
    <>
      <Navbar />
      <Outlet />
      <MobileBar />
    </>
  );
};

export default Layout;
