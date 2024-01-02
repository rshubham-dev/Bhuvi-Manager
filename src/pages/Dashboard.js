import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Ceo from './Ceo.js';
import Accountant from './Accountant';
import Design_Head from './Design_Head';
import SiteIncharge from './SiteIncharge';
import SiteSupervisour from './SiteSupervisour';
import Quality_Engineer from './Quality_Engineer';
import Design_Engineer from './Design_Engineer';
import Marketing from './Marketing';
import Admin from './Admin';
import Client from './Client';
import UserProfile from '../components/ProfileCard.js';
import { ProtectedRoute } from '../components/ProtectedPages';


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
        <ProtectedRoute LoggedIn={isLoggedIn}>
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
        </ProtectedRoute>
      </Routes>
    </>
  )
}

export default Dashboard