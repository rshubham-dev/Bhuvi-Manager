import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import Header from '../components/Header';

const Suppliers = () => {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const getSuppliers = async () => {
            try {
                const supplierData = await axios.get('/api/v1/supplier');
                setSuppliers(supplierData.data);
            } catch (error) {
                toast.error(error.message)
            }
        }
        getSuppliers();
    }, [])

    const handleEdit = (id) => {
        navigate(`/edit-supplier/${id}`)
    };

    const handleRedirect = (id) => {
        navigate(`/supplier/${id}`);
      }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/v1/supplier/${id}`);
            setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
        } catch (error) {
            toast.error(error.message)
        }
    };

    const handleAdd = () => {
        navigate('/create-supplier');
    };
    return (
        <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 shadow-lg bg-white rounded-2xl'>
            <section className="overflow-x-auto">
                <Header category="Page" title="Supplier's" />
                <div className="w-full mx-auto mb-6 text-gray-700 p-1 flex flex-row justify-between items-center">
                    <h2 className="text-lg text-wrap sm:text-md md:text-lg lg:text-xl text-green-600 mr-4 pr-4">
                        Total Suppliers: {suppliers?.length}
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
                                <th className="font-semibold text-sm uppercase px-6 py-4 "> Name </th>
                                <th className="font-semibold text-sm uppercase px-6 py-4"> Contact No. </th>
                                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> GST No </th>
                                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {suppliers?.map((supplier) => (
                                <tr key={supplier._id} className='border-b border-blue-gray-200'>
                                    <td className="px-6 py-4">
                                    {supplier.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm"> {supplier.contactNo} </p>
                                        <p className="text-gray-500 text-sm tracking-wide"> {supplier.whatsapp} </p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                    {supplier.gst}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {/* <button onClick={() => handleRedirect(supplier._id)} className="mr-2">
                                            <FaExternalLinkAlt className='text-blue-500 hover:text-blue-800 text-lg' />
                                        </button> */}
                                        <button onClick={() => handleEdit(supplier._id)} className="mr-2">
                                            <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                                        </button>
                                        <button onClick={() => handleDelete(supplier._id)} className="mr-2">
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
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Contact No</th>
                            <th scope="col" className="px-6 py-3">GST No</th>
                            <th scope="col" className="px-6 py-3">Purchase Orders</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((supplier) => (
                            <tr key={supplier._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{supplier.name}</td>
                                <td className="px-6 py-4">{supplier.contactNo}, {supplier.whatsapp}</td>
                                <td className="px-6 py-4">{supplier.gst}</td>
                                <td className="px-6 py-4">{supplier?.purchaseOrder.length}</td>
                                <td className="px-6 py-4">
                                    <button
                            onClick={() => handleRedirect(supplier._id)}
                            className="bg-blue-500 text-white px-2 py-1 mr-2"
                        >
                            <FaExternalLinkAlt />
                        </button>
                                    <button
                                        onClick={() => handleEdit(supplier._id)}
                                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                                    >
                                        <GrEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(supplier._id)}
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
            </section>
        </div>
    )
}

export default Suppliers