import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';

const PurchaseOrderScreen = () => {
  const [purchaseOrder, setPurchaseOrder] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getpurchaseOrder(id);
    }
  }, [])

  const getpurchaseOrder = async (id) => {
    try {
      const paymentSchedulesData = await axios.get(`/api/v1/purchase-order/${id}`);
      console.log(paymentSchedulesData.data)
      setPurchaseOrder(paymentSchedulesData.data);
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleEdit = (id, index) => {
    navigate(`/edit-purchaseOrder/${id}/material/${index}`);
  };

  const deleteDetail = async (id, index) => {
    try {
      const response = await axios.delete(`/api/v1/purchase-order/${id}/projectDetails/${index}`);
      console.log(response.data)
      setPurchaseOrder(response.data.purchaseOrder);
    } catch (error) {
      toast.error(error.message)
    }
  };

  const PurchaseOrderCard = ({ material, rate, unit, paid, due, amount, status, quantity, handleEdit, handleDelete }) => {
    return (
      <div className=" px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">{material}</h2>
        <div className='flex flex-col gap-2 text-md'>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Rate:</div>
            <div className="text-gray-800">{rate}/{unit}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Quantity:</div>
            <div className="text-gray-800">{quantity}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Amount:</div>
            <div className="text-gray-800">₹{amount}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Status:</div>
            <div className={`${status === 'paid' ? 'text-green-800' : 'text-red-800'} ${status === 'paid' ? 'bg-green-200' : 'bg-red-200'} py-0.5 px-2.5 rounded-md font-semibold text-sm`}>{status}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Paid Amount:</div>
            <div className="text-gray-800">₹{paid ? paid : '0'}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <div className="text-gray-600">Due Amount:</div>
            <div className="text-gray-800">₹{due}</div>
          </div>
          <div className="flex justify-between gap-4 tracking-tight">
            <button onClick={handleEdit} className="text-blue-500 mr-2">
              <GrEdit className="inline-block mr-1" />
              Edit
            </button>
            <button onClick={handleDelete} className="text-red-500">
              <MdDelete className="inline-block mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='m-1 md:m-6 p-3 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
      <Header category="Page" title="Purchase Order" />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {purchaseOrder.requirement?.map((item, index) => (
          <div key={index} className='bg-white shadow-lg rounded-xl'>
            <PurchaseOrderCard
              material={item.material}
              rate={item.rate}
              unit={item.unit}
              quantity={item.quantity}
              amount={item.amount}
              status={item.status}
              paid={item.paid}
              due={item.due}
              handleEdit={() => handleEdit(purchaseOrder._id, index)}
              handleDelete={() => deleteDetail(purchaseOrder._id, index)}
            />
          </div>
        ))}
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default PurchaseOrderScreen