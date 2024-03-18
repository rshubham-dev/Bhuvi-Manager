import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import Header from '../components/Header';
axios.defaults.withCredentials = true;

const Contractors = () => {
    const navigate = useNavigate();
    const [contractors, setContractor] = useState([]);

    useEffect(() => {
        getContractors();
    }, []);

    const getContractors = async () => {
        try {
            const contractorData = await axios.get('/api/v1/contractor');
            console.log(contractorData.data)
            setContractor(contractorData.data);
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = (id) => {
        navigate(`/edit-contractor/${id}`)
    };

    const handleRedirect = (id) => {
        navigate(`/contractor/${id}`);
    }

    const handleDelete = async (id) => {
        try {
            const contractorData = await axios.get(`/api/v1/contractor/${id}`);
            toast.succes(contractorData.data.message);
            setContractor(contractors.filter((contractor) => contractor._id !== id));
        } catch (error) {
            console.error(error)
        }
    };

    const handleAdd = () => {
        navigate('/create-contractors');
    };

    return (
        <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
            <div className="overflow-x-auto">
                <Header category="Page" title="Contractor's" />
                <div className="w-full mx-auto mb-6 text-gray-700 p-1 flex flex-row justify-between items-center">
                    <h2 className="text-lg text-wrap sm:text-md md:text-lg lg:text-xl text-green-600 mr-4 pr-4">
                        Total Contractor: {contractors?.length}
                    </h2>
                    <button onClick={handleAdd} className="bg-green-500 rounded-full text-white px-2 py-2">
                        <MdAdd className='text-xl' />
                    </button>
                </div>

                <div className="overflow-x-auto"
                    style={{
                        scrollbarWidth: 'none',
                        '-ms-overflow-style': 'none',
                    }}>
                    <table className='w-full whitespace-nowrap divide-y divide-gray-300 overflow-hidden'>
                        <thead className="bg-gray-800">
                            <tr className="text-white text-left">
                                <th className="font-semibold text-sm uppercase px-6 py-4 "> Contractor </th>
                                <th className="font-semibold text-sm uppercase px-6 py-4"> Contact No. </th>
                                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Total Sites </th>
                                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {contractors?.map((contractor) => (
                                <tr key={contractor._id} className='border-b border-blue-gray-200'>
                                    <td className="px-6 py-4">
                                        {contractor.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm"> {contractor.contactNo} </p>
                                        <p className="text-gray-500 text-sm tracking-wide"> {contractor.whatsapp} </p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {contractor.site?.length}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {/* <button onClick={() => handleRedirect(contractor._id)} className="mr-2">
                                            <FaExternalLinkAlt className='text-blue-500 hover:text-blue-800 text-lg' />
                                        </button> */}
                                        <button onClick={() => handleEdit(contractor._id)} className="mr-2">
                                            <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                                        </button>
                                        <button onClick={() => handleDelete(contractor._id)} className="mr-2">
                                            <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Contractor</th>
                            <th scope="col" className="px-6 py-3">Contact No</th>
                            <th scope="col" className="px-6 py-3">Total Sites</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contractors?.map((contractor) => (
                            <tr key={contractor.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{contractor.name}</td>
                                <td className="px-6 py-4">{contractor.contactNo}, {contractor.whatsapp}</td>
                                <td className="px-6 py-4">{contractor.site?.length}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleRedirect(contractor._id)}
                                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                                    >
                                        <FaExternalLinkAlt />
                                    </button>
                                    <button
                                        onClick={() => handleEdit(contractor._id)}
                                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                                    >
                                        <GrEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(contractor.id)}
                                        className="bg-red-500 text-white px-2 py-1 mr-2"
                                    >
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
        </div>
    )
}

export default Contractors