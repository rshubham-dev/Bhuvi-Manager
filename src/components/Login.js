import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import property from '../config';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    userMail: '',
    password: '',
    employeeId: '',
  });

  const [role, setRole] = useState('');
  useEffect(() => {
    const getUserData = async () => {
      const userRole = await axios.get()
    };
  }, [])
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('1')
    const response = await axios.post(`${property.BASE_URL}/api/v1/user/login`, formData);
  // Add logic to handle login (e.g., send data to the server)
   console.log('Login submitted with data:', response.data);
   console.log('2')
  //  switch (role) {
  //   case 'Admin':
  //     navigate('/admin')
  //     break;
  //     case 'Ceo':
  //       navigate('/ceo')
  //       break;
  //       case 'Client':
  //         navigate('/client')
  //         break;
  //         case 'Employee':
  //           navigate('/employee')
  //           break;
  //   default:
  //     navigate('/login')
  //     break;
  // }
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
          EmployeeId:
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
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
