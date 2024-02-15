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
  // console.log(id)
  useEffect(() => {
    if (id) {
      const fetchSiteDetails = async () => {
        try {
          const response = await axios.get(`/api/v1/site/${id}`);
          const site = response.data
          // console.log(site)
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
      // console.log(paymentSchedulesData.data)
      setpaymentSchedules(paymentSchedulesData.data);
    } catch (error) {
      console.log('Error fetching payment schedule:', error);
    }
  };
  // console.log(paymentSchedules);

  const fetchBill = async (id) => {
    try {
      const billData = await axios.get(`/api/v1/bill/site/${id}`);
      // console.log(billData.data)
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
      // console.log(purchaseOrdersData.data)
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

  // console.log(clientExtra);
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
      const response = await axios.delete(`/api/v1/purchase-order/${id}`);
      setPurchaseOrder(purchaseOrders.filter((purchaseOrder) => purchaseOrder._id !== id));
      toast.success(response.data)
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

  const SiteDetailCard = ({ name, siteId, client, projectType, floors, incharge, supervisor, address, handleEdit }) => {
    return (
      <div className=" px-2 py-4">
        <h2 className="text-xl font-semibold mb-4">{name}</h2>
        <div className='flex flex-col gap-2 text-md'>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Site Id:</div>
            <div className="text-gray-800">{siteId}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Client:</div>
            <div className="text-gray-800">{client}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Project Type:</div>
            <div className="text-gray-800">{projectType}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Total Floors:</div>
            <div className="text-gray-800">{floors}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Incharge:</div>
            <div className="text-gray-800">{incharge}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Supervisor:</div>
            <div className="text-gray-800">{supervisor}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Address:</div>
            <div className="text-gray-800">{address}</div>
          </div>
          <div className="mt-2">
            <button onClick={handleEdit} className="text-blue-500">
              <GrEdit className="inline-block mr-2" />
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='m-1 md:m-6 p-6 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
      <Header category="Page" title="Site Detail's" />
      <section className='py-6 mb-16 h-full w-full'>
        <div className="w-full">

          {/* Site Info */}
          <div className="grid grid-cols-1 md:grid-cols-1 w-full lg:grid-cols-1 xl:grid-cols-2 gap-6">
            <details className=" border-l-8 border-blue-500 info bg-white shadow-lg rounded-md px-2 py-3 w-full mb-8 ">
              <summary className='flex text-xl font-large text-color-title cursor-pointer' style={{ padding: '0.5rem' }}>
                Site Details
              </summary>
              <SiteDetailCard
                name={site.name}
                siteId={site.siteId}
                client={site.client?.name}
                projectType={site.projectType}
                floors={site.floors}
                incharge={site.incharge?.userName}
                supervisor={site.supervisor?.userName}
                address={site?.address}
                handleEdit={() => handleEdit(site._id)}
              />
            </details>

            {/* Agreement */}
            {/* <div className='border-l-8 border-blue-500 info rounded-lg bg-red-400 overflow-hidden shadow-lg px-2 py-3 flex justify-between flex-row'>
                <dt className='font-medium text-color-title mx-5'>{site.agreement}</dt>
                <dd className='text-color-title mx-5 self-end bg-green-500 p-1 rounded-2xl'>
                  <Link>
                    <MdDownload className="text-xl text-white" />
                  </Link>
                </dd>
              </div> */}
          </div>

          {/* Payment Schedules */}
          <div className="card">
            <details className=" border-l-8 border-blue-500 info bg-white shadow-lg rounded-lg px-2 py-3 w-full mb-8 ">
              <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                  Payment Schedule
                <button onClick={() => { navigate(`/edit-paymentSchedule/${paymentSchedules?._id}`) }}
                  className="bg-green-500 rounded-full text-white shadow self-end p-1">
                  <MdAdd className="text-xl text-white" />
                </button>
              </summary>
              <div className="overflow-x-auto"
                style={{
                  scrollbarWidth: 'none',
                  '-ms-overflow-style': 'none',
                }}>
                <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
                  <thead className="bg-gray-800">
                    <tr className="text-white text-left">
                      <th className="font-semibold text-sm uppercase px-6 py-4">Work</th>
                      <th className="font-semibold text-sm uppercase px-6 py-4 text-center">Amount</th>
                      <th className="font-semibold text-sm uppercase px-6 py-4 text-center">Payment Date</th>
                      <th className="font-semibold text-sm uppercase px-6 py-4 text-center">Status</th>
                      <th className="font-semibold text-sm uppercase px-6 py-4 text-center"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {paymentSchedules.paymentDetails?.map((paymentDetail, index) => (
                      <tr key={index} className='border-b border-blue-gray-200'>
                        <td className="px-6 py-4">
                          {paymentDetail?.workDescription}
                        </td>
                        <td className="px-6 py-4 text-center">{paymentDetail?.amount}</td>
                        <td className="px-6 py-4 text-center">{paymentDetail?.paymentDate ? moment(paymentDetail?.paymentDate).format('DD-MM-YYYY') : '-'}</td>
                        <td className="px-6 py-4 text-center">{paymentDetail?.status}</td>
                        <td className="px-6 py-4 text-center">
                          <button onClick={() => {
                            navigate(`/edit-paymentSchedule/${paymentSchedules._id}/${index}`)
                          }}
                            className="mr-2">
                            <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                          </button>
                          <button
                            onClick={() => deletePaymentDetail(paymentSchedules._id, index)}>
                            <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          {/* Project Schedules */}
          <div className="card ">
            <details className=" border-l-8 border-blue-500 info bg-white shadow-lg rounded-lg px-2 py-3 w-full mb-8 ">
              <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                  Project Schedule
                <button onClick={() => { navigate(`/edit-projectSchedule/${site?.projectSchedule._id}`) }}
                  className="bg-green-500 rounded-full text-white shadow self-end p-1">
                  <MdAdd className="text-xl text-white" />
                </button>
              </summary>
              <div className="overflow-x-auto"
                style={{
                  scrollbarWidth: 'none',
                  '-ms-overflow-style': 'none',
                }}>
                <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
                  <thead className="bg-gray-800">
                    <tr className="text-white text-left">
                      <th className='font-semibold text-sm uppercase px-6 py-4'>Work</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Starting Date</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Status</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Actual Date</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {projectDetail?.map((work, index) => (
                      <tr key={index} className='border-b border-blue-gray-200'>
                        <td className="px-6 py-4">{work.workDetail}</td>
                        <td className="px-6 py-4 text-center">{work.toStart ? moment(work.toStart).format('DD-MM-YYYY') : '-'}</td>
                        <td className="px-6 py-4 text-center">{work.status}</td>
                        <td className="px-6 py-4 text-center">{work.startedAt ? moment(work.startedAt).format('DD-MM-YYYY') : '-'}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => navigate(`/edit-projectSchedule/${site?.projectSchedule._id}/${index}`)}
                            className="mr-2"
                          >
                            <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                          </button>
                          <button
                            onClick={() => deleteProjectDetail(site?.projectSchedule._id, index)}
                            className="mr-2"
                          >
                            <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          {/* Quality Check Schedule */}
          {/* <div className="card ">
            <details className=" border-l-8 border-blue-500 info bg-white shadow-lg rounded-md px-2 py-3 w-full mb-8 ">
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
            <details className=" border-l-8 border-blue-500 info bg-white shadow-lg rounded-md px-2 py-3 w-full mb-8 ">
              <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                Work Order
                <button onClick={() => { navigate('/create-work-order') }}
                  className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                  <MdAdd className="text-xl text-white" />
                </button>
              </summary>

              <div className="overflow-x-auto"
                style={{
                  scrollbarWidth: 'none',
                  '-ms-overflow-style': 'none',
                }}>
                <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
                  <thead className="bg-gray-800">
                    <tr className="text-white text-left">
                      <th className='font-semibold text-sm uppercase px-6 py-4'>Name</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Contractor</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Duration</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Total Value</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Total Paid</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Total Due</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {workOrders?.map((workorder) => (
                      <tr key={workorder._id} className='border-b border-blue-gray-200'>
                        <td className="px-6 py-4">
                          {workorder.workOrderName}
                        </td>
                        <td className="px-6 py-4 text-center">{workorder.contractor?.name}</td>
                        <td className="px-6 py-4 text-center ">{workorder.duration ? moment(workorder.duration).format('DD-MM-YYYY') : '-'}</td>
                        <td className="px-6 py-4 text-center">{workorder.workOrderValue}</td>
                        <td className="px-6 py-4 text-center">{workorder.totalPaid}</td>
                        <td className="px-6 py-4 text-center">{workorder.totalDue}</td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => navigate(`/work-order/${workorder._id}`)}
                            className="mr-2"
                          >
                            <FaExternalLinkAlt className='text-green-500 hover:text-green-600 text-lg' />
                          </button>
                          <button
                            onClick={() => navigate(`/edit-workOrder/${workorder._id}`)}
                            className="mr-2">
                            <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                          </button>
                          <button
                            onClick={() => deleteWorkOrder(workorder._id)} >
                            <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          {/* Bills */}
          <div className="card ">
            <details className=" border-l-8 border-blue-500 info bg-white shadow-lg rounded-md px-2 py-3 w-full mb-8 ">
              <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                Bills
                <button onClick={() => { navigate('/create-bill') }}
                  className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                  <MdAdd className="text-xl text-white" />
                </button>
              </summary>
              <Tabs defaultActiveKey='client'>

                <Tabs.TabPane tab='Contractor' key={'contractor'}>
                  <div className="overflow-x-auto"
                    style={{
                      scrollbarWidth: 'none',
                      '-ms-overflow-style': 'none',
                    }}>
                    <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
                      <thead className="bg-gray-800">
                        <tr className="text-white text-left">
                          <th className='font-semibold text-sm uppercase px-6 py-4'>Contractor</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Work</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Amount</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Payment Date</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Paid</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Due</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Status</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'></th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {contractorBills.map((bill) => (
                          <tr key={bill._id} className='border-b border-blue-gray-200'>
                            <td className="px-6 py-4">
                              {bill?.contractor?.name}
                            </td>
                            <td className="px-6 py-4">
                              {bill?.billOf.workDescription}
                            </td>
                            <td className="px-6 py-4 text-center">{bill?.billOf.amount}</td>
                            <td className="px-6 py-4 text-center">{bill?.dateOfPayment ? moment(bill?.dateOfPayment).format('DD-MM-YYYY') : '-'}</td>
                            <td className="px-6 py-4 text-center">{bill?.paidAmount ? bill?.paidAmount : '0'}</td>
                            <td className="px-6 py-4 text-center">{bill?.dueAmount ? bill?.dueAmount : '0'}</td>
                            <td className="px-6 py-4 text-center">{bill?.paymentStatus}</td>
                            <td className="px-3 py-4 text-center">
                              <button
                                onClick={() => navigate(`/bill/${bill._id}`)}
                                className="mr-2"
                              >
                                <FaExternalLinkAlt className='text-green-500 hover:text-green-600 text-lg' />
                              </button>
                              {/* <button
                                onClick={() => { }}
                                className=" mr-2">
                                <GrEdit className='bg-blue-500 hover:text-blue-600 text-xl' />
                              </button>
                              <button
                              onClick={() => {}}>
                                <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                              </button> */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Tabs.TabPane>

                <Tabs.TabPane tab='Supplier' key={'supplier'}>
                  <div className="overflow-x-auto"
                    style={{
                      scrollbarWidth: 'none',
                      '-ms-overflow-style': 'none',
                    }}>
                    <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
                      <thead className="bg-gray-800">
                        <tr className="text-white text-left">
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Supplier</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Material</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Amount</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Payment Date</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Paid</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Due</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Status</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'></th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {supplierBills.map((bill) => (
                          <tr key={bill._id} className='border-b border-blue-gray-200'>
                            <td className="px-6 py-4">
                              {bill?.supplier?.name}
                            </td>
                            <td className="px-6 py-4">
                              {bill?.billOf.material}
                            </td>
                            <td className="px-6 py-4 text-center"></td>
                            <td className="px-6 py-4 text-center">{bill?.dateOfPayment ? moment(bill?.dateOfPayment).format('DD-MM-YYYY') : '-'}</td>
                            <td className="px-6 py-4 text-center">{bill?.paidAmount ? bill?.paidAmount : '0'}</td>
                            <td className="px-6 py-4 text-center">{bill?.dueAmount ? bill?.dueAmount : '0'}</td>
                            <td className="px-6 py-4 text-center">{bill?.paymentStatus}</td>
                            <td className="px-3 py-4 text-center">
                              <button
                                onClick={() => navigate(`/bill/${bill._id}`)}
                                className="mr-2"
                              >
                                <FaExternalLinkAlt className='text-green-500 hover:text-green-600 text-lg' />
                              </button>
                              {/* <button
                              onClick={()=>{}}
                                className="mr-2">
                                <GrEdit className='bg-blue-500 hover:text-blue-600 text-xl' />
                              </button>
                              <button
                              >
                                <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                              </button> */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Tabs.TabPane>

              </Tabs>
            </details>
          </div>

          {/* Purchase Order */}
          <div className="card ">
            <details className=" border-l-8 border-blue-500 info bg-white shadow-lg rounded-md px-2 py-3 w-full mb-8 ">
              <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                Purchase Order
                <button onClick={() => { navigate('/create-purchaseOrder') }}
                  className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                  <MdAdd className="text-xl text-white" />
                </button>
              </summary>
              <div className="overflow-x-auto"
                style={{
                  scrollbarWidth: 'none',
                  '-ms-overflow-style': 'none',
                }}>
                <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
                  <thead className="bg-gray-800">
                    <tr className="text-white text-left">
                      <th className='font-semibold text-sm uppercase px-6 py-4'>Supplier</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Total Amount</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Total Paid</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Total Due</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Approval</th>
                      <th className='font-semibold text-sm uppercase px-6 py-4 text-center'></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {purchaseOrders?.map((purchaseOrder) => (
                      <tr key={purchaseOrder._id} className='border-b border-blue-gray-200'>
                        <td className="px-6 py-4">
                          {purchaseOrder.supplier?.name}
                        </td>
                        <td className="px-6 py-4 text-center">{purchaseOrder.totalAmount}</td>
                        <td className="px-6 py-4 text-center">{purchaseOrder.paidAmount}</td>
                        <td className="px-6 py-4 text-center">{purchaseOrder.dueAmount}</td>
                        <td className="px-6 py-4 text-center">{purchaseOrder.approvalStatus}</td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => navigate(`/purchase-order/${purchaseOrder?._id}`)}
                            className="mr-2">
                            <FaExternalLinkAlt className='text-green-500 hover:text-green-600 text-lg' />
                          </button>
                          <button
                            onClick={() => navigate(`/edit-purchaseOrder/${purchaseOrder?._id}`)}
                            className="mr-2">
                            <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                          </button>
                          <button
                            onClick={() => deletePurchaseOrder(purchaseOrder?._id)}>
                            <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          {/* Extra Work */}
          <div className="card ">
            <details className=" border-l-8 border-blue-500 info bg-white shadow-lg rounded-md px-2 py-3 w-full mb-8 ">
              <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                Extra Work
                <button onClick={() => { navigate('/create-extra-work') }}
                  className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                  <MdAdd className="text-xl text-white" />
                </button>
              </summary>
              <Tabs defaultActiveKey='client'>

                <Tabs.TabPane tab='Client' key={'client'}>
                  <div className="overflow-x-auto"
                    style={{
                      scrollbarWidth: 'none',
                      '-ms-overflow-style': 'none',
                    }}>
                    <table className='w-full whitespace-nowrap bg-white overflow-x-auto'>
                      <thead className="bg-gray-800">
                        <tr className="text-white text-left">
                          <th className='font-semibold text-sm uppercase px-6 py-4'>Work</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Rate</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Area</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Amount</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Status</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'></th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {clientExtra?.WorkDetail?.map((workDetail, index) => (
                          <tr key={index} className='border-b border-blue-gray-200'>
                            <td className="px-6 py-4">
                              {workDetail?.work}
                            </td>
                            <td className="px-6 py-4 text-center">{workDetail?.rate}</td>
                            <td className="px-6 py-4 text-center">{workDetail?.area}</td>
                            <td className="px-6 py-4 text-center">{workDetail?.amount}</td>
                            <td className="px-6 py-4 text-center">{workDetail?.paymentStatus}</td>
                            <td className="px-3 py-4 text-center">
                              <button
                                onClick={() => navigate(`/edit-extra-work/${clientExtra._id}/work/${index}`)}
                                className=" mr-2">
                                <GrEdit className='text-blue-500 hover:text-blue-600 text-xl' />
                              </button>
                              <button
                                onClick={() => deleteExtraWorkDetail(clientExtra._id, index)}>
                                <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className='text-right mt-8 ml-2 flex gap-2'>
                      <button
                        onClick={() => navigate(`/edit-extra-work/${clientExtra._id}`)}
                        className="text-green-500 hover:text-green-600 text-lg flex items-center gap-1 mr-2">
                        <MdAdd className='text-2xl' /> More
                      </button>
                      <button
                        onClick={() => navigate(`/extra-work/${clientExtra._id}`)}
                        className="ml-2">
                        <FaExternalLinkAlt className="text-lg text-blue-500 hover:text-blue-600" />
                      </button>
                    </div>

                  </div>
                </Tabs.TabPane>

                <Tabs.TabPane tab='Contractor' key={'contractor'}>
                  <div className="overflow-x-auto"
                    style={{
                      scrollbarWidth: 'none',
                      '-ms-overflow-style': 'none',
                    }}>
                    <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
                      <thead className="bg-gray-800">
                        <tr className="text-white text-left">
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Contractor</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4'>Work</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Amount</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Paid</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>Due</th>
                          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'></th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {contractorExtra.map((extraWork) => (
                          <tr key={extraWork._id} className='border-b border-blue-gray-200'>
                            <td className="px-6 py-4">
                              {extraWork?.contractor?.name}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {extraWork?.WorkDetail.length}
                            </td>
                            <td className="px-6 py-4 text-center">{extraWork?.totalAmount}</td>
                            <td className="px-6 py-4 text-center">{extraWork?.paid}</td>
                            <td className="px-6 py-4 text-center">{extraWork?.due}</td>
                            <td className="px-3 py-4">
                              <button
                                onClick={() => navigate(`/extra-work/${extraWork._id}`)}
                                className="mr-2">
                                <FaExternalLinkAlt className='text-green-500 hover:text-green-600 text-xl' />
                              </button>
                              <button
                                onClick={() => navigate(`/edit-extra-work/${extraWork._id}`)}
                                className="mr-2">
                                <GrEdit className='text-blue-500 hover:text-blue-600 text-xl' />
                              </button>
                              <button
                                onClick={() => deleteExtraWork(extraWork._id)}>
                                <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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

