import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import Admin from './Admin.js';
import Client from './Client.js';
import Accountant from './Accountant.js';
import Marketing from './Marketing.js';
import SiteIncharge from './SiteIncharge.js';
import SiteSupervisour from './SiteSupervisour.js';
import Design_Head from './Design_Head.js';
import Design_Engineer from './Design_Engineer.js';
import Quality_Engineer from './Quality_Engineer.js';

 const Dashboard = () => {
  const { user, isLoggedIn } = useSelector((state) => {
    return state.auth
  });

  const navigate = useNavigate();

  useEffect(() => {
    if(isLoggedIn === true && user){
      handleNavigation(user);
    } else {
      navigate('/login')
    }
  }, [isLoggedIn]);
  const handleNavigation = (user) => {
      switch (user.department) {
        case 'Company':
          return (
            <Admin/> 
            )
          break;
        case 'Client':
          return (
            <Client/> 
            )
          break;
        case 'Accountant':
          return (
            <Accountant/> 
            )
          break;
        case 'Marketing':
          return (
            <Marketing/> 
            )
          break;
        case 'Ceo':
          return (
            <Admin/> 
            )
          break;
        case 'Site Incharge':
          return (
            <SiteIncharge/> 
            )
          break;
        case 'Site Supervisor':
          return (
            <SiteSupervisour/> 
            )
          break;
        case 'Design Head':
          return (
            <Design_Head/> 
            )
          break;
        case 'Design Engineer':
          return (
            <Design_Engineer/> 
            )
          break;
        case 'Quality Engineer':
          return (
          <Quality_Engineer/> 
          )
          break;
        default:
          console.log("Not exists");
          break;
      }
  };

}

export default Dashboard;