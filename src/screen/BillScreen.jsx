import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../asset/logo.png';
import moment from 'moment';
import axios from 'axios';
import { GrEdit } from "react-icons/gr";
import toast, { Toaster } from 'react-hot-toast';

const BillScreen = () => {
  const { id } = useParams();
  const [bill, setBill] = useState('');
  const [contractorBill, setContractorBill] = useState({});
  const [supplierBill, setSupplierBill] = useState({});

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
        <tr>
          <td className="py-4 text-gray-700">{bill.billOf?.workDetail}</td>
          <td className="py-4 text-gray-700">{bill ? `${bill.billOf?.rate}/${bill.billOf?.unit}` : '-'}</td>
          <td className="py-4 text-gray-700">{bill.billOf?.area}</td>
          <td className="py-4 text-gray-700">₹{bill.billOf?.amount}</td>
        </tr>
      )
    }
    else if (bill?.billFor === 'Supplier') {
      <tr>
        <td className="py-4 text-gray-700">{bill.billOf?.material}</td>
        <td className="py-4 text-gray-700">{bill ? `${bill.billOf?.rate}/${bill.billOf?.unit}` : '-'}</td>
        <td className="py-4 text-gray-700">{bill.billOf?.quantity}</td>
        <td className="py-4 text-gray-700">₹{bill.billOf?.amount}</td>
      </tr>
    }
  }

  return (
    <div className="bg-white px-6 py-12 max-w-2xl mt-4 mb-32 mx-auto">
      <div className="flex items-center justify-center flex-col mb-8">
          <img className="h-14 w-24 mb-2" src={logo}
            alt="Logo" />
          <div className="text-blue-950 font-bold text-3xl">Bhuvi Consultants</div>
      </div>
      <div className="border-b-2 border-gray-300 pb-6 mb-4">
        <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
        <div className="text-gray-700 mb-1">Name: {bill?.billFor !== '' && bill?.billFor === 'Contractor' ? bill?.contractor?.name : bill?.supplier?.name}</div>
        <div className="text-gray-700 mb-1">Site: {bill?.site?.name}</div>
        <div className="text-gray-700 mb-1">Date: {bill?.dateOfBill ? moment(bill?.dateOfBill).format('DD-MM-YYYY') : '-'}</div>
        <div className="text-gray-700 mb-1">Bill No : {bill === '' ? '-' : `BHC/${bill?.site?.name}/${bill?.billNo}`}</div>
      </div>
      <table className="w-full text-left mb-8">
        <thead>
          <tr>
            <th className="text-gray-700 font-bold uppercase py-2">Description</th>
            <th className="text-gray-700 font-bold uppercase py-2">Rate</th>
            <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
            <th className="text-gray-700 font-bold uppercase py-2">Total</th>
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

      <div className="border-y-2 border-gray-100 pb-4 mt-6">
        <h2 className="text-xl font-bold mt-4">Payment Details:</h2>
        <p className="text-gray-700 mt-4">Payment Date: {bill?.dateOfPayment ? moment(bill?.dateOfPayment).format('DD-MM-YYYY') : '-'}</p>
      </div>
      <table className="w-full text-left mb-3 mt-4">
        <thead>
          <tr>
            <th className="text-gray-700 font-bold uppercase py-2">Total Amount</th>
            <th className="text-gray-700 font-bold uppercase py-2">To Pay</th>
            <th className="text-gray-700 font-bold uppercase py-2">Paid</th>
            <th className="text-gray-700 font-bold uppercase py-2">Due</th>
            <th className="text-gray-700 font-bold uppercase py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-4 text-gray-700">₹{bill?.amount}</td>
            <td className="py-4 text-gray-700">₹{bill?.toPay}</td>
            <td className="py-4 text-gray-700">₹{bill?.paidAmount}</td>
            <td className="py-4 text-gray-700">₹{bill?.dueAmount}</td>
            <td className="py-4 text-gray-700">
              <button>
                <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div className="flex justify-end mb-8">
          <div className="text-gray-700 mr-2">:</div>
          <div className="text-gray-700">₹</div>
        </div>
        <div className="flex justify-end text-right mb-8">
          <div className="text-gray-700 mr-2">To Pay:</div>
          <div className="text-gray-700">₹</div>
        </div>
        <div className="flex justify-end mb-8">
          <div className="text-gray-700 mr-2">Total:</div>
          <div className="text-gray-700 font-bold text-lg">₹</div>
        </div> */}

      <div className="border-t-2 border-gray-200 pt-8">
        <div className="text-gray-700 mb-2">{bill?.reason}</div>
        {/* <div className="text-gray-700 mb-2">Please make checks payable to Your Company Name and mail to:</div>
          <div className="text-gray-700">123 Main St., Anytown, USA 12345</div> */}
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default BillScreen