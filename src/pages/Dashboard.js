import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Ceo from './pages/Ceo';
import Accountant from './pages/Accountant';
import Design_Head from './pages/Design_Head';
import SiteIncharge from './pages/SiteIncharge';
import SiteSupervisour from './pages/SiteSupervisour';
import Quality_Engineer from './pages/Quality_Engineer';
import Design_Engineer from './pages/Design_Engineer';
import Marketing from './pages/Marketing';
import Admin from './pages/Admin';
import Client from './pages/Client';
import UserProfile from '../components/ProfileCard.js';



const Dashboard = () => {
  const { user, isLoggedIn } = useSelector((state) => {
    return state.auth
  });
  const navigate = useNavigate();
  useEffect(() => {
    const handleNavigation = () => {
      if (isLoggedIn) {
        switch (user.department) {
          case 'Admin':
            navigate('/admin');
            break;
          case 'Company':
            navigate('/admin');
            break;
          case 'Client':
            navigate('/client');
            break;
          case 'Accountant':
            navigate('/accountant');
            break;
          case 'Marketing':
            navigate('/marketing');
            break;
          case 'Ceo':
            navigate('/ceo');
            break;
          case 'Site Incharge':
            navigate('/site-incharge');
            break;
          case 'Site Supervisor':
            navigate('/site-supervisour');
            break;
          case 'Design Head':
            navigate('/design-head');
            break;
          case 'Design Engineer':
            navigate('/design-engineer');
            break;
          case 'Quality Engineer':
            navigate('/quality-engineer');
            break;
          default:
            console.log("Not exists");
            break;
        }
      } else {
        navigate('/login')
      }
    };
    handleNavigation();
  }, [isLoggedIn, navigate]);
  return (
    <>
      <UserProfile />
      <Routes>
        <Route path='/ceo' element={<Ceo />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/client' element={<Client />} />
        <Route path='/design-head' element={<Design_Head />} />
        <Route path='/site-incharge' element={<SiteIncharge />} />
        <Route path='/site-supervisour' element={<SiteSupervisour />} />
        <Route path='/marketing' element={<Marketing />} />
        <Route path='/quality-engineer' element={<Quality_Engineer />} />
        <Route path='/design-engineer' element={<Design_Engineer />} />
        <Route path='/accountant' element={<Accountant />} />
      </Routes>
    </>
  )
}

export default Dashboard