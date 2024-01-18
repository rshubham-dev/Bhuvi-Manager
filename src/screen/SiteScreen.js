import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './screen.css';
import { GrEdit } from "react-icons/gr";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdAdd, MdDownload, MdDelete } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { Tabs } from 'antd';

axios.defaults.withCredentials = true;

const SiteScreen = () => {
  const [site, setSiteData] = useState({});
  const navigate = useNavigate();
  const [projectDetail, setProjectDetail] = useState([]);
  const { id } = useParams();
  const [paymentSchedules, setpaymentSchedules] = useState([]);
  const [supplierPaymentSchedules, setsupplierPaymentSchedules] = useState([]);
  const [contractorPaymentSchedules, setcontractorPaymentSchedules] = useState([]);
  const [clientPaymentSchedules, setclientPaymentSchedules] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSiteDetails(id);
      getpaymentSchedules(id);
    }

  }, [])

  const getpaymentSchedules = async (id) => {
    try {
      const paymentSchedulesData = await axios.get(`/api/v1/payment-schedule/site/${id}`);
      setpaymentSchedules(paymentSchedulesData.data);
      setclientPaymentSchedules(
        ...paymentSchedulesData.data.filter((paymentSchedule) => paymentSchedule.scheduleFor === 'Client')
      );
      setcontractorPaymentSchedules([
        ...paymentSchedulesData.data.filter((paymentSchedule) => paymentSchedule.scheduleFor === 'Contractor')
      ]);
      setsupplierPaymentSchedules([
        ...paymentSchedulesData.data.filter((paymentSchedule) => paymentSchedule.scheduleFor === 'Supplier')
      ]);
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchSiteDetails = async (id) => {
    try {
      const response = await axios.get(`/api/v1/site/${id}`);
      setSiteData(response.data);
      setProjectDetail(response.data?.projectSchedule.projectDetail)
    } catch (error) {
      console.log('Error fetching site details:', error);
    }
  };
  console.log(clientPaymentSchedules)


  const deletePaymentDetail = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/payment-schedule/${id}`);
      console.log(response.data)
    } catch (error) {
      toast.error(error.message)
    }
  };

  const deleteProjectDetail = async (id, index) => {
    try {
      const response = await axios.delete(`/api/v1/project-schedule/${id}/projectDetails/${index}`);
      setProjectDetail(response.data)
      console.table(response.data)
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <section className='bg-white px-12 py-8 mb-16 h-full w-full'>
      <h1 className="text-3xl font-semibold text-gray-800"> Site Details</h1>
      <div className="mt-6 w-full">

        <div className="card ">
          <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Site Info
            </summary>

            <div className='flex justify-between flex-row my-1.5'>
              <dt className='font-medium text-color-title mx-5 my-1.5'>Name</dt>
              <dd className='text-color-title mx-5 my-1.5'>{site.name}</dd>
            </div>

            <div className='flex justify-between flex-row my-1.5'>
              <dt className='font-medium text-color-title mx-5 my-1.5'>Site Id</dt>
              <dd className='text-color-title mx-5 my-1.5'>{site.siteId}</dd>
            </div>

            <div className='flex justify-between flex-row my-1.5'>
              <dt className='font-medium text-color-title mx-5 my-1.5'>Client</dt>
              <dd className='text-color-title mx-5 my-1.5'>{site.client?.name}</dd>
            </div>

            <div className='flex justify-between flex-row my-1.5'>
              <dt className='font-medium text-color-title mx-5 my-1.5'>Project Type</dt>
              <dd className='text-color-title mx-5 my-1.5'>{site.projectType}</dd>
            </div>

            <div className='flex justify-between flex-row my-1.5'>
              <dt className='font-medium text-color-title mx-5 my-1.5'>Total Floor</dt>
              <dd className='text-color-title mx-5 my-1.5'>{site.floors}</dd>
            </div>

            <div className='flex justify-between flex-row my-1.5'>
              <dt className='font-medium text-color-title mx-5 my-1.5'>Site Incharge</dt>
              <dd className='text-color-title mx-5 my-1.5'>{site.incharge?.userName}</dd>
            </div>

            <div className='flex justify-between flex-row my-1.5'>
              <dt className='font-medium text-color-title mx-5 my-1.5'>Site Supervisor</dt>
              <dd className='text-color-title mx-5 my-1.5'>{site.supervisor?.userName}</dd>
            </div>

            <div className='flex justify-between flex-row my-1.5'>
              <dt className='font-medium text-color-title mx-5 my-1.5'>Address</dt>
              <dd className='text-color-title mx-5 my-1.5'>
                {site?.address}
              </dd>
            </div>

          </details>
        </div>

        <div className="card ">
          <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Agreement
            </summary>
            <div className='flex justify-between flex-row my-1.5'>
              <dt className='font-medium text-color-title mx-5 my-1.5'>{site.agreement}</dt>
              <dd className='text-color-title mx-5 my-1.5 self-end bg-green-500 p-1 rounded-2xl'>
                <Link>
                  <MdDownload className="text-xl text-white" />
                </Link>
              </dd>
            </div>
          </details>
        </div>


        <div className="card">
          <details className="rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Payment Schedules
                  <button
                    onClick={() => navigate('/create-payment-schedule')}
                    className="bg-green-500 text-white p-1.5 rounded-2xl text-lg mr-2">
                    <MdAdd />
                  </button>
            </summary>
            <Tabs defaultActiveKey='client'>
              <Tabs.TabPane tab='Client' key={'client'}>
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
                    {clientPaymentSchedules?.paymentDetails?.map((paymentDetail, index) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                          {paymentDetail.workDescription}
                        </td>
                        <td className="px-6 py-4">{paymentDetail.amount}</td>
                        <td className="px-6 py-4">{paymentDetail.paymentDate}</td>
                        <td className="px-6 py-4">{paymentDetail.status}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => {
                            navigate(`/edit-paymentSchedule/${clientPaymentSchedules._id}/${index}`)
                          }}
                            className="bg-blue-500 text-white px-2 py-1 mr-2 text-md">
                            <GrEdit />
                          </button>
                          <button
                            onClick={() => deletePaymentDetail(clientPaymentSchedules._id, index)}
                            className="bg-red-500 text-white px-2 py-1 text-md"
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <div className='text-right mt-4'>
                  <button
                    onClick={() => navigate(`/edit-paymentSchedule/${clientPaymentSchedules?._id}`)}
                    className="bg-green-500 rounded-2xl text-white flex px-2 py-1.5 mr-2">
                    <MdAdd className="text-xl text-white" /> More
                  </button>
                </div>
                </table>
              </Tabs.TabPane>

              <Tabs.TabPane tab='Contractor' key={'contractor'}>
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
                    {contractorPaymentSchedules?.map((paymentSchedule) => (
                      <tr key={paymentSchedule._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">

                        </td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4">
                          <button onClick={() => {
                            navigate(`/project-schedule/${paymentSchedule._id}`)
                          }}
                            className="bg-blue-500 text-white px-2 py-1 mr-2 text-md">
                            <FaExternalLinkAlt />
                          </button>
                          <button
                            onClick={() => deletePaymentDetail(paymentSchedule._id)}
                            className="bg-red-500 text-white px-2 py-1 text-md"
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Tabs.TabPane>

              <Tabs.TabPane tab='Supplier' key={'supplier'}>
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
                    {supplierPaymentSchedules?.map((paymentSchedule) => (
                      <tr key={paymentSchedule._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">

                        </td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4">
                          <button onClick={() => {
                            navigate(`/project-schedule/${paymentSchedule._id}`)
                          }}
                            className="bg-blue-500 text-white px-2 py-1 mr-2 text-md">
                            <FaExternalLinkAlt />
                          </button>
                          <button
                            onClick={() => deletePaymentDetail(paymentSchedule._id)}
                            className="bg-red-500 text-white px-2 py-1 text-md"
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Tabs.TabPane>

            </Tabs>
          </details>
        </div>

        <div className="card ">
          <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Project Schedules
              <div className='self-end'>
                <button onClick={() => { navigate(`/edit-projectSchedule/${site?.projectSchedule._id}`) }}
                  className="bg-green-500 text-white p-1.5 rounded-2xl text-lg mr-2">
                  <MdAdd />
                </button>
                <button onClick={() => {
                  navigate(`/project-schedule/${site?.projectSchedule._id}`)
                }}
                  className="bg-blue-500 text-white p-2 rounded-2xl text-sm">
                  <FaExternalLinkAlt />
                </button>
              </div>
            </summary>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Work</th>
                  <th scope="col" className="px-6 py-3">Starting Date</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Actual Date</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {projectDetail?.map((work, index) => (
                  <tr key={work._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{work.workDetail}</td>
                    <td className="px-6 py-4">{work.toStart}</td>
                    <td className="px-6 py-4">{work.status}</td>
                    <td className="px-6 py-4 text-center">{work.startedAt ? work.startedAt : '-'}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/edit-projectSchedule/${site?.projectSchedule._id}/${index}`)}
                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                      >
                        <GrEdit />
                      </button>
                      <button
                        onClick={() => deleteProjectDetail(site?.projectSchedule._id, index)}
                        className="bg-red-500 text-white px-2 py-1 mr-2"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </div>

        <div className="card ">
          <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Quality Check Schedule
              <div className='self-end'>
                <button onClick={() => { navigate('') }}
                  className="bg-green-500 text-white p-1.5 rounded-2xl text-lg mr-2">
                  <MdAdd />
                </button>
                <button onClick={() => {
                  navigate(`/project-schedule/${site?.projectSchedule._id}`)
                }}
                  className="bg-blue-500 text-white p-2 rounded-2xl text-sm">
                  <FaExternalLinkAlt />
                </button>
              </div>
            </summary>
            <div className='flex justify-between flex-row my-1.5'>
              <dt className='font-medium text-color-title mx-5 my-1.5'></dt>
              <dd className='text-color-title mx-5 my-1.5'></dd>
            </div>
          </details>
        </div>

        <div className="card ">
          <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Work Order
              <button onClick={() => { navigate('') }}
                className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                <MdAdd className="text-xl text-white" />
              </button>
            </summary>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Contractor</th>
                  <th scope="col" className="px-6 py-3">Work Order Value</th>
                  <th scope="col" className="px-6 py-3">Duration</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {site.workOrder?.map((workorder) => (
                  <tr key={workorder._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">
                      {workorder.workOrderName}
                    </td>
                    <td className="px-6 py-4">{workorder.workOrderNo}</td>
                    <td className="px-6 py-4">{workorder.site?.name}</td>
                    <td className="px-6 py-4">{workorder.workOrderValue}</td>
                    <td className="px-6 py-4">{workorder.duration}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                      >
                        <FaExternalLinkAlt />
                      </button>
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
                ))}
              </tbody>
            </table>

          </details>
        </div>

        <div className="card ">
          <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Bills
              <button onClick={() => { navigate('') }}
                className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                <MdAdd className="text-xl text-white" />
              </button>
            </summary>
            <div className='flex justify-between flex-row my-1.5'>
              <dt className='font-medium text-color-title mx-5 my-1.5'></dt>
              <dd className='text-color-title mx-5 my-1.5'></dd>
            </div>
          </details>
        </div>

        <div className="card ">
          <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Purchase Order
              <button onClick={() => { navigate('') }}
                className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                <MdAdd className="text-xl text-white" />
              </button>
            </summary>
            <div className='flex justify-between flex-row my-1.5'>
              <dt className='font-medium text-color-title mx-5 my-1.5'></dt>
              <dd className='text-color-title mx-5 my-1.5'></dd>
            </div>
          </details>
        </div>

        <div className="card ">
          <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Extra Work
              <button onClick={() => { navigate('') }}
                className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                <MdAdd className="text-xl text-white" />
              </button>
            </summary>
            <div className='flex justify-between flex-row my-1.5'>
              <dt className='font-medium text-color-title mx-5 my-1.5'></dt>
              <dd className='text-color-title mx-5 my-1.5'></dd>
            </div>
          </details>
        </div>

      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </section>
  )
}

export default SiteScreen

