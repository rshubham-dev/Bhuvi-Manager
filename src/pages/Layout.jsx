import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import MobileBar from '../components/MobileBar.jsx';

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
