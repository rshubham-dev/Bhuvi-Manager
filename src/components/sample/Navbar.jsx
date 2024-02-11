import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import image from '../asset/profile.png';
import {
  MdLogout,
  MdLogin,
  MdNotifications,
} from 'react-icons/md';
import logo from '../asset/logo.png';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice.js';
import { Badge, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

axios.defaults.withCredentials = true;

const Navbar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();

  const logOut = async () => {
    try {
      const response = await axios.post('/api/v1/user/logout');
      toast.success(response.data.message);
      dispatch(logout());
      navigate('/login');
      console.log(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
<nav className="bg-gray-50 text-gray min-w-screen max-w-screen border-b border-gray-200 py-3 px-1 md:px-6 lg:px-10 dark:fill-gray-400 dark:bg-gray-800">
  <div className="flex flex-row items-center justify-between container mx-auto space-x-4">

    <div className="flex items-center justify-between space-x-2">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '18px',
          width: 40,
          height: 40,
          display: isLoggedIn ? 'block' : 'none',
        }}
      />

      <div className="px-4">
        <h2 className="font-bold text-gray text-sm sm:text-sm md:text-xl lg:text-2xl whitespace-nowrap">Bhuvi Consultants</h2>
      </div>
    </div>

    <div className="flex items-center space-x-3 lg:space-x-6 md:space-x-4 sm:space-x-2">
      <Badge
        count="1"
        onClick={() => {
          navigate('/message');
        }}
        size="small"
        className="text-gray flex flex-col items-center dark:text-white"
      >
        <MdNotifications className="text-lg text-gray dark:text-white lg:text-2xl" />
      </Badge>

      {isLoggedIn ? (
        <NavLink onClick={logOut} className="text-lg md:text-xl lg:text-2xl">
          <MdLogout className="text-gray" />
        </NavLink>
      ) : (
        <NavLink to="/login" className="text-gray dark:text-white text-lg md:text-xl lg:text-2xl">
          <MdLogin />
        </NavLink>
      )}
      <div className="photo-wrapper">
        <img
          className="lg:w-12 lg:h-12 w-8 h-8 md:w-9 md:h-9 rounded-full mx-auto"
          src={user?.avatar || image}
          alt={user?.userName}
        />
      </div>
    </div>
  </div>
  <Toaster position="top-right" reverseOrder={false} />
</nav>


  );
};

export default Navbar;
