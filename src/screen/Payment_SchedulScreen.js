import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";

const Payment_SchedulScreen = () => {
  const [paymentSchedule, setpaymentSchedules] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    if(id){
      getpaymentSchedules(id);
    }
  }, [])

  const getpaymentSchedules = async (id) => {
    try {
      const paymentSchedulesData = await axios.get(`/api/v1/payment-schedule/${id}`);
      console.log(paymentSchedulesData.data)
      setpaymentSchedules(paymentSchedulesData.data);
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  const handleEdit = (id, index) => {
    navigate(`/edit-paymentSchedule/${id}/${index}`);
  };

  const deleteDetail = async (id, index) => {
    try {
      const response = await axios.delete(`/api/v1/payment-schedule/${id}/paymentDetails/${index}`);
      console.log(response.data)
      setpaymentSchedules(response.data.existingPaymentSchedule);
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <section className='bg-white py-6 mb-16 h-full w-full'>
      <h1 className="text-2xl font-bold text-center">Payment Schedule Details</h1>
      <div className=" mb-4 mr-10 text-right">
        <button onClick={() => navigate(`/edit-paymentSchedule/${paymentSchedule._id}`)} className="bg-green-500 text-white px-2 py-2 rounded-3xl">
          <MdAdd className='text-xl' />
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Work</th>
            <th scope="col" className="px-6 py-3">Amount</th>
            <th scope="col" className="px-6 py-3">Payment Date</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Paid Amount</th>
            <th scope="col" className="px-6 py-3">Due Amount</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {paymentSchedule.paymentDetails?.map((work, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                {work.workDescription}
              </td>
              <td className="px-6 py-4">{work.amount}</td>
              <td className="px-6 py-4">{work.dateOfPayment}</td>
              <td className="px-6 py-4">{work.status}</td>
              <td className="px-6 py-4">{work.paid}</td>
              <td className="px-6 py-4">{work.due}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(paymentSchedule._id, index)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2">
                  <GrEdit />
                </button>
                <button
                  onClick={() => deleteDetail(paymentSchedule._id, index)}
                  className="bg-red-500 text-white px-2 py-1 mr-2">
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </section>
  )
}

export default Payment_SchedulScreen