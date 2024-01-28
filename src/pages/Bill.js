import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Tabs } from 'antd';
import moment from 'moment';

axios.defaults.withCredentials = true;

const Bills = () => {
  const navigate = useNavigate();
  const [contractorBill, setContractorBill] = useState([]);
  const [supplierBill, setSupplierBill] = useState([]);
  const [materialBill, setMaterialBill] = useState([]);

  useEffect(() => {
    const getbills = async () => {
      try {
        const billData = await axios.get('/api/v1/bill');
        const bills = billData.data;
        setContractorBill(bills.filter((bill) => bill.billFor === 'Contractor'))
        setSupplierBill(bills.filter((bill) => bill.billFor === 'Supplier'))
        setMaterialBill(bills.filter((bill) => bill.billFor === 'Material'))
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
      <Tabs defaultActiveKey='contractor'>

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
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.site?.name}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Contractor</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.contractor?.name}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Bill Date</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.dateOfBill ? moment(bill.dateOfBill).format('DD-MM-YYYY') : '-'}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Work</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.billOf?.workDetail}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Amount</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.amount}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Paid</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.paidAmount}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Due</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.dueAmount}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Status</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.paymentStatus}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Payment Date</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.dateOfPayment ? moment(bill.dateOfPayment).format('DD-MM-YYYY') : '-'}</dd>
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
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.site?.name}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Supplier</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.supplier?.name}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Bill Date</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.dateOfBill ? moment(bill.dateOfBill).format('DD-MM-YYYY') : '-'}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Material</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.billOf?.material}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Amount</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.amount}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Paid</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.paidAmount}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Due</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.dueAmount}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Status</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.paymentStatus}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Payment Date</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.dateOfPayment ? moment(bill.dateOfPayment).format('DD-MM-YYYY') : '-'}</dd>
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
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Site</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.site?.name}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Bill Date</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.dateOfBill ? moment(bill.dateOfBill).format('DD-MM-YYYY') : '-'}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Material</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.billOf?.material}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Amount</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.amount}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Paid</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.paidAmount}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Due</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.dueAmount}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Status</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.paymentStatus}</dd>
                </div>

                <div className='flex justify-between flex-row my-1.5'>
                  <dt className='font-medium text-color-title mx-5 my-1.5'>Payment Date</dt>
                  <dd className='text-color-title mx-5 my-1.5'>{bill.dateOfPayment ? moment(bill.dateOfPayment).format('DD-MM-YYYY') : '-'}</dd>
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