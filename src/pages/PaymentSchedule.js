import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
axios.defaults.baseURL = 'https://bhuvi-management-server.onrender.com';
axios.defaults.withCredentials = true;

const PaymentSchedules = () => {
  const navigate = useNavigate();
  const [paymentSchedules, setpaymentSchedules] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getpaymentSchedules = async () => {
      try {
        const paymentSchedulesData = await axios.get('/api/v1/payment-schedule');
        setpaymentSchedules(paymentSchedulesData.data);
        console.log(paymentSchedules)
      } catch (error) {
        toast.error(error.message)
        setError(error.message);
      }
    }
    getpaymentSchedules();
  }, [])

  const handleEdit = (paymentScheduleId) => {
    // Add your edit logic here
    navigate(`/edit-payment-schedule?payment-ScheduleId=${paymentScheduleId}`);
  };

  const handleRedirect = (paymentScheduleId) => {
    navigate(`/payment-schedule?payment-scheduleId=${paymentScheduleId}`);
  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/payment-schedule/${id}`);
      setpaymentSchedules(paymentSchedules.filter((paymentSchedule) => paymentSchedule._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };
  const handleAdd = () => {
    navigate('/create-payment-schedule');
  };


  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
    <h1 className="text-2xl font-bold text-center">paymentSchedules List</h1>
    <div className=" mb-4 mr-20 text-right">
      <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
        Add paymentSchedules
      </button>
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">PaymentSchedule Id</th>
          <th scope="col" className="px-6 py-3">Client</th>
          <th scope="col" className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {paymentSchedules.map((paymentSchedule) => (
          <tr key={paymentSchedules._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">
              <NavLink>
              </NavLink>
            </td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleRedirect(paymentSchedule._id)}
                className="bg-blue-500 text-white px-2 py-1 mr-2"
              >
                <FaExternalLinkAlt />
              </button>
              <button
                onClick={() => handleEdit(paymentSchedule._id)}
                className="bg-blue-500 text-white px-2 py-1 mr-2"
              >
                <GrEdit />
              </button>
              <button
                onClick={() => handleDelete(paymentSchedule._id)}
                className="bg-red-500 text-white px-2 py-1 mr-2"
              >
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {error && <p className="text-red-500">{error}</p>}
    </table>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
  </div>
  )
}

export default PaymentSchedules