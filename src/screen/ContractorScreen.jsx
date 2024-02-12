import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './screen.css';
import { GrEdit } from "react-icons/gr";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdAdd, MdDownload, MdDelete } from "react-icons/md";
import moment from 'moment';
import Header from '../components/Header';

axios.defaults.withCredentials = true;

const ContractorScreen = () => {
    const [contractors, setContractor] = useState({});
    const [Bills, setBill] = useState([]);
    const [extraWork, setExtraWork] = useState([]);
    const [workOrders, setWorkOrder] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchContractorDetails(id);
            fetchWorkOrder(id);
            fetchExtraWork(id)
            fetchBill(id)
        }
    }, [id]);

    const fetchContractorDetails = async (id) => {
        try {
            const response = await axios.get(`/api/v1/contractor/${id}`);
            console.log(response.data)
            setContractor(response.data);
        } catch (error) {
            console.log('Error fetching contractor details:', error);
        }
    };

    const fetchWorkOrder = async (id) => {
        try {
            const workorder = await axios.get(`/api/v1/work-order/contractor/${id}`);
            setWorkOrder(workorder?.data)
        } catch (error) {
            console.log('Error fetching work order:', error);
        }
    };

    const fetchBill = async (id) => {
        try {
            const billData = await axios.get(`/api/v1/bill/contractor/${id}`);
            console.log(billData.data)
            setBill(billData.data);
        } catch (error) {
            console.log('Error fetching bill', error);
        }
    };

    const fetchExtraWork = async (id) => {
        try {
            const extraWork = await axios.get(`/api/v1/extra-work/contractor/${id}`);
            setExtraWork(extraWork.data?.filter((extrawork) => extrawork.extraFor === 'Contractor'))
            // console.log(extraWork.data);
        } catch (error) {
            console.log(error)
            // toast.error(error.message)
        }
    }

    const deleteWorkOrder = async (id) => {
        try {
            await axios.delete(`/api/v1/work-order/${id}`);
            setWorkOrder(workOrders.filter((workOrder) => workOrder._id !== id));
        } catch (error) {
            console.log(error)
        }
    };

    const deleteExtraWork = async (id) => {
        try {
            await axios.delete(`/api/v1/extra-work/${id}`);
            setExtraWork(extraWork.filter((contractorExtra) => contractorExtra._id !== id));
        } catch (error) {
            console.log(error)
        }
    };

    const deleteBill = async (id) => {
        try {
            await axios.delete(`/api/v1/bill/${id}`);
            setBill(Bills.filter((bill) => bill._id !== id));
        } catch (error) {
            console.log(error)
        }
    };



    return (
        <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
        <Header category="Page" title="Work-Orders" />
        <section className=' px-12 py-8 mb-16 h-full w-full'>
            <h1 className="text-3xl font-semibold text-gray-800 mt-4"> Contractor Details</h1>
            <div className="mt-6 w-full">

                <div className="card ">
                    <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
                        <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                            Contractor Info
                        </summary>

                        <div className='flex justify-between flex-row my-1.5'>
                            <dt className='font-medium text-color-title mx-5 my-1.5'>Name</dt>
                            <dd className='text-color-title mx-5 my-1.5'>{contractors.name}</dd>
                        </div>

                        <div className='flex justify-between flex-row my-1.5'>
                            <dt className='font-medium text-color-title mx-5 my-1.5'>Contact No</dt>
                            <dd className='text-color-title mx-5 my-1.5'>{contractors.contactNo}, {contractors.whatsapp}</dd>
                        </div>

                        <div className='flex justify-between flex-row my-1.5'>
                            <dt className='font-medium text-color-title mx-5 my-1.5'>Address</dt>
                            <dd className='text-color-title mx-5 my-1.5'>
                                {contractors?.address}
                            </dd>
                        </div>

                    </details>
                </div>

                <div className="card ">
                    <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
                        <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                            Documents
                        </summary>

                        <div className='flex justify-between flex-row my-1.5'>
                            <dt className='font-medium text-color-title mx-5 my-1.5'>{contractors?.addhar}</dt>
                            <dd className='text-color-title mx-5 my-1.5 self-end bg-green-500 p-1 rounded-2xl'>
                                <Link>
                                    <MdDownload className="text-xl text-white" />
                                </Link>
                            </dd>
                        </div>

                        <div className='flex justify-between flex-row my-1.5'>
                            <dt className='font-medium text-color-title mx-5 my-1.5'>{contractors?.pan}</dt>
                            <dd className='text-color-title mx-5 my-1.5 self-end bg-green-500 p-1 rounded-2xl'>
                                <Link>
                                    <MdDownload className="text-xl text-white" />
                                </Link>
                            </dd>
                        </div>

                        <div className='flex justify-between flex-row my-1.5'>
                            <dt className='font-medium text-color-title mx-5 my-1.5'>{contractors?.bank}</dt>
                            <dd className='text-color-title mx-5 my-1.5 self-end bg-green-500 p-1 rounded-2xl'>
                                <Link>
                                    <MdDownload className="text-xl text-white" />
                                </Link>
                            </dd>
                        </div>

                    </details>
                </div>

                {/* Sites */}
                <div className="card ">
                    <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
                        <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                            Sites
                        </summary>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Total Floor</th>
                                    <th scope="col" className="px-6 py-3">Area</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contractors.site?.map((site) => (
                                    <tr key={site._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                            {site.name}
                                        </td>

                                        <td className="px-6 py-4">{site.floors}</td>

                                        <td className="px-6 py-4">{site.area}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </details>
                </div>

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
                                        <td className="px-6 py-4">{workorder.site?.name}</td>
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
                                {Bills.map((bill) => (
                                    <tr key={bill._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                            {bill?.site?.name}
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
                                {extraWork.map((extraWork) => (
                                    <tr key={extraWork._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                            {extraWork?.site?.name}
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
                    </details>
                </div>

            </div>
        </section>
        </div>
    )
}

export default ContractorScreen