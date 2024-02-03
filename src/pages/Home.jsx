import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard.jsx';
import LoginForm from '../components/Login.jsx';

const Home = () => {
  const { isLoggedIn } = useSelector((state) => {
    return state.auth
  });

  return (
    <>
      {isLoggedIn ?
        <Dashboard />
        :
        <LoginForm/>
      }
    </>
  )
}

export default Home