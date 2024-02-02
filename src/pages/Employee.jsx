import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

axios.defaults.withCredentials = true;

const Employee = () => {
  const [employees, setEmployee] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const employeesData = await axios.get('/api/v1/employee');
        setEmployee(employeesData.data);
        console.log(employeesData.data);
      } catch (error) {
        toast.error(error.error);
      }
    };
    getEmployees();
  }, []);
  const navigate = useNavigate();
  const handleEdit = (userId) => {
    navigate(`/edit-user?userId=${userId}`);
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/user/delete/${id}`);
      setEmployee(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <section className="overflow-x-auto shadow-md sm:rounded-lg mb-20 mt-10">
      <h1 className="text-3xl font-bold text-blue-500 text-center">Our Team</h1>
      <div className=" mb-4 mr-20 text-right flex justify-between align-center">
        <h2 className="text-xl text-green-600 ml-8">Total Employee: {employees.length}</h2>
        <button onClick={() => navigate('/create-employee')} className="bg-green-500 text-white px-4 py-2">
          Add More
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">User Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Contact No</th>
            <th scope="col" className="px-6 py-3">Employee Id</th>
            <th scope="col" className="px-6 py-3">Department</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                {employee.name}
              </td>
              <td className="px-6 py-4">
                {employee.email}
              </td>
              <td className="px-6 py-4">
                {employee.whatsapp}
              </td>
              <td className="px-6 py-4">
                {employee.employeeId}
              </td>
              <td className="px-6 py-4">
                {employee.department}
              </td>
              <td className="px-6 py-4">
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                  onClick={() => handleEdit(employee._id)}
                >
                  <GrEdit />
                </button>
                <button
                  onClick={() => handleDelete(employee._id)}
                  className="bg-red-500 text-white px-2 py-1 mr-2"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
};

export default Employee;
