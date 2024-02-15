import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../asset/logo.png';
import moment from 'moment';
import axios from 'axios';
import { GrEdit } from "react-icons/gr";
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';

const BillScreen = () => {
  const { id } = useParams();
  const [bill, setBill] = useState('');
  const [contractorBill, setContractorBill] = useState({});
  const [supplierBill, setSupplierBill] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      getbills(id);
    }
  }, []);

  const getbills = async (id) => {
    try {
      const billData = await axios.get(`/api/v1/bill/${id}`);
      console.log(billData.data);
      setBill(billData.data);
      setContractorBill(billData.data);
      setSupplierBill(billData.data);
      // setMaterialBill(bills.filter((bill) => bill.billFor === 'Material'));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const BillFor = (bill) => {
    if (bill?.billFor === 'Contractor') {
      return (
        <tr className='border-b border-blue-gray-200'>
          <td className="px-6 py-4 text-gray-700">{bill.billOf?.workDetail}</td>
          <td className="px-6 py-4 text-gray-700">{bill ? `${bill.billOf?.rate}/${bill.billOf?.unit}` : '-'}</td>
          <td className="px-6 py-4 text-gray-700">{bill.billOf?.area}</td>
          <td className="px-6 py-4 text-gray-700">₹{bill.billOf?.amount}</td>
        </tr>
      )
    }
    else if (bill?.billFor === 'Supplier') {
      <tr className='border-b border-blue-gray-200'>
        <td className="px-6 py-4 text-gray-700">{bill.billOf?.material}</td>
        <td className="px-6 py-4 text-gray-700">{bill ? `${bill.billOf?.rate}/${bill.billOf?.unit}` : '-'}</td>
        <td className="px-6 py-4 text-gray-700">{bill.billOf?.quantity}</td>
        <td className="px-6 py-4 text-gray-700">₹{bill.billOf?.amount}</td>
      </tr>
    }
  }

  return (
    <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-6 rounded-2xl bg-white'>
      <Header category="Page" title="Bill" />
      <section className="h-full w-full bg-white overflow-x-auto p-2">
        <div className="flex items-center justify-center flex-col mb-6">
          <img className="h-20 md:24 w-fit mb-1" src={logo}
            alt="Logo" />
          <div className="text-blue-950 font-bold text-2xl md:text-3xl">Bhuvi Consultants</div>
        </div>
        <div className="pb-6 mb-4">
          <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
          <div className="text-gray-700 mb-1">Name: {bill?.billFor !== '' && bill?.billFor === 'Contractor' ? bill?.contractor?.name : bill?.supplier?.name}</div>
          <div className="text-gray-700 mb-1">Site: {bill?.site?.name}</div>
          <div className="text-gray-700 mb-1">Date: {bill?.dateOfBill ? moment(bill?.dateOfBill).format('DD-MM-YYYY') : '-'}</div>
          <div className="text-gray-700 mb-1">Bill No : {bill === '' ? '-' : `BHC/${bill?.site?.name}${bill?.billNo ? bill?.billNo : ''}`}</div>
        </div>

        <div className="overflow-x-auto"
          style={{
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
          }}>
          <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
            <thead className="bg-gray-800">
              <tr className="text-white text-left">
                <th className="font-semibold text-sm uppercase px-6 py-4">Description</th>
                <th className="font-semibold text-sm uppercase px-6 py-4">Rate</th>
                <th className="font-semibold text-sm uppercase px-6 py-4">Quantity</th>
                <th className="font-semibold text-sm uppercase px-6 py-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {BillFor(bill)}
              {/* <tr>
              <td className="py-4 text-gray-700">Product 1</td>
              <td className="py-4 text-gray-700">1</td>
              <td className="py-4 text-gray-700">1</td>
              <td className="py-4 text-gray-700">$100.00</td>
              <td className="py-4 text-gray-700">$100.00</td>
            </tr> */}
            </tbody>
          </table>
        </div>

        <div className=" pb-4 mt-6">
          <h2 className="text-xl font-bold mt-4">Payment Details:</h2>
          <p className="text-gray-700 mt-4">Payment Date: {bill?.dateOfPayment ? moment(bill?.dateOfPayment).format('DD-MM-YYYY') : '-'}</p>
        </div>

        <div className="overflow-x-auto"
          style={{
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
          }}>
          <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
            <thead className="bg-gray-800">
              <tr className="text-white text-left">
                <th className="font-semibold text-sm uppercase px-6 py-4">Total Amount</th>
                <th className="font-semibold text-sm uppercase px-6 py-4">To Pay</th>
                <th className="font-semibold text-sm uppercase px-6 py-4">Paid</th>
                <th className="font-semibold text-sm uppercase px-6 py-4">Due</th>
                <th className="font-semibold text-sm uppercase px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className='border-b border-blue-gray-200'>
                <td className="px-6 py-4 text-gray-700">₹{bill?.amount}</td>
                <td className="px-6 py-4 text-gray-700">₹{bill?.toPay}</td>
                <td className="px-6 py-4 text-gray-700">₹{bill?.paidAmount ? bill?.paidAmount : '0'}</td>
                <td className="px-6 py-4 text-gray-700">₹{bill?.dueAmount}</td>
                <td className="px-6 py-4 text-gray-700">
                  <button onClick={() => navigate(`/edit-bill/${bill._id}`)}>
                    <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-8">
          <div className="text-gray-700 mb-2">{bill?.reason}</div>
          {/* <div className="text-gray-700 mb-2">Please make checks payable to Your Company Name and mail to:</div>
          <div className="text-gray-700">123 Main St., Anytown, USA 12345</div> */}
        </div>

        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </section>
    </div>
  )
}

export default BillScreen