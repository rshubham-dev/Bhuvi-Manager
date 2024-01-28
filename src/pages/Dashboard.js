import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import Admin from './Admin';
import Client from './Client';
import Accountant from './Accountant';
import Marketing from './Marketing';
import SiteIncharge from './SiteIncharge';
import SiteSupervisour from './SiteSupervisour';
import Design_Head from './Design_Head';
import Design_Engineer from './Design_Engineer';
import Quality_Engineer from './Quality_Engineer';

 const Dashboard = () => {
  const { user, isLoggedIn } = useSelector((state) => {
    return state.auth
  });
  const navigate = useNavigate();
  useEffect(() => {
    const handleNavigation = () => {
      if (isLoggedIn) {
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
      } else {
        navigate('/login')
      }
    };
    handleNavigation();
  }, [isLoggedIn, navigate]);

}

export default Dashboard;