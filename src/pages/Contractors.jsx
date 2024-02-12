import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
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
            toast.error(error.message)
        }
    }

    const handleEdit = (contractorId) => {
        navigate(`/edit-contractor/${contractorId}`)
    };

    const handleRedirect = (contractorId) => {
        navigate(`/contractor/${contractorId}`);
    }

    const handleDelete = (contractorId) => {
        setContractor(contractors.filter((contractor) => contractor._id !== contractorId));
    };

    const handleAdd = () => {
        navigate('/create-contractors');
    };

    return (
        <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
        <Header category="Page" title="Contractor" />
        <div className="overflow-x-auto">
            <h1 className="text-2xl font-bold text-center mt-4">Contractor List</h1>
            <div className=" mb-4 mr-20 mt-6 text-right flex justify-between align-center">
                <h2 className="text-xl text-green-600 ml-8">Total Contractor: {contractors?.length}</h2>
                <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
                    Add Contractor
                </button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
            </table>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
        </div>
    )
}

export default Contractors