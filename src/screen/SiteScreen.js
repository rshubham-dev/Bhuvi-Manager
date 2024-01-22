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
  const [workOrders, setWorkOrder] = useState([]);
  const { id } = useParams();
  // const [paymentSchedules, setpaymentSchedules] = useState([]);
  const [supplierPaymentSchedules, setSupplierPaymentSchedules] = useState([]);
  const [supplierBills, setSupplierBill] = useState([]);
  const [contractorPaymentSchedules, setContractorPaymentSchedules] = useState([]);
  const [contractorBills, setContractorBill] = useState([]);
  const [clientPaymentSchedules, setClientPaymentSchedules] = useState();
  const [clientBills, setClientBill] = useState([]);
  const [materialBills, setMaterialBill] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchSiteDetails = async () => {
        try {
          const response = await axios.get(`/api/v1/site/${id}`);
          const site = response.data
          setSiteData(site);
          setProjectDetail(site.projectSchedule?.projectDetail)
          setWorkOrder(site.workOrder)
        } catch (error) {
          console.log('Error fetching site details:', error);
        }
      };
      fetchSiteDetails();
      getpaymentSchedules(id);
      fetchBill(id)
    }
  }, [])

  const getpaymentSchedules = async (id) => {
    try {
      const paymentSchedulesData = await axios.get(`/api/v1/payment-schedule/site/${id}`);
      console.log(paymentSchedulesData.data)
      const clientSchedules = paymentSchedulesData.data?.filter((paymentSchedule) => paymentSchedule.scheduleFor === 'Client') || [];
      const contractorSchedules = paymentSchedulesData.data?.filter((paymentSchedule) => paymentSchedule.scheduleFor === 'Contractor') || [];
      const supplierSchedules = paymentSchedulesData.data?.filter((paymentSchedule) => paymentSchedule.scheduleFor === 'Supplier') || [];
      setClientPaymentSchedules(...clientSchedules);
      setContractorPaymentSchedules([...contractorSchedules]);
      setSupplierPaymentSchedules([...supplierSchedules]);
    } catch (error) {
      console.log('Error fetching payment schedule:', error);
    }
  };
  console.log(contractorPaymentSchedules);

  const fetchBill = async (id) => {
    try {
      const billData = await axios.get(`/api/v1/bill/site/${id}`);
      console.log(billData.data)
      const clientBill = billData.data?.filter((bill) => bill.billFor === 'Client') || [];
      const contractorBill = billData.data?.filter((bill) => bill.billFor === 'Contractor') || [];
      const supplierBill = billData.data?.filter((bill) => bill.billFor === 'Supplier') || [];
      const materialBill = billData.data?.filter((bill) => bill.billFor === 'Material') || [];
      setClientBill([...clientBill]);
      setContractorBill([...contractorBill]);
      setSupplierBill([...supplierBill]);
      setMaterialBill([...materialBill]);
    } catch (error) {
      console.log('Error fetching bill', error);
    }
  };
  // const fetchPurchaseOrders = async () => {
  //   try {
  //     const response = await axios.get(`/api/v1/purchase-order/${bill.site}/${bill.supplier}`);
  //     setPurchaseOrder(purchaseOrdersData.data);
  //     console.log(purchaseOrdersData.data)
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // }
  // fetchPurchaseOrders();

  const deletePaymentDetail = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/payment-schedule/${id}`);
      if (clientPaymentSchedules._id === id) {
        setClientPaymentSchedules(null)
      }
      setContractorPaymentSchedules(contractorPaymentSchedules.filter((paymentSchedule) => paymentSchedule._id !== id))
      setSupplierPaymentSchedules(supplierPaymentSchedules.filter((paymentSchedule) => paymentSchedule._id !== id))
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

  const deleteWorkOrder = async (id) => {
    try {
      await axios.delete(`/api/v1/work-order/${id}`);
      setWorkOrder(workOrders.filter((workOrder) => workOrder._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <section className='bg-white px-12 py-8 mb-16 h-full w-full'>
      <h1 className="text-3xl font-semibold text-gray-800"> Site Details</h1>
      <div className="mt-6 w-full">

        {/* Site Info */}
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

        {/* Agreement */}
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

        {/* Payment Schedules */}
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
                  <div className='text-right mt-4 ml-2 flex gap-1'>
                    <button
                      onClick={() => navigate(`/edit-paymentSchedule/${clientPaymentSchedules?._id}`)}
                      className="bg-green-500 rounded-2xl text-white flex px-2 py-1.5 mr-2">
                      <MdAdd className="text-xl text-white" /> More
                    </button>
                    <button
                      onClick={() => navigate(`/payment-schedule/${clientPaymentSchedules._id}`)}
                      className="bg-blue-500 rounded-2xl text-white flex px-2 py-1.5 ml-2">
                      <FaExternalLinkAlt className="text-lg text-white" />
                    </button>
                  </div>
                </table>
              </Tabs.TabPane>

              <Tabs.TabPane tab='Contractor' key={'contractor'}>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Contractor</th>
                      <th scope="col" className="px-6 py-3">Total Payment</th>
                      <th scope="col" className="px-6 py-3">Amount Paid</th>
                      <th scope="col" className="px-6 py-3">Remaning Payment</th>
                      <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contractorPaymentSchedules?.map((paymentSchedule) => (
                      <tr key={paymentSchedule._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">{paymentSchedule.contractor?.name}</td>
                        <td className='px-6 py-4'>{paymentSchedule.totalValue}</td>
                        <td className='px-6 py-4'>{paymentSchedule.amountPaid}</td>
                        <td className='px-6 py-4'>{paymentSchedule.remaningAmount}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => {
                            navigate(`/payment-schedule/${paymentSchedule._id}`)
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
                      <th scope="col" className="px-6 py-3">Contractor</th>
                      <th scope="col" className="px-6 py-3">Total Payment</th>
                      <th scope="col" className="px-6 py-3">Amount Paid</th>
                      <th scope="col" className="px-6 py-3">Remaning Payment</th>
                      <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierPaymentSchedules?.map((paymentSchedule) => (
                      <tr key={paymentSchedule._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">{paymentSchedule.supplier?.name}</td>
                        <td className='px-6 py-4'>{paymentSchedule.totalValue}</td>
                        <td className='px-6 py-4'>{paymentSchedule.amountPaid}</td>
                        <td className='px-6 py-4'>{paymentSchedule.remaningAmount}</td>
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

        {/* Project Schedules */}
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

        {/* Quality Check Schedule */}
        {/* <div className="card ">
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
        </div> */}

        {/* Work Order */}
        <div className="card ">
          <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Work Order
              <button onClick={() => { navigate('/create-work-order') }}
                className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                <MdAdd className="text-xl text-white" />
              </button>
            </summary>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Contractor</th>
                  <th scope="col" className="px-6 py-3">Work Order No</th>
                  <th scope="col" className="px-6 py-3">Work Order Value</th>
                  <th scope="col" className="px-6 py-3">Duration</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workOrders?.map((workorder) => (
                  <tr key={workorder._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">
                      {workorder.workOrderName}
                    </td>
                    <td className="px-6 py-4">{workorder.contractor?.name}</td>
                    <td className="px-6 py-4">{workorder.workOrderNo}</td>
                    <td className="px-6 py-4">{workorder.workOrderValue}</td>
                    <td className="px-6 py-4">{workorder.duration}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/work-order/${workorder._id}`)}
                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                      >
                        <FaExternalLinkAlt />
                      </button>
                      <button
                        onClick={() => navigate(`/edit-workOrder/${workorder._id}`)}
                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                      >
                        <GrEdit />
                      </button>
                      <button
                        onClick={() => deleteWorkOrder(workorder._id)}
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

        {/* Bills */}
        <div className="card ">
          <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Bills
              <button onClick={() => { navigate('/create-bill') }}
                className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                <MdAdd className="text-xl text-white" />
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
                      <th scope="col" className="px-6 py-3">Paid</th>
                      <th scope="col" className="px-6 py-3">Due</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-3 py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {clientBills.map((bill) => (
                      <tr key={bill._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                        </td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-3 py-4">
                          <button
                            className="bg-blue-500 text-white px-2 py-1 mr-2">
                            <GrEdit />
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 mr-2">
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Tabs.TabPane>

              <Tabs.TabPane tab='Contractor' key={'contractor'}>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Work</th>
                      <th scope="col" className="px-6 py-3">Amount</th>
                      <th scope="col" className="px-6 py-3">Payment Date</th>
                      <th scope="col" className="px-6 py-3">Paid</th>
                      <th scope="col" className="px-6 py-3">Due</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-3 py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {contractorBills.map((bill) => (
                      <tr key={bill._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                        </td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-3 py-4">
                          <button
                            className="bg-blue-500 text-white px-2 py-1 mr-2">
                            <GrEdit />
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 mr-2">
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
                      <th scope="col" className="px-6 py-3">Material</th>
                      <th scope="col" className="px-6 py-3">Amount</th>
                      <th scope="col" className="px-6 py-3">Payment Date</th>
                      <th scope="col" className="px-6 py-3">Paid</th>
                      <th scope="col" className="px-6 py-3">Due</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-3 py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {supplierBills.map((bill) => (
                      <tr key={bill._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                        </td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-3 py-4">
                          <button
                            className="bg-blue-500 text-white px-2 py-1 mr-2">
                            <GrEdit />
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 mr-2">
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Tabs.TabPane>

              <Tabs.TabPane tab='Material' key={'material'}>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Material</th>
                      <th scope="col" className="px-6 py-3">Amount</th>
                      <th scope="col" className="px-6 py-3">Payment Date</th>
                      <th scope="col" className="px-6 py-3">Paid</th>
                      <th scope="col" className="px-6 py-3">Due</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-3 py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {materialBills.map((bill) => (
                      <tr key={bill._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                        </td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-3 py-4">
                          <button
                            className="bg-blue-500 text-white px-2 py-1 mr-2">
                            <GrEdit />
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 mr-2">
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

        {/* Purchase Order */}
        <div className="card ">
          <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Purchase Order
              <button onClick={() => { navigate('/create-purchase-order') }}
                className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                <MdAdd className="text-xl text-white" />
              </button>
            </summary>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Material</th>
                  <th scope="col" className="px-6 py-3">Rate</th>
                  <th scope="col" className="px-6 py-3">Quantity</th>
                  <th scope="col" className="px-6 py-3">Unit</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>

              {/* {purchaseOrder?.requirement.map((requirement)=>(
                  <tbody key={requirement._id}>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                          {requirement.material}
                        </td>
                        <td className="px-6 py-4">{requirement.rate}</td>
                        <td className="px-6 py-4">{requirement.quantity}</td>
                        <td className="px-6 py-4">{requirement.unit}</td>
                        <td className="px-6 py-4">{requirement.amount}</td>
                        <td className="px-6 py-4">{requirement.status}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => editRequirement()}
                            className="bg-blue-500 text-white px-2 py-1 mr-2">
                            <GrEdit />
                          </button>
                          <button
                            onClick={() => deleteRequirement()}
                            className="bg-red-500 text-white px-2 py-1 mr-2">
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                  </tbody>
                  ))} */}
            </table>
          </details>
        </div>

        {/* Extra Work */}
        <div className="card ">
          <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Extra Work
              <button onClick={() => { navigate('/create-extra-work') }}
                className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                <MdAdd className="text-xl text-white" />
              </button>
            </summary>
            <Tabs defaultActiveKey='client'>

              <Tabs.TabPane tab='Client' key={'client'}>
              </Tabs.TabPane>

              <Tabs.TabPane tab='Contractor' key={'contractor'}>
              </Tabs.TabPane>

            </Tabs>
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

