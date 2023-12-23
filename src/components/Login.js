import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import property from '../config';
import toast, { Toaster } from 'react-hot-toast';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    userMail: '',
    password: '',
    employeeId: '',
  });

  const [role, setRole] = useState('');
  
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
    try {
      const response = await axios.post(`${property.BASE_URL}/api/v1/user/login`, formData)
      .then(response =>{
        console.log('Login submitted with data:', response.data);
        toast.success(response.data.message);
        setRole(response.data.user.role);
        console.log(response.data.user.role)
        if(role==='Admin') return navigate('/admin')
        if(role==='Ceo') return navigate('/ceo')
        if(role==='Client') return navigate('/client')
        if(role==='Employee') return navigate('/employee')
        // switch (role) {
        //   case 'Admin':
        //     navigate('/admin')
        //     break;
        //   case 'Ceo':
        //     navigate('/ceo')
        //     break;
        //   case 'Client':
        //     navigate('/client')
        //     break;
        //   case 'Employee':
        //     navigate('/employee')
        //     break;
        //   default:
        //     console.log("Page not found")
        //     break;
        // }
      })
      .catch(error=>{
        console.log(error)
        toast.error(response.data.error)
      })
       console.log('2')
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

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
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default LoginForm;
