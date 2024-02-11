import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import image from '../asset/profile.png';
import Header from '../components/Header';
axios.defaults.withCredentials = true;

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await axios.get('/api/v1/user/lists');
        setUsers(userData.data);
        console.log(userData.data)
      } catch (error) {
        toast.error(error.message);
        setError(error.message);
      }
    }
    getUsers();
  }, [])

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleAdd = () => {
    navigate('/create-user');
  };

  return (
    <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
    <Header category="Page" title="Dashboard" />
<section className="h-full w-full flex justify-center bg-white">
  <div className="overflow-x-auto w-full max-w-screen-lg mx-auto">
    <div className="pt-3 mx-auto mb-4 w-full sm:w-4/5">
      <div className="w-full mx-auto text-gray-700 py-1 flex flex-row sm:flex-row justify-between items-center">
        <h2 className="text-lg sm:text-xl text-green-600 mb-2 sm:mb-0 sm:mr-4">Total Users: {users.length}</h2>
        <button onClick={handleAdd} className="bg-green-500 rounded-full text-white p-2 mt-2 sm:mt-0">
          <MdAdd className='text-xl' /> 
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap bg-blue-gray-800 overflow-hidden">
        <thead className='bg-blue-400'>
          <tr className="bg-blue-gray-100 text-white">
            <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">User</th>
            <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Phone</th>
            <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Role</th>
            <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-blue-gray-900">
          {users.map((user) => (
            <tr key={user._id} className="border-b border-blue-gray-200">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="inline-flex w-10 h-10">
                    <img className='w-10 h-10 object-cover rounded-full' alt='User avatar' src={user?.avatar || image} />
                  </div>
                  <div>
                    <p>{user.userName}</p>
                    <p className="text-gray-500 text-sm font-semibold tracking-wide">{user.userMail}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                {user.phone}
              </td>
              <td className="px-6 py-4">
                <p>{user.role}</p>
                <p className="text-gray-500 text-sm font-semibold tracking-wide">{user.department}</p>
              </td>
              <td className="px-4 py-3 text-center">
                <button onClick={() => handleEdit(user._id)} className='mr-2'>
                  <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                </button>
                <button onClick={() => handleDelete(user._id)} className='mx-2'>
                  <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  {error && <p className="text-red-500 mt-2">{error}</p>}
  <Toaster position="top-right" reverseOrder={false} />
</section>
</div>
  );
};

export default UserManagement;
