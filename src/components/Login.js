import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    userMail: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await axios.post("/api/v1/user/login", formData);
  // Add logic to handle login (e.g., send data to the server)
   console.log('Login submitted with data:', formData);
    navigate('/register')
  };

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
    </div>
  );
};

export default LoginForm;
