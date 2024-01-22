import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Tabs } from 'antd';

axios.defaults.withCredentials = true;

const Bills = () => {
  const navigate = useNavigate();
  // const [bills, setBill] = useState([]);
  const [clientBill, setClientBill] = useState([]);
  const [contractorBill, setContractorBill] = useState([]);
  const [supplierBill, setSupplierBill] = useState([]);
  const [materialBill, setMaterialBill] = useState([]);

  useEffect(() => {
    const getbills = async () => {
      try {
        const billData = await axios.get('/api/v1/bill');
        const bills = billData.data;
        setClientBill(bills.filter((bill)=> bill.billFor === 'Client'))
        setContractorBill(bills.filter((bill)=> bill.billFor === 'Contractor'))
        setSupplierBill(bills.filter((bill)=> bill.billFor === 'Supplier'))
        setMaterialBill(bills.filter((bill)=> bill.billFor === 'Material'))
        console.log(bills)
      } catch (error) {
        toast.error(error.message)
      }
    }
    getbills();
  }, [])

  const handleEdit = (id) => {
    navigate(`/edit-bill/${id}`);
  };

  // const handleRedirect = (id) => {
  //   navigate(`/bill/${id}`);
  // };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/bill/${id}`);
      setClientBill(clientBill.filter((bill) => bill._id !== id));
      setContractorBill(contractorBill.filter((bill) => bill._id !== id));
      setSupplierBill(supplierBill.filter((bill) => bill._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleAdd = () => {
    navigate('/create-bill');
  };

  return (
    <section className='bg-white px-14 py-7 mb-16 h-full w-full'>
      <h1 className="text-3xl font-semibold text-gray-800 text-center">Bill List</h1>
      <div className=" mb-4 mr-10 text-right">
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
          Add bill
        </button>
      </div>
      <Tabs defaultActiveKey='client'>

        <Tabs.TabPane tab='Client' key={'client'}>
          {clientBill.map((bill) => (
            <div key={bill._id} className="card ">
              <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
                <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                  Bill of {bill.client?.name} 
                  <div className="self-end text-lg">
                    <button
                      onClick={() => handleEdit(bill._id)}
                      className="bg-blue-500 text-white px-2 py-1 mr-2"
                    >
                      <GrEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(bill._id)}
                      className="bg-red-500 text-white px-2 py-1 mr-2"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </summary>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Name</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site Id</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Client</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Project Type</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Total Floor</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site Incharge</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site Supervisor</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Address</dt>
                  <dd className='text-color-title mx-5 my-1.5'>

                  </dd>
                </div>

              </details>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab='Contractor' key={'contractor'}>
          {contractorBill.map((bill) => (
            <div key={bill._id} className="card ">
              <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
                <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                  {bill.contractor?.name} bill for {bill.site?.name}
                  <div className="self-end text-lg">
                    <button
                      onClick={() => handleEdit(bill._id)}
                      className="bg-blue-500 text-white px-2 py-1 mr-2"
                    >
                      <GrEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(bill._id)}
                      className="bg-red-500 text-white px-2 py-1 mr-2"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </summary>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Name</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site Id</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Client</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Project Type</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Total Floor</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site Incharge</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site Supervisor</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Address</dt>
                  <dd className='text-color-title mx-5 my-1.5'>

                  </dd>
                </div>

              </details>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab='Supplier' key={'supplier'}>
          {supplierBill.map((bill) => (
            <div key={bill._id} className="card ">
              <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
                <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                {bill.supplier?.name} bill for {bill.site?.name}
                  <div className="self-end text-lg">
                    <button
                      onClick={() => handleEdit(bill._id)}
                      className="bg-blue-500 text-white px-2 py-1 mr-2"
                    >
                      <GrEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(bill._id)}
                      className="bg-red-500 text-white px-2 py-1 mr-2"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </summary>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Name</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site Id</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Client</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Project Type</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Total Floor</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site Incharge</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site Supervisor</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Address</dt>
                  <dd className='text-color-title mx-5 my-1.5'>

                  </dd>
                </div>

              </details>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab='Material' key={'material'}>
          {materialBill.map((bill) => (
            <div key={bill._id} className="card ">
              <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
                <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                {bill.supplier?.name} bill for {bill.site?.name}
                  <div className="self-end text-lg">
                    <button
                      onClick={() => handleEdit(bill._id)}
                      className="bg-blue-500 text-white px-2 py-1 mr-2"
                    >
                      <GrEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(bill._id)}
                      className="bg-red-500 text-white px-2 py-1 mr-2"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </summary>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Name</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site Id</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Client</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Project Type</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Total Floor</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site Incharge</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site Supervisor</dt>
                  <dd className='text-color-title mx-5 my-1.5'></dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Address</dt>
                  <dd className='text-color-title mx-5 my-1.5'>

                  </dd>
                </div>

              </details>
            </div>
          ))}
        </Tabs.TabPane>

      </Tabs>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </section>
  );
};

export default Bills;