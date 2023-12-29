import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {UserContext} from '../context/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    userMail: '',
    password: '',
  });
  const {setUser} = useContext(UserContext);

  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate()

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
      console.log('Login submitted with data:', response.data);
      toast.success(response.data.message);
      setRole(response.data.user.role);
      setUser({
        isLoggedIn: true,
        user: response.data.user,
      })
    } catch (error) {
      console.error(error.response.data);
      console.log(error)
      toast.error(error.message);
      setError('Login failed. Please check your credentials.');
    }
  };
  useEffect(() => {
    const handleNavigation = () => {
      switch (role) {
        case 'Admin':
          navigate('/admin');
          break;
        case 'Client':
          navigate('/client');
          break;
        case 'Employee':
          navigate('/create-employee');
          break;
        default:
          console.log("Not exists");
          break;
      }
    };
    if (role) {
      handleNavigation();
    }
  }, [role, navigate]);


  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="userMail"
            value={formData.userMail}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </label>
        <label className="block mb-2">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default LoginForm;
