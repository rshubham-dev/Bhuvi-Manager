import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
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
    <section className="flex min-h-screen my-8 justify-center bg-white">
      <div className="overflow-x-auto">
        <div className="pt-3 px-4 mx-auto mb-6">
          <div className="text-sm text-gray-700 py-1 flex flex-row items-center justify-between">
            <h2 className="text-lg sm:text-xl text-green-600 mb-2 sm:mb-0 sm:mr-4">Total Users: {users.length}</h2>
            <button onClick={handleAdd} className="bg-green-500 flex gap-2 rounded-md text-white px-3 py-2 sm:px-4 sm:py-2 mt-2 sm:mt-0">
              <MdAdd className='text-xl' /> Add User
            </button>
          </div>
        </div>
        <table className="min-w-screen">
          <thead>
            <tr class="bg-blue-gray-100 text-gray-700">
              <th scope="col" className="py-3 px-4 text-left">User Name</th>
              <th scope="col" className="py-3 px-4 text-left">Email</th>
              <th scope="col" className="py-3 px-4 text-left">Phone</th>
              <th scope="col" className="py-3 px-4 text-left">Role</th>
              <th scope="col" className="py-3 px-4 text-left">Department</th>
              <th scope="col" className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {users.map((user) => (
              <tr key={user._id}
                className="border-b border-blue-gray-200">
                <td className="px-4 py-3">
                  {user.userName}
                </td>
                <td className="px-4 py-3">
                  {user.userMail}
                </td>
                <td className="px-4 py-3">
                  {user.phone}
                </td>
                <td className="px-4 py-3">
                  {user.role}
                </td>
                <td className="px-4 py-3">
                  {user.department}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleEdit(user._id)}
                    className='mr-2'>
                    <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className='ml-2'>
                    <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </section>

  );
};

export default UserManagement;
