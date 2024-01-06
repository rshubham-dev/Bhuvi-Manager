import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";

const WorkOrders = () => {
  const navigate = useNavigate();
  const [workOrders, setWorkOrder] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSites = async () => {
      try {
        const workOrdersData = await axios.get('/api/v1/work-order');
        setWorkOrder(workOrdersData.data);
        console.log(workOrders)
      } catch (error) {
        toast.error(error.message)
        setError(error.message);
      }
    }
    getSites();
  }, [])

  const handleEdit = (workOrderId) => {
    // Add your edit logic here
    navigate(`/edit-work-order?workOrderId=${workOrderId}`);
  };

  const handleRedirect = (workOrderId) => {
    navigate(`/workOrder?workOrderId=${workOrderId}`);
  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/work-order/remove/${id}`);
      setWorkOrder(workOrders.filter((workOrder) => workOrder._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };
  const handleAdd = () => {
    navigate('/create-work-order');
  };

  return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-2xl font-bold text-center">Work Orders</h1>
      <div className=" mb-4 mr-20 text-right">
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
          Add Work-Order
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Work-Order Name</th>
            <th scope="col" className="px-6 py-3">Work-Order Id</th>
            <th scope="col" className="px-6 py-3">Site</th>
            <th scope="col" className="px-6 py-3">Contractor</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workOrders.map((workOrder) => (
            <tr key={workOrder._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                  {workOrder.name}
              </td>
              <td className="px-6 py-4">{workOrder.workOrderId}</td>
              <td className="px-6 py-4">{workOrder.site}</td>
              <td className="px-6 py-4">{workOrder.contractor}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleRedirect(workOrder._id)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                >
                  <FaExternalLinkAlt />
                </button>
                <button
                  onClick={() => handleEdit(workOrder._id)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                >
                  <GrEdit />
                </button>
                <button
                  onClick={() => handleDelete(workOrder._id)}
                  className="bg-red-500 text-white px-2 py-1 mr-2"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {error && <p className="text-red-500">{error}</p>}
      </table>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default WorkOrders