import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import moment from 'moment';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
axios.defaults.withCredentials = true;

const PaymentSchedules = () => {
  const navigate = useNavigate();
  const [paymentSchedules, setpaymentSchedules] = useState([]);
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const getpaymentSchedules = async () => {
      try {
        const paymentSchedulesData = await axios.get('/api/v1/payment-schedule');
        if (user.department === 'Site Supervisor' || user.department === 'Site Incharge' && isLoggedIn) {
          const sites = user?.site;
          let PaymentSchedules;
          for (let site of sites) {
            PaymentSchedules = paymentSchedulesData.data?.filter((paymentSchedule) => paymentSchedule?.site?._id.includes(site))
          }
          setpaymentSchedules(PaymentSchedules);
        } else {
          setpaymentSchedules(paymentSchedulesData.data);
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    getpaymentSchedules();
  }, [])

  const handleEdit = (id, index) => {
    navigate(`/edit-paymentSchedule/${id}/${index}`);
  };

  const handleRedirect = (id) => {
    navigate(`/payment-schedule/${id}`);
  }

  // const addMore = async (id) => {
  //   navigate(`/edit-paymentSchedule/${id}`);
  // }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/payment-schedule/${id}`);
      setpaymentSchedules(paymentSchedules.filter((paymentSchedule) => paymentSchedule._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  // const deleteDetail = async (id, index) => {
  //   try {
  //     const response = await axios.delete(`/api/v1/payment-schedule/${id}/paymentDetails/${index}`);
  //     console.log(response.data)
  //     setpaymentSchedules(response.data.paymentSchedules);
  //     toast.success(response.data.message);
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // };

  const handleAdd = () => {
    navigate('/create-payment-schedule');
  };


  return (
    <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
      <section className="overflow-x-auto">
        <Header category="Page" title="Payment Schedule's" />
        <div className="w-full mx-auto mb-6 text-gray-700 p-1 flex flex-row justify-between items-center">
          <h2 className="text-lg sm:text-md md:text-lg lg:text-xl text-green-600 mr-4 pr-2">
            Total Payment Schedules: {paymentSchedules?.length}
          </h2>
          <button onClick={handleAdd} className="bg-green-500 rounded-full text-white px-2 py-2 ">
            <MdAdd className='text-xl' />
          </button>
        </div>

        <div className="overflow-x-auto"
          style={{
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
          }}>
          <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
            <thead className="bg-gray-800">
              <tr className="text-white text-left">
                <th className="font-semibold text-sm uppercase px-6 py-4 "> Name </th>
                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Total Amount </th>
                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Paid Amount </th>
                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Due Amount </th>
                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {paymentSchedules?.map((paymentSchedule) => (
                <tr key={paymentSchedule._id} className='border-b border-blue-gray-200'>
                  <td className="px-6 py-4">
                    <p className=""> {paymentSchedule.site?.name} </p>
                    <p className="text-gray-500 text-sm font-semibold tracking-wide"> {paymentSchedule.client?.name} </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {paymentSchedule.totalValue}
                  </td>
                  <td className="px-6 py-4 text-center">{paymentSchedule.amountPaid ? paymentSchedule.amountPaid : '0'}</td>
                  <td className="px-6 py-4 text-center">{paymentSchedule.remaningAmount ? paymentSchedule.remaningAmount : '0'}</td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleRedirect(paymentSchedule._id)} className="mr-2">
                      <FaExternalLinkAlt className='text-blue-500 hover:text-blue-800 text-lg' />
                    </button>
                    <button onClick={() => handleEdit(paymentSchedule._id)} className="mr-2">
                      <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                    </button>
                    <button onClick={() => handleDelete(paymentSchedule._id)} className="mr-2">
                      <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </section>
    </div>
  )
}

export default PaymentSchedules

{/* {paymentSchedules.map((paymentSchedule) => (
<div key={paymentSchedule._id} className="card mt-6 md:mt-8">
  <details className="rounded-lg bg-white overflow-hidden shadow-lg p-3">
    <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
      <NavLink to={`/payment-schedule/${paymentSchedule._id}`}>
        Payment Schedule of {paymentSchedule.site?.name}
      </NavLink>
      <div className='self-end'>
        <button 
        onClick={() => handleRedirect(paymentSchedule._id)} 
        className="bg-green-500 rounded-2xl text-white px-2 py-1 md:px-1.5 md:py-1.5 mr-2">
          <FaExternalLinkAlt className="text-lg text-white" />
        </button>

        <button
          onClick={() => addMore(paymentSchedule._id)}
          className="bg-blue-500 rounded-2xl text-white px-1.5 py-1.5 mr-2">
          <GrEdit />
        </button>
        <button
          onClick={() => handleDelete(paymentSchedule._id)}
          className="bg-red-500 rounded-2xl text-white px-1.5 py-1.5 mr-2">
          <MdDelete />
        </button>
      </div>
    </summary>

    <table className="w-full text-sm md:text-base text-left rtl:text-right text-gray-500 overflow-x-auto">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Work</th>
          <th scope="col" className="px-6 py-3">Amount</th>
          <th scope="col" className="px-6 py-3">Payment Date</th>
          <th scope="col" className="px-6 py-3">Status</th>
          <th scope="col" className="px-6 py-3">Action</th>
        </tr>
      </thead>

      <tbody>
        {paymentSchedule?.paymentDetails.map((work, index) => (
          <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">
              {work.workDescription}
            </td>
            <td className="px-6 py-4">{work.amount}</td>
            <td className="px-6 py-4">{work.dateOfPayment ? moment(work.dateOfPayment).format('DD-MM-YYYY') : '-'}</td>
            <td className="px-6 py-4">{work.status}</td>
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
  </details>
</div>
))} */}

{/* <section className='bg-white px-8 py-2 mb-16 h-full w-full'> 
 <div className="mt-6 w-full">
  <div className="card">
    <details className="rounded-lg bg-white overflow-hidden shadow-lg p-3">
      <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
        Payment Schedule of
        <div>
          <button
            className="bg-green-500 rounded-2xl text-white px-1.5 py-1.5 mr-2">
            <MdAdd className="text-xl text-white" />
          </button>
          <button
            className="bg-blue-500 rounded-2xl text-white px-1.5 py-1.5 mr-2"
          >
            <GrEdit />
          </button>
          <button
            className="bg-red-500 rounded-2xl text-white px-1.5 py-1.5 mr-2"
          >
            <MdDelete />
          </button>
        </div>
      </summary>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Work</th>
            <th scope="col" className="px-6 py-3">Amount</th>
            <th scope="col" className="px-6 py-3">Payment Date</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">

            </td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4">
              <button
                className="bg-blue-500 text-white px-2 py-1 mr-2"
              >
                <GrEdit />
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 mr-2"
              >
                <MdDelete />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </details>
  </div>
</div> 
</section> */}