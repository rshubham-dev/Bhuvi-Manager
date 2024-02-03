import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../features/auth/authSlice.js';
axios.defaults.withCredentials = true;


const LoginForm = () => {
  const [formData, setFormData] = useState({
    userMail: '',
    password: '',
  });
  const [error, setError] = useState(null);
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
        navigate('/dashboard');  // Redirect here
        console.log('first')
      }
      setFormData({
        userMail: '',
        password: '',
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setError('Login failed. Please check your credentials.');
    }
  };




  return (
    <section className="max-w-md mx-auto mt-10 mb-8 px-5 py-10 bg-white rounded-lg shadow-lg">
    <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
    <form onSubmit={handleSubmit} className="mt-5 mb-2.5">
      <div className="mt-5 px-2">
        <label htmlFor="userMail" className="block text-gray-700 text-sm font-bold mb-1">Email:</label>
        <input
          type="email"
          name="userMail"
          value={formData.userMail}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div className="mt-5 px-2">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-1">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-8"
      >
        Login
      </button>
    </form>
    <hr />
    <button
      onClick={() => navigate('/register')}
      type="button"
      className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 mt-2.5"
    >
      Register
    </button>
    {error && <p className="text-red-500">{error}</p>}
  </section>

  );
};

export default LoginForm;
