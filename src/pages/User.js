import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

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

  const handleEdit = (userId) => {
    navigate(`/edit-user?userId=${userId}`);
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/user/delete/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleAdd = () => {
    navigate('/create-user');
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-20">
      <h1 className="text-3xl font-bold text-blue-500 text-center">User List</h1>
      <div className=" mb-4 mr-20 text-right flex justify-between align-center">
        <h2 className="text-xl text-green-600 ml-8">Total Users: {users.length}</h2>
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
          Add User
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">User Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Phone</th>
            <th scope="col" className="px-6 py-3">Role</th>
            <th scope="col" className="px-6 py-3">Department</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                  {user.userName}
              </td>
              <td className="px-6 py-4">
                  {user.userMail}
              </td>
              <td className="px-6 py-4">
                {user.phone}
              </td>
              <td className="px-6 py-4">
                {user.role}
              </td>
              <td className="px-6 py-4">
                {user.department}
              </td>
              <td className="px-6 py-4">
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                  onClick={() => handleEdit(user._id)}
                >
                  <GrEdit />
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-2 py-1 mr-2"
                >
                 <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p className="text-red-500">{error}</p>}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default UserManagement;
