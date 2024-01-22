import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";

axios.defaults.withCredentials = true;

const PurchaseOrders = () => {
  const navigate = useNavigate();
  const [purchaseOrders, setPurchaseOrder] = useState([]);

  useEffect(() => {

    const fetchPurchaseOrders = async () => {
      try {
        const purchaseOrdersData = await axios.get('/api/v1/purchase-order');
        setPurchaseOrder(purchaseOrdersData.data);
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
    <div className="overflow-x-auto shadow-md sm:rounded-lg ">
      <h1 className="text-2xl font-bold text-center mt-4">Purchase Orders</h1>
      <div className=" mb-4 mr-20 text-right">
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
          Add Purchase-Order
        </button>
      </div>

      <section className='bg-white px-12 py-8 mb-16 h-full w-full'>
        <div className="mt-6 w-full">

            {purchaseOrders.map((purchaseOrder)=>(
            <div key={purchaseOrder._id} className="card">
              <details className="rounded-lg bg-white overflow-hidden shadow-lg p-3">
                <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                Purchase Order of
                  <div className='self-end'>
                    <button
                      onClick={() => handleEdit(purchaseOrder._id)}
                      className="bg-blue-500 rounded-2xl text-white px-1.5 py-1.5 mr-2">
                      <GrEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(purchaseOrder._id)}
                      className="bg-red-500 rounded-2xl text-white px-1.5 py-1.5 mr-2">
                      <MdDelete />
                    </button>
                  </div>
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

                  {purchaseOrder?.requirement.map((requirement)=>(
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
    </div>
  )
}

export default PurchaseOrders