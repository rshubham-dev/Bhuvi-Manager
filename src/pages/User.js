// UserList.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const initialUsers = [
    {
        id: 1,
        userName: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        access: 'Admin',
        employeeId: 'E12345',
    },
    {
        id: 2,
        userName: 'Jane Doe',
        email: 'jane@example.com',
        phone: '987-654-3210',
        access: 'User',
        employeeId: 'E67890',
    },
    // Add more users as needed
];

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);

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
        </div>
    );
};

export default UserList;
