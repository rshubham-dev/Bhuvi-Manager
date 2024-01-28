import React, { useEffect } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { logout } from '../features/auth/authSlice.js';

 const Dashboard = () => {
  const { user, isLoggedIn } = useSelector((state) => {
    return state.auth
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // useEffect(() => {
  //   const isPageReloaded = performance.navigation.type === 1;
  //   if (isPageReloaded) {
  //     dispatch(logout());
  //     navigate('/login')
  //     console.log('Reloaded')
  //   } else {
  //     console.log( "This page is not reloaded");
  //   }
  // }, []);
  // if(window.performance){
  //   console.log('test', window.performance)
  // }
  // console.log('state', window.performance.navigation.type)

  useEffect(() => {
    if(isLoggedIn === true && user){
      handleNavigation(isLoggedIn);
    } else {
      navigate('/login')
    }
  }, [isLoggedIn]);
  const handleNavigation = (user) => {
    switch (user.department) {
      case 'Admin':
        navigate('/admin');
        break;
      case 'Company':
        navigate('/admin');
        break;
      case 'Client':
        navigate('/Client-dashboard');
        break;
      case 'Accountant':
        navigate('/accountant');
        break;
      case 'Marketing':
        navigate('/marketing');
        break;
      case 'Ceo':
        navigate('/admin');
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
  };

}

export default Dashboard;