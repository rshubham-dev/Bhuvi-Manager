import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import Header from '../components/Header';
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
    <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen shadow-lg md:p-8 bg-white rounded-3xl'>
      <Header category="Page" title="Employees" />
      <section className="h-full w-full mb-16 flex justify-center">
      <div className='overflow-x-auto w-full max-w-screen-lg mx-auto'>
        <div className="w-full mx-auto mb-6 text-gray-700 py-1 flex flex-row sm:flex-row justify-between items-center">
          <h2 className="text-lg sm:text-md md:text-lg lg:text-xl text-green-600 mb-2 sm:mb-0 sm:mr-4">Total Employee: {employees.length}</h2>
          <button onClick={() => navigate('/create-employee')} className="bg-green-500 rounded-full text-white px-2 py-2 sm:mt-0">
          <MdAdd className='text-xl' />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
          <thead className="text-sm uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-gray-800  text-left">
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 ">User Name</th>
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 ">Email</th>
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 ">Contact No</th>
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 ">Employee Id</th>
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 ">Department</th>
              <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 ">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
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
        </div>
        <Toaster position="top-right" reverseOrder={false} />
        </div>
      </section>
    </div>
  );
};

export default Employee;
