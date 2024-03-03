import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams} from 'react-router-dom';
import Header from '../components/Header';
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
  const departments = [
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
  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const {id} = useParams();
  useEffect(() => {
    if (id) {
      setUserIdToEdit(id);
      fetchUserDetails(id);
    }
  }, [id]);

  const fetchUserDetails = async (id) => {
    try {
      const response = await axios.get(`/api/v1/user/${id}`);
      const user = response.data;
      setUserData({
        userName: user.userName,
        userMail: user.userMail,
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
        await axios.put(`/api/v1/user/${userIdToEdit}`, userData);
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
    <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
    <Header category="Page" title="Create User" />
      <section className="flex items-center justify-center h-full mb-16 mt-4">
      <form
        onSubmit={handleSubmit}
        className="pt-6 pb-8 mb-4 w-full max-w-md">
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
        
        {/* Make Password Auto Generated and send to phone no by backend with details */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder={userIdToEdit ? 'Change Password' : "Password"}
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
            type="tel"
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
              <option>{userIdToEdit? userData?.role : 'Role'}</option>
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
              <option>{userIdToEdit? userData?.department :'Department'}</option>
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
    </div>
  );
};

export default CreateUser;
