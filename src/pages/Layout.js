import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.js';
import MobileBar from '../components/MobileBar.js';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <MobileBar />
    </>
  );
};

export default Layout;
