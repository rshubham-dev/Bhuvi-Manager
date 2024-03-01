import React, { useEffect } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
// import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { MdOutlineLogout, MdLogin, } from "react-icons/md";
import profile from '../asset/profile.webp';
import { useStateContext } from '../contexts/ContextProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice.js';
// import logo from '../asset/logo.png';
axios.defaults.withCredentials = true;

const NavbarButton = ({ customFunc, icon, color, dotColor }) => (
  <button type='button' onClick={customFunc} style={{ color }}
    className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
    <span style={{ background: dotColor }}
      className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2' />
    {icon}
  </button>
);


const Navbar = () => {

  const {
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    console.log(window.innerWidth)
    return () => window.removeEventListener('resize', handleResize);
  }, [])

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
    <div className='flex justify-between align-center py-2 px-6 relative w-full'>
      <div className='flex gap-4'>
        {isLoggedIn &&
          <button
            type='button'
            onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
            style={{ color: 'blue' }}
            className='text-xl rounded-full self-center -ml-5 mr-4 hover:bg-light-gray transition-all delay-150 duration-150 ease-in'>
            {activeMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        }
        <span className='text-sm md:text-lg lg:text-xl uppercase transition-all delay-100 duration-300 ease-in items-center flex font-extrabold ml-1 dark:text-white text-slate-900'>
          Bhuvi Manager
        </span>
      </div>
      <div className="flex">
        <NavbarButton
          customFunc={() => navigate(`${isLoggedIn ? '/message' : ''}`)}
          color='blue'
          icon={<RiNotification3Line />} />
        {isLoggedIn ? (
          <NavbarButton
            customFunc={logOut}
            color='blue'
            icon={<MdOutlineLogout />} />
        ) : (
          <NavbarButton
            customFunc={() => navigate('/login')}
            color='blue'
            icon={<MdLogin />} />
        )}
        <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => { }}>
          <img src={profile} alt="image" className="rounded-full w-8 h-8" />
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default Navbar