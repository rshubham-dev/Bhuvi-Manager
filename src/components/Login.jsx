import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../features/auth/authSlice.js';
import { IoEyeOff, IoEye } from "react-icons/io5";
axios.defaults.withCredentials = true;


const Login = () => {
  const [formData, setFormData] = useState({
    userMail: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/user/login', formData);
      toast.success(response.data.message);
      if (!response.data.user) {
        dispatch(logout());
      } else {
        dispatch(login(response.data.user));
        sessionStorage.setItem("token", response.data.accessToken);
        navigate('/');  // Redirect here
        console.log('first')
      }
      setFormData({
        userMail: '',
        phone: '',
        password: '',
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setError('Login failed. Please check your credentials.');
    }
  };


  return (
    <div className='m-1 md:m-6 p-3 max-w-screen max-h-screen md:p-8'>
      <section className="mx-auto w-full md:w-3/4 lg:w-2/5 h-fit px-6 py-10 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
        <form onSubmit={handleSubmit} className="mt-5 mb-2.5">
          <div className="my-5 px-2">
            <label htmlFor="userMail" className="block text-gray-700 text-sm font-bold mb-2">Login With Email / Phone no.:</label>
            <input
              type="text"
              name="userMail"
              value={formData.userMail}
              onChange={handleChange}
              className="w-full p-2 border rounded-md outline-none"
              placeholder='Enter Your Email'
            />
          </div>
          <div className="px-2">
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md outline-none"
              placeholder='Enter Your Phone No'
            />
          </div>
          <div className="mt-5 px-2">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-1">Password:</label>
            <div className='flex flex-row border rounded-md justify-between items-center '>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-none outline-none p-2"
                placeholder='Enter Your Password'
                required
              />
              <span
                className="block text-gray-700 text-xl font-bold cursor-pointer p-2"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-8"
          >
            Login
          </button>
        </form>
        <hr className='border-b border-blue-gray-100' />
        <button
          onClick={() => navigate('/register')}
          type="button"
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 mt-2.5"
        >
          Register
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </section>
    </div>
  );
};

export default Login;
