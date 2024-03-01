import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../asset/logo.webp';
import moment from 'moment';
import axios from 'axios';
import { GrEdit } from "react-icons/gr";
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import BillPdf from '../pdf/BillPdf';

const BillScreen = () => {
  const { id } = useParams();
  const [bill, setBill] = useState('');
  const [viewPdf, setViewPdf] = useState(false);
  const [contractorBill, setContractorBill] = useState({});
  const [supplierBill, setSupplierBill] = useState({});
  const navigate = useNavigate();
  const { data } = useParams();
  useEffect(() => {
    if (id && !data) {
      getbills(id);
    } else if (data) {
      fetchApproval(data)
    }
  }, []);

  const getbills = async (id) => {
    try {
      if (id) {
        const billData = await axios.get(`/api/v1/bill/${id}`);
        console.log(billData.data);
        setBill(billData.data);
        setContractorBill(billData.data);
        setSupplierBill(billData.data);
        // setMaterialBill(bills.filter((bill) => bill.billFor === 'Material'));
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const fetchApproval = async (id) => {
    try {
      console.log(id)
      const response = await axios.get(`/api/v1/approval/pending/${id}`);
      const data = response.data?.data
      const siteData = await axios.get(`/api/v1/site/${data.site}`);
      if (data.supplier) {
        const supplierData = await axios.get(`/api/v1/supplier/${data.supplier}`);
        data.supplier = supplierData.data;
      } else if (data.contractor) {
        const contractorData = await axios.get(`/api/v1/contractor/${data.contractor}`);
        data.contractor = contractorData.data;
      }
      data.site = siteData.data;
      setBill(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

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

  const handleDownload = () => {
    return(
      <>
      <PDFDownloadLink document={<BillPdf/>} fileName='bill.pdf'></PDFDownloadLink>
      </>
    )
  }

  return (
    <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-6 rounded-2xl bg-white'>
      <Header category="Page" title="Bill" />
      {viewPdf === true ? <BillPdf bill={bill} /> :
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
                    <td className="px-6 py-4 text-gray-700">₹{bill?.dueAmount ? bill?.dueAmount : '0'}</td>
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

            <div className='mt-2 flex justify-between '>
              <button
                type='button'
                className='bg-blue-500 text-white px-4 py-2 rounded-md'
                onClick={() => setViewPdf(true)}>
                View As Pdf
              </button>
              <button
                type='button'
                className='bg-green-500 text-white px-4 py-2 rounded-md'
                onClick={handleDownload}>
                Download
              </button>
            </div>
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
        </section>
      }
    </div>
  )
}

export default BillScreen