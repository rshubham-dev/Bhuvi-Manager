import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import moment from 'moment';
import Header from '../components/Header';

const Payment_SchedulScreen = () => {
  const [paymentSchedule, setpaymentSchedules] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
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

  const PaymentScheduleCard = ({ workDescription, paid, due, amount, status, dateOfPayment, handleEdit, handleDelete }) => {
    return (
      <div className=" px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">{workDescription}</h2>
        <div className='flex flex-col gap-2 text-md'>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Payment Amount:</div>
            <div className="text-gray-800">{amount}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Payment Date:</div>
            <div className="text-gray-800">{dateOfPayment ? moment(dateOfPayment).format('DD-MM-YYYY') : '-'}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Status:</div>
            <div className={`${status === 'paid' ? 'text-green-800' : 'text-red-800'} ${status === 'paid' ? 'bg-green-200' : 'bg-red-200'} py-0.5 px-2.5 rounded-md font-semibold text-sm`}>{status}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Paid Amount:</div>
            <div className="text-gray-800">{paid}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Due Amount:</div>
            <div className="text-gray-800">{due}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <button onClick={handleEdit} className="text-blue-500 mr-2">
              <GrEdit className="inline-block mr-1" />
              Edit
            </button>
            <button onClick={handleDelete} className="text-red-500">
              <MdDelete className="inline-block mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className='m-0.8 md:m-5 p-3 min-w-screen min-h-screen md:p-8 bg-white rounded-lg md:rounded-3xl lg:rounded-3xl xl:rounded-3xl'>
      <section className='mb-10 h-full w-full'>
      <Header category="Page" title={`${paymentSchedule.site?.name} Payment Schedule`} />
        <div className="mb-4 text-right">
          {/* <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-center tracking-tight">{paymentSchedule.site?.name}</h1> */}
          <button onClick={() => navigate(`/edit-paymentSchedule/${paymentSchedule._id}`)} className="bg-green-500 text-white px-2 py-2 rounded-3xl">
            <MdAdd className='text-lg md:text-xl' />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paymentSchedule.paymentDetails?.map((work, index) => (
            <div key={index} className='bg-white shadow-lg rounded-xl'>
              <PaymentScheduleCard
                workDescription={work.workDescription}
                paid={work.paid}
                due={work.due}
                amount={work.amount}
                dateOfPayment={work.dateOfPayment}
                status={work.status}
                handleEdit={() => handleEdit(paymentSchedule._id, index)}
                handleDelete={() => deleteDetail(paymentSchedule._id, index)}
              />
            </div>
          ))}
        </div>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </section>
    </div>
  )
}

export default Payment_SchedulScreen



{/* <div className="bg-white shadow-md rounded-lg p-6">
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
                            <td className="px-6 py-4">{work.workDescription}</td>
                            <td className="px-6 py-4">{work.amount}</td>
                            <td className="px-6 py-4">{work.dateOfPayment ? moment(work.dateOfPayment).format('DD-MM-YYYY') : '-'}</td>
                            <td className="px-6 py-4">{work.status}</td>
                            <td className="px-6 py-4">{work.paid}</td>
                            <td className="px-6 py-4">{work.due}</td>
                            <td className="px-6 py-4">
                              <button onClick={() => handleEdit(index)} className="bg-blue-500 text-white px-2 py-1 mr-2">Edit</button>
                              <button onClick={() => deleteDetail(index)} className="bg-red-500 text-white px-2 py-1 mr-2">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div> */}