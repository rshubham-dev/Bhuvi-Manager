import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation} from 'react-router-dom';
axios.defaults.withCredentials = true;

const CreateUser = () => {
  const [userData, setUserData] = useState({
    userName: '',
    userMail: '',
    password: '',
    phone: '',
    role: '',
    department:'',
  });
  const roles = ['Admin', 'Client', 'Supplier', 'Employee'];
  const departments = ['Admin', 
  'Company', 
  'Client', 
  'Accountant', 
  'Marketing', 
  'Ceo', 
  'Supplier',
  'Site Incharge', 
  'Site Supervisor', 
  'Design Head', 
  'Design Engineer', 
  'Quality Head', 
  'Quality Engineer'];
  const navigate = useNavigate();
  const location = useLocation();
  const [userIdToEdit, setUserIdToEdit] = useState(null);

  useEffect(() => {
    const userId = new URLSearchParams(location.search).get('userId');
  
    if (userId) {
      setUserIdToEdit(userId);
      fetchUserDetails(userId);
    }
  }, [location.search]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`/api/v1/user/${userId}`);
      const user = response.data;
      setUserData({
        userName: user.userName,
        userMail: user.userMail,
        password: user.password,
        phone: user.phone,
        role: user.role,
        department: user.department,
      });
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userIdToEdit) {
        await axios.put(`/api/v1/user/update/${userIdToEdit}`, userData);
        toast.success('User edited successfully');
      } else {
        await axios.post('/api/v1/user/create', userData);
        toast.success('User created successfully');
      }
      navigate(-1);
    } catch (error) {
      console.log('Error submitting user data:', error);
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
        </div>

        <div className="mb-6">
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
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
           {userIdToEdit ? 'Edit User' : 'Add User'}
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
