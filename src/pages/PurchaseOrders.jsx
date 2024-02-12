import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Header from '../components/Header';
axios.defaults.withCredentials = true;

const PurchaseOrders = () => {
  const navigate = useNavigate();
  const [purchaseOrders, setPurchaseOrder] = useState([]);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {

    const fetchPurchaseOrders = async () => {
      try {
        const purchaseOrdersData = await axios.get('/api/v1/purchase-order');
        if (user.department === 'Site Supervisor' || user.department === 'Site Incharge') {
          const sites = user?.site;
          let PurchaseOrders;
          for (let site of sites) {
            PurchaseOrders = purchaseOrdersData.data?.filter((purchaseOrder) => purchaseOrder.site?._id.includes(site))
          }
          setPurchaseOrder(PurchaseOrders)
        } else {
          setPurchaseOrder(purchaseOrdersData.data);
        }
        console.log(purchaseOrdersData.data)
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchPurchaseOrders();
  }, [])

  const handleEdit = (id) => {
    navigate(`/edit-purchaseOrder/${id}`);
  };

  const editRequirement = (id, index) => {
    navigate(`/edit-purchaseOrder/${id}/material/${index}`);
  };

  const deleteRequirement = async (id, index) => {
    try {
      await axios.delete(`/api/v1/purchase-order/${id}/requirement/${index}`);
      setPurchaseOrder();
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/purchase-order/${id}`);
      setPurchaseOrder(purchaseOrders.filter((purchaseOrder) => purchaseOrder._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleAdd = () => {
    navigate('/create-purchaseOrder');
  };

  return (
    <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 shadow-lg bg-white rounded-2xl'>
      <Header category="Page" title="Purchase Order's" />
      <section className="overflow-x-auto">
        <div className="m-6 flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-lg sm:text-xl text-green-600 mb-2 sm:mb-0 sm:mr-4">
            Total Purchase Orders: {purchaseOrders?.length}
          </h2>
          <button onClick={handleAdd} className="bg-green-500 rounded-full text-white px-2 py-2 sm:mt-0">
            <MdAdd className='text-xl' />
          </button>
        </div>

        <section className="bg-white px-4 sm:px-8 py-6 sm:py-8 mb-12 sm:mb-16">
          <div className="mt-6 w-full">
            {purchaseOrders.map((purchaseOrder) => (
              <div key={purchaseOrder._id} className="card mb-4">
                <details className="rounded-lg bg-white overflow-x-auto shadow-lg p-3">
                  <summary className="tracking-tight flex justify-between flex-row text-xl font-large text-color-title cursor-pointer" style={{ padding: '1rem' }}>
                    Purchase Order of {purchaseOrder.supplier?.name} for {purchaseOrder.site?.name}
                    <div className="self-end">
                      <button
                        onClick={() => handleEdit(purchaseOrder._id)}
                        className="bg-blue-500 rounded-2xl text-white px-2 py-2 mr-2 mb-2 sm:mb-0">
                        <GrEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(purchaseOrder._id)}
                        className="bg-red-500 rounded-2xl text-white px-2 py-2">
                        <MdDelete />
                      </button>
                    </div>
                  </summary>

                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-4 sm:px-6 py-3">Material</th>
                        <th scope="col" className="px-4 sm:px-6 py-3">Rate</th>
                        <th scope="col" className="px-4 sm:px-6 py-3">Quantity</th>
                        <th scope="col" className="px-4 sm:px-6 py-3">Unit</th>
                        <th scope="col" className="px-4 sm:px-6 py-3">Amount</th>
                        <th scope="col" className="px-4 sm:px-6 py-3">Status</th>
                        <th scope="col" className="px-4 sm:px-6 py-3">Actions</th>
                      </tr>
                    </thead>

                    {purchaseOrder?.requirement.map((requirement, index) => (
                      <tbody key={index}>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-4 sm:px-6 py-4">{requirement.material}</td>
                          <td className="px-4 sm:px-6 py-4">{requirement.rate}</td>
                          <td className="px-4 sm:px-6 py-4">{requirement.quantity}</td>
                          <td className="px-4 sm:px-6 py-4">{requirement.unit}</td>
                          <td className="px-4 sm:px-6 py-4">{requirement.amount}</td>
                          <td className="px-4 sm:px-6 py-4">{requirement.status}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <button
                              onClick={() => editRequirement(purchaseOrder._id, index)}
                              className="bg-blue-500 text-white px-2 py-1 mr-2">
                              <GrEdit />
                            </button>
                            <button
                              onClick={() => deleteRequirement(purchaseOrder._id, index)}
                              className="bg-red-500 text-white px-2 py-1">
                              <MdDelete />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </details>
              </div>
            ))}
          </div>
        </section>

        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </section>
    </div>
  )
}

export default PurchaseOrders