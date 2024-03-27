import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
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
        console.error(error);
      }
    };
    getEmployees();
  }, []);

  const navigate = useNavigate();

  const handleEdit = (userId) => {
    navigate(`/edit-user?userId=${userId}`);
  };

  const handleRedirect = (id) => {
    navigate(`/employee/${id}`);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/user/delete/${id}`);
      setEmployee(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
      <div className="overflow-x-auto">
        <Header category="Page" title="Employee's" />
        <div className="w-full mx-auto mb-6 text-gray-700 p-1 flex flex-row justify-between items-center">
          <h2 className="text-lg text-wrap sm:text-md md:text-lg lg:text-xl text-green-600 mr-4 pr-4">
            Total Employee: {employees.length}
          </h2>
          <button onClick={() => navigate('/create-employee')} className="bg-green-500 rounded-full text-white px-2 py-2 sm:mt-0">
            <MdAdd className='text-xl' />
          </button>
        </div>

        <div className="overflow-x-auto"
          style={{
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
          }}>
          <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
            <thead className="text-sm uppercase bg-gray-200 ">
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
                <tr key={employee._id} className="bg-white border-b hover:bg-gray-50">
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
                    {/* <button onClick={() => handleRedirect(employee._id)} className="mr-2">
                      <FaExternalLinkAlt className='text-blue-500 hover:text-blue-800 text-lg' />
                    </button> */}
                    <button
                      className=" mr-2"
                      onClick={() => handleEdit(employee._id)}>
                      <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                    </button>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="mr-2">
                      <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default Employee;
