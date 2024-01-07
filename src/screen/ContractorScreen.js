import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './screen.css';
import { GrEdit } from "react-icons/gr";
import { MdAdd, MdDownload } from "react-icons/md";

axios.defaults.baseURL = 'https://bhuvi-management-server.onrender.com';
axios.defaults.withCredentials = true;

const ContractorScreen = () => {
    const [contractors, setContractor] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const contractorId = new URLSearchParams(location.search).get('contractorId');
        if (contractorId) {
            fetchSiteDetails(contractorId);
        }
    }, [location.search]);


    const fetchSiteDetails = async (contractorId) => {
        try {
            const response = await axios.get(`/api/v1/site/${contractorId}`);
            console.log(response.data)
            setContractor(response.data);
        } catch (error) {
            console.log('Error fetching site details:', error);
        }
    };

    const street = contractors?.address?.street || '';
    const city = contractors?.address?.city || '';
    const district = contractors?.address?.district || '';
    const state = contractors?.address?.state || '';

    const addressString = `${street} ${city} ${district} ${state}`;

    return (
        <section className='bg-white px-12 py-8 mb-16 h-full w-full'>
            <h1 className="text-3xl font-semibold text-gray-800"> Contractor Details</h1>
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
                                {addressString}
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

                <div className="card ">
                    <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
                        <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                            Work Order
                            <button onClick={() => { navigate('') }}
                                className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                                <MdAdd className="text-xl text-white" />
                            </button>
                        </summary>
                        {contractors.workOrder?.map((workorder, index) => {
                            <div key={index} className='flex justify-between flex-row my-1.5'>
                                <dt className='font-medium text-color-title mx-5 my-1.5'>{workorder}</dt>
                                <dd className='text-color-title mx-5 my-1.5 self-end bg-green-500 p-1 rounded-2xl'></dd>
                            </div>
                        })}
                    </details>
                </div>

                <div className="card ">
                    <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
                        <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                            Payment Schedules
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
                            Project Schedules
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
        </section>
    )
}

export default ContractorScreen