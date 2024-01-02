import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const CreateUser = () => {
  const [userData, setUserData] = useState({
    userName: '',
    userMail: '',
    password: '',
    phone: '',
    role: '',
    department:'',
  });
  const [roles, setRoles] = useState(['Admin', 'Client', 'Employee']);

  const [departments, setDepartment] = useState(['Admin', 
  'Company', 
  'Client', 
  'Accountant', 
  'Marketing', 
  'Ceo', 
  'Site Incharge', 
  'Site Supervisor', 
  'Design Head', 
  'Design Engineer', 
  'Quality Head', 
  'Quality Engineer']);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData)
    try {
      const response = await axios.post('/api/v1/user/create', {
        userName: userData.userName,
        userMail: userData.userMail,
        password: userData.password,
        phone: userData.phone,
        role: userData.role,
        department: userData.department,
      });
      toast.success('User created successfuly');
      console.log(roles, departments)
      if (response.error) return toast.error(response.error);
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'An error occurred');
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
            Role
          </label>
          <select 
            name='role' 
            required
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          {/* <input
            type="text"
            name='role'
            placeholder='Role'
            value={userData.role}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          /> */}
        </div>

        <div className="mb-4">
          <label htmlFor="access" className="block text-gray-700 text-sm font-bold mb-2">
          Department
          </label>
          <select 
            name='department'
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Department</option>
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          {/* <input
            type="text"
            name='department'
            placeholder='Department'
            value={userData.department}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          /> */}
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
