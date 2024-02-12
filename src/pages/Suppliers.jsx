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

    // const handleRedirect = (supplierId) => {
    //     navigate(`/contractor?contractorId=${supplierId}`);
    //   }

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
        <Header category="Page" title="Suppliers" />
            <div className=" mb-4 text-right flex justify-between align-center">
                <h2 className="text-xl text-green-600 ml-8">Total Suppliers: {suppliers?.length}</h2>
                <button onClick={handleAdd} className="bg-green-500 rounded-full text-white px-2 py-2 sm:mt-0 mr-4">
                <MdAdd className='text-xl' />
                </button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
                                {/* <button
                            onClick={() => handleRedirect(supplier._id)}
                            className="bg-blue-500 text-white px-2 py-1 mr-2"
                        >
                            <FaExternalLinkAlt />
                        </button> */}
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
            </table>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </section>
        </div>
    )
}

export default Suppliers