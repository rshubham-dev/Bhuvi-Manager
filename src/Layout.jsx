import React from 'react'
import './index.css';
import Sidebar from './components/Sidebar.jsx'
import Navbar from './components/Navbar.jsx';
import { BrowserRouter, Outlet } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider.jsx';
import { useSelector } from 'react-redux';

const Layout = ({children}) => {
  const { activeMenu } = useStateContext();
  const { isLoggedIn } = useSelector((state) => {
    return state.auth;
  });
  return (
    <div>
      <BrowserRouter>
        <div className='flex flex-col relative dark:bg-main-dark-bg'>
          
            {/* Header */}
          <div
            className='dark:bg-secondary-dark-bg navbar fixed m-0 bg-white h-16 w-full transition-all delay-150 duration-200 ease-in'>
            <div className="fixed md:static  w-full m-0">
              <Navbar />
            </div>
          </div>

          {/* Sidebar */}
          <div className={` ${activeMenu ? 'w-72' : 'w-16'} ${isLoggedIn ? 'inline' : 'hidden'} pt-16 px-2 fixed z-100 sidebar border-r-1 dark:bg-secondary-dark-bg bg-white transition-all delay-100 ease-in duration-200`}>
            <Sidebar />
          </div>

          {/* Main */}
          <div className={`${isLoggedIn ? 'ml-16' : 'ml-0'} mt-16 min-w-screen min-h-screen p-3`}>
            {children}
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default Layout;