import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import property from '../config';

const UserManagement = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userData = await axios.get(`${property.BASE_URL}/api/v1/user/lists`);
                setUsers(userData.data);
            } catch (error) {
                toast.error(error.message)
            }
        }
        getUsers();
    }, [])


    const handleEdit = (userId) => {
        // Add your edit logic here
        console.log(`Edit user with ID ${userId}`);
    };

    const handleDelete = (userId) => {
        // Add your delete logic here
        setUsers(users.filter((user) => user.id !== userId));
    };

    const handleAdd = () => {
        navigate('/create-user');
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-2xl font-bold text-center">User List</h1>
            <div className=" mb-4 mr-20 text-right">
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
                        <th scope="col" className="px-6 py-3">Access</th>
                        <th scope="col" className="px-6 py-3">Employee ID</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4">{user.userName}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.phone}</td>
                            <td className="px-6 py-4">{user.access}</td>
                            <td className="px-6 py-4">{user.employeeId}</td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleEdit(user.id)}
                                    className="bg-blue-500 text-white px-2 py-1 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-red-500 text-white px-2 py-1 mr-2"
                                >
                                    Delete
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
