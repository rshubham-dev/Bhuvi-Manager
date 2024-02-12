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

  const addMore = async (id) => {
    navigate(`/edit-paymentSchedule/${id}`);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/payment-schedule/${id}`);
      setpaymentSchedules(paymentSchedules.filter((paymentSchedule) => paymentSchedule._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const deleteDetail = async (id, index) => {
    try {
      const response = await axios.delete(`/api/v1/payment-schedule/${id}/paymentDetails/${index}`);
      console.log(response.data)
      setpaymentSchedules(response.data.paymentSchedules);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleAdd = () => {
    navigate('/create-payment-schedule');
  };


  return (
    <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
    <Header category="Page" title="Payment Schedules" />
    <section className='bg-white px-4 md:px-8 lg:px-12 py-6 mb-16 h-full w-full max-w-screen-xl mx-auto'>
      {/* <h1 className="text-3xl font-semibold text-gray-800 text-center">Payment Schedules</h1> */}
      <div className=" mb-4 mr-20 mt-6 text-right flex justify-between align-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-green-600 ml-4">
          Total Payment Schedules: {paymentSchedules?.length}
        </h2>
        <button onClick={handleAdd} className="bg-green-500 text-white rounded-full p-2">
        <MdAdd className='text-xl' />
        </button>

      </div>

      {paymentSchedules.map((paymentSchedule) => (
        <div key={paymentSchedule._id} className="card mt-4 md:mt-6">
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
      ))}

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </section>
    </div>
  )
}

export default PaymentSchedules


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