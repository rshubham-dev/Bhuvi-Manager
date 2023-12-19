import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [userData, setUserData] = useState({
    userName: '',
    userMail: '',
    password: '',
    phone: '',
    access: '',
    employeeId: '',
  });
 const navigate = useNavigate();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(' http://localhost:8080/api/v1/user/create', userData);
      if (response.error) return toast.error(response.error);
      toast.success('User created successfuly');
      navigate('/users');
    } catch (error) {
      toast.error(error)
    }
  };


  return (
    <main>
      <section className="flex items-center justify-center max-h-screen mb-24 mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            UserName
          </label>
          <input
            type="text"
            name="userName"
            placeholder="User-Name"
            value={userData.userName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userMail" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="userMail"
            placeholder="Email"
            value={userData.userMail}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={userData.phone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Make access field selectable */}
        <div className="mb-4">
          <label htmlFor="access" className="block text-gray-700 text-sm font-bold mb-2">
            Access
          </label>
          <input
            type="text"
            name='access'
            placeholder='Access'
            value={userData.access}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="employeeId" className="block text-gray-700 text-sm font-bold mb-2">
            Employee_Id
          </label>
          <input
            type="text"
            name='employeeId'
            placeholder='Employee_Id'
            value={userData.employeeId}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add User
        </button>
      </form>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      </section>
    </main>
  );
};

export default CreateUser;
