import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineDarkMode, MdLogout, MdSearch } from "react-icons/md";
import logo from '../asset/logo.png';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await axios.post('/api/v1/user/logout')
      .then((response) => {
        if(response.ok){
          toast.success(response.data.message);
          console.log(response.data)
          navigate('/login');
        }
      })
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <header className='mb-6'>
      <nav className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 p-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
          <div className="flex items-center">
              <img src={logo} alt="Bhuvi Consultants Logo" className="h-10 w-auto" />
              <h2 className="font-extrabold text-white lg:text-2xl md:text-2xl text-2xl">Bhuvi Consultants</h2>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="relative">
              <MdSearch className="text-white absolute left-3 top-1/2 transform -translate-y-1/2 text-lg md:text-xl lg:text-2xl" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none text-white placeholder:text-white pl-10 focus:outline-none text-sm md:text-base lg:text-lg"
              />
            </div>
            <div className="flex items-center space-x-4">
              <MdOutlineDarkMode className="text-white text-lg md:text-xl lg:text-2xl" />
              <NavLink onClick={logout} className="text-white text-lg md:text-xl lg:text-2xl">
                <MdLogout />
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </header>
  );
};

export default Navbar;
