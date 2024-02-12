import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import './screen.css';
import { GrEdit } from "react-icons/gr";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdAdd, MdDownload, MdDelete } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { Tabs } from 'antd';
import moment from 'moment';
import Header from '../components/Header';

axios.defaults.withCredentials = true;

const SiteScreen = () => {
  const [site, setSiteData] = useState({});
  const navigate = useNavigate();
  const [projectDetail, setProjectDetail] = useState([]);
  const [workOrders, setWorkOrder] = useState([]);
  const { id } = useParams();
  const [paymentSchedules, setpaymentSchedules] = useState({});
  const [supplierBills, setSupplierBill] = useState([]);
  const [contractorBills, setContractorBill] = useState([]);
  const [contractorExtra, setContractorExtra] = useState([]);
  const [clientExtra, setClientExtra] = useState({});
  const [purchaseOrders, setPurchaseOrder] = useState([])
  console.log(id)
  useEffect(() => {
    if (id) {
      const fetchSiteDetails = async () => {
        try {
          const response = await axios.get(`/api/v1/site/${id}`);
          const site = response.data
          console.log(site)
          setSiteData(site);
          setProjectDetail(site.projectSchedule?.projectDetail)
        } catch (error) {
          console.log('Error fetching site details:', error);
        }
      };
      fetchSiteDetails();
      getpaymentSchedules(id);
      fetchBill(id);
      fetchWorkOrder(id);
      fetchPurchaseOrders(id);
      fetchExtraWork(id)
    }
  }, [id])

  const fetchWorkOrder = async (id) => {
    try {
      const workorder = await axios.get(`/api/v1/work-order/site/${id}`);
      setWorkOrder(workorder?.data)
    } catch (error) {
      console.log('Error fetching payment schedule:', error);
    }
  };

  const getpaymentSchedules = async (id) => {
    try {
      const paymentSchedulesData = await axios.get(`/api/v1/payment-schedule/site/${id}`);
      console.log(paymentSchedulesData.data)
      setpaymentSchedules(paymentSchedulesData.data);
    } catch (error) {
      console.log('Error fetching payment schedule:', error);
    }
  };
  // console.log(paymentSchedules);

  const fetchBill = async (id) => {
    try {
      const billData = await axios.get(`/api/v1/bill/site/${id}`);
      console.log(billData.data)
      const contractorBill = billData.data?.filter((bill) => bill.billFor === 'Contractor') || [];
      const supplierBill = billData.data?.filter((bill) => bill.billFor === 'Supplier') || [];
      setContractorBill([...contractorBill]);
      setSupplierBill([...supplierBill]);
    } catch (error) {
      console.log('Error fetching bill', error);
    }
  };

  const fetchPurchaseOrders = async (id) => {
    try {
      const purchaseOrdersData = await axios.get(`/api/v1/purchase-order/site/${id}`);
      setPurchaseOrder(purchaseOrdersData.data);
      console.log(purchaseOrdersData.data)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchExtraWork = async (id) => {
    try {
      const extraWork = await axios.get(`/api/v1/extra-work/site/${id}`);
      setContractorExtra(extraWork.data?.filter((extrawork) => extrawork.extraFor === 'Contractor'))
      setClientExtra(extraWork?.data.filter((extrawork) => extrawork.extraFor === 'Client')[0])
      // console.log(extraWork.data);
    } catch (error) {
      toast.error(error.message)
    }
  }

  console.log(clientExtra);
  // console.log(contractorExtra);

  const deletePaymentDetail = async (id, index) => {
    try {
      const response = await axios.delete(`/api/v1/payment-schedule/${id}/paymentDetails/${index}`);
      if (paymentSchedules?._id === id) {
        console.log(response.data?.existingPaymentSchedule)
        setpaymentSchedules(response.data?.existingPaymentSchedule)
      }
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

  const deletePurchaseOrder = async (id) => {
    try {

    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteWorkOrder = async (id) => {
    try {
      await axios.delete(`/api/v1/work-order/${id}`);
      setWorkOrder(workOrders.filter((workOrder) => workOrder._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const deleteExtraWork = async (id) => {
    try {
      await axios.delete(`/api/v1/extra-work/${id}`);
      setContractorExtra(contractorExtra.filter((contractorExtra) => contractorExtra._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const deleteExtraWorkDetail = async (id, index) => {
    try {
      const deletedWork = await axios.delete(`/api/v1/extra-work/${id}/work/${index}`);
      setClientExtra(deletedWork.data?.extraWork);
      toast.success(deletedWork.data?.message)
    } catch (error) {
      toast.error(error.message)
    }
  };


  return (
    <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
    <Header category="Page" title="Work-Orders" />
    <section className='px-12 py-8 mb-16 h-full w-full'>
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
              Payment Schedule
              <button onClick={() => { navigate('/create-payment-schedule') }}
                className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                <MdAdd className="text-xl text-white" />
              </button>
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
                {paymentSchedules.paymentDetails?.map((paymentDetail, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">
                      {paymentDetail?.workDescription}
                    </td>
                    <td className="px-6 py-4">{paymentDetail?.amount}</td>
                    <td className="px-6 py-4">{paymentDetail?.paymentDate ? moment(paymentDetail?.paymentDate).format('DD-MM-YYYY') : '-'}</td>
                    <td className="px-6 py-4">{paymentDetail?.status}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => {
                        navigate(`/edit-paymentSchedule/${paymentSchedules._id}/${index}`)
                      }}
                        className="bg-blue-500 text-white px-2 py-1 mr-2 text-md">
                        <GrEdit />
                      </button>
                      <button
                        onClick={() => deletePaymentDetail(paymentSchedules._id, index)}
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
                  onClick={() => navigate(`/edit-paymentSchedule/${paymentSchedules?._id}`)}
                  className="bg-green-500 rounded-2xl text-white flex px-2 py-1.5 mr-2">
                  <MdAdd className="text-xl text-white" /> More
                </button>
                <button
                  onClick={() => navigate(`/payment-schedule/${paymentSchedules._id}`)}
                  className="bg-blue-500 rounded-2xl text-white flex px-2 py-1.5 ml-2">
                  <FaExternalLinkAlt className="text-lg text-white" />
                </button>
              </div>
            </table>

          </details>
        </div>

        {/* Project Schedules */}
        <div className="card ">
          <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Project Schedule
              <button onClick={() => { navigate('/create-project-schedule') }}
                className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                <MdAdd className="text-xl text-white" />
              </button>
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
                    <td className="px-6 py-4">{work.toStart ? moment(work.toStart).format('DD-MM-YYYY') : '-'}</td>
                    <td className="px-6 py-4">{work.status}</td>
                    <td className="px-6 py-4 text-center">{work.startedAt ? moment(work.startedAt).format('DD-MM-YYYY') : '-'}</td>
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
              <div className='text-right mt-4 ml-2 flex gap-1'>
                <button
                  onClick={() => navigate(`/edit-projectSchedule/${site?.projectSchedule._id}`)}
                  className="bg-green-500 rounded-2xl text-white flex px-2 py-1.5 mr-2">
                  <MdAdd className="text-xl text-white" /> More
                </button>
                <button
                  onClick={() => navigate(`/project-schedule/${site?.projectSchedule._id}`)}
                  className="bg-blue-500 rounded-2xl text-white flex px-2 py-1.5 ml-2">
                  <FaExternalLinkAlt className="text-lg text-white" />
                </button>
              </div>
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
                  <th scope="col" className="px-6 py-3">Duration</th>
                  <th scope="col" className="px-6 py-3">Total Value</th>
                  <th scope="col" className="px-6 py-3">Total Paid</th>
                  <th scope="col" className="px-6 py-3">Total Due</th>
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
                    <td className="px-6 py-4">{workorder.duration ? moment(workorder.duration).format('DD-MM-YYYY') : '-'}</td>
                    <td className="px-6 py-4">{workorder.workOrderValue}</td>
                    <td className="px-6 py-4">{workorder.totalPaid}</td>
                    <td className="px-6 py-4">{workorder.totalDue}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/work-order/${workorder._id}`)}
                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                      >
                        <FaExternalLinkAlt />
                      </button>
                      <button
                        onClick={() => navigate(`/edit-workOrder/${workorder._id}`)}
                        className="bg-green-500 text-white px-2 py-1 mr-2"
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

              <Tabs.TabPane tab='Contractor' key={'contractor'}>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Contractor</th>
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
                          {bill?.contractor?.name}
                        </td>
                        <td className="px-6 py-4">
                          {bill?.billOf.workDescription}
                        </td>
                        <td className="px-6 py-4">{bill?.billOf.amount}</td>
                        <td className="px-6 py-4">{bill?.dateOfPayment ? moment(bill?.dateOfPayment).format('DD-MM-YYYY') : '-'}</td>
                        <td className="px-6 py-4">{bill?.paidAmount ? bill?.paidAmount : '0'}</td>
                        <td className="px-6 py-4">{bill?.dueAmount ? bill?.dueAmount : '0'}</td>
                        <td className="px-6 py-4">{bill?.paymentStatus}</td>
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
                      <th scope="col" className="px-6 py-3">Supplier</th>
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
                          {bill?.supplier?.name}
                        </td>
                        <td className="px-6 py-4">
                          {bill?.billOf.material}
                        </td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4">{bill?.dateOfPayment ? moment(bill?.dateOfPayment).format('DD-MM-YYYY') : '-'}</td>
                        <td className="px-6 py-4">{bill?.paidAmount ? bill?.paidAmount : '0'}</td>
                        <td className="px-6 py-4">{bill?.dueAmount ? bill?.dueAmount : '0'}</td>
                        <td className="px-6 py-4">{bill?.paymentStatus}</td>
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
                  <th scope="col" className="px-6 py-3">Supplier</th>
                  <th scope="col" className="px-6 py-3">Total Amount</th>
                  <th scope="col" className="px-6 py-3">Total Paid</th>
                  <th scope="col" className="px-6 py-3">Total Due</th>
                  <th scope="col" className="px-6 py-3">Requirements</th>
                  <th scope="col" className="px-6 py-3">Approval</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {purchaseOrders?.map((purchaseOrder) => (
                  <tr key={purchaseOrder._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">
                      {purchaseOrder.supplier?.name}
                    </td>
                    <td className="px-6 py-4">{purchaseOrder.totalAmount}</td>
                    <td className="px-6 py-4">{purchaseOrder.paidAmount}</td>
                    <td className="px-6 py-4">{purchaseOrder.dueAmount}</td>
                    <td className="px-6 py-4">
                      <NavLink to={`/purchase-order/${purchaseOrder?._id}`}>
                        {purchaseOrder.requirement?.length}
                      </NavLink>
                    </td>
                    <td className="px-6 py-4">{purchaseOrder.approvalStatus}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/purchase-order/${purchaseOrder?._id}`)}
                        className="bg-blue-500 text-white px-2 py-1 mr-2">
                        <FaExternalLinkAlt />
                      </button>
                      <button
                        onClick={() => navigate(`/edit-purchaseOrder/${purchaseOrder?._id}`)}
                        className="bg-green-500 text-white px-2 py-1 mr-2">
                        <GrEdit />
                      </button>
                      <button
                        onClick={() => deletePurchaseOrder(purchaseOrder?._id)}
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
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">

                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Work</th>
                      <th scope="col" className="px-6 py-3">Rate</th>
                      <th scope="col" className="px-6 py-3">Area</th>
                      <th scope="col" className="px-6 py-3">Unit</th>
                      <th scope="col" className="px-6 py-3">Amount</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-3 py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {clientExtra?.WorkDetail?.map((workDetail, index) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                          {workDetail?.work}
                        </td>
                        <td className="px-6 py-4">{workDetail?.rate}</td>
                        <td className="px-6 py-4">{workDetail?.area}</td>
                        <td className="px-6 py-4">{workDetail?.amount}</td>
                        <td className="px-6 py-4">{workDetail?.paymentStatus}</td>
                        <td className="px-6 py-4">{workDetail?.work}</td>
                        <td className="px-6 py-4">{workDetail?.work}</td>
                        <td className="px-3 py-4">
                          <button
                            onClick={() => navigate(`/edit-extra-work/${clientExtra._id}/work/${index}`)}
                            className="bg-blue-500 text-white px-2 py-1 mr-2">
                            <GrEdit />
                          </button>
                          <button
                          onClick={()=> deleteExtraWorkDetail(clientExtra._id, index)}
                            className="bg-red-500 text-white px-2 py-1 mr-2">
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <div className='text-right mt-4 ml-2 flex gap-1'>
                    <button
                      onClick={() => navigate(`/edit-extra-work/${clientExtra._id}`)}
                      className="bg-green-500 rounded-2xl text-white flex px-2 py-1.5 mr-2">
                      <MdAdd className="text-xl text-white" /> More
                    </button>
                    <button
                      onClick={() => navigate(`/extra-work/${clientExtra._id}`)}
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
                      <th scope="col" className="px-6 py-3">Amount</th>
                      <th scope="col" className="px-6 py-3">Paid</th>
                      <th scope="col" className="px-6 py-3">Due</th>
                      <th scope="col" className="px-6 py-3">Total Work</th>
                      <th scope="col" className="px-3 py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {contractorExtra.map((extraWork) => (
                      <tr key={extraWork._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                          {extraWork?.contractor?.name}
                        </td>
                        <td className="px-6 py-4">{extraWork?.totalAmount}</td>
                        <td className="px-6 py-4">{extraWork?.paid}</td>
                        <td className="px-6 py-4">{extraWork?.due}</td>
                        <td className="px-6 py-4">
                          {extraWork?.WorkDetail.length}
                        </td>
                        <td className="px-3 py-4">
                          <button
                            onClick={() => navigate(`/extra-work/${extraWork._id}`)}
                            className="bg-blue-500 text-white px-2 py-1 mr-2">
                            <FaExternalLinkAlt />
                          </button>
                          <button
                            onClick={() => navigate(`/edit-extra-work/${extraWork._id}`)}
                            className="bg-green-500 text-white px-2 py-1 mr-2">
                            <GrEdit />
                          </button>
                          <button
                            onClick={() => deleteExtraWork(extraWork._id)}
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

      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </section>
    </div>
  )
}

export default SiteScreen

