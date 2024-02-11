import React from 'react'
import './index.css';
import Sidebar from './components/Sidebar.jsx'
import Navbar from './components/Navbar.jsx';
import { BrowserRouter, Outlet } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider.jsx';


const Layout = ({children}) => {
  const { activeMenu } = useStateContext();
  return (
    <div>
      <BrowserRouter>
        <div className='flex flex-col relative dark:bg-main-dark-bg'>
          
            {/* Header */}
          <div
            className='dark:bg-secondary-dark-bg shadow-sm navbar fixed z-10 border-b-1 bg-white h-16 w-full transition-all delay-150 duration-200 ease-in'>
            <div className="fixed md:static bg-white w-full">
              <Navbar />
            </div>
          </div>

          {/* Sidebar */}
          <div className={`${activeMenu ? 'w-72' : 'w-16'} pt-16 fixed sidebar border-r-1 dark:bg-secondary-dark-bg bg-white transition-all delay-100 ease-in duration-200`}>
            <Sidebar />
          </div>

          {/* Main */}
          <div className='ml-16 mt-16 bg-black min-w-screen min-h-screen p-2 '>
            {children}
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default Layout;