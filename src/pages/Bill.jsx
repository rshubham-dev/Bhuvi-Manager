import { useSelector } from 'react-redux'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdDelete, MdAdd } from "react-icons/md";
import { Tabs } from 'antd';
import moment from 'moment';

axios.defaults.withCredentials = true;

const Bills = () => {
  const navigate = useNavigate();
  const [contractorBill, setContractorBill] = useState([]);
  const [supplierBill, setSupplierBill] = useState([]);
  const [materialBill, setMaterialBill] = useState([]);
  const [error, setError] = useState(null);
  const { user, isLoggedIn } = useSelector((state) => state.auth)

  useEffect(() => {
    const getbills = async () => {
      try {
        const billData = await axios.get('/api/v1/bill');
        const bills = billData.data;
        if (user.department === 'Site Supervisor' || user.department === 'Site Incharge' && isLoggedIn) {
          const sites = user?.site;
          console.log('user', user);
          console.log('sites', sites);
          let contractorBills;
          let supplierBills;
          // let materialBills;
          for (let site of sites) {
            contractorBills = bills.filter((bill) => bill.site?._id.includes(site) && bill.billFor === 'Contractor')
            supplierBills = bills.filter((bill) => bill.site?._id.includes(site) && bill.billFor === 'Supplier')
            // materialBills = bills.filter((bill) => bill.site?._id.includes(site) && bill.billFor === 'Material')
          }
          console.log('contractorBillfirst', contractorBills)
          setContractorBill(contractorBills);
          setSupplierBill(supplierBills);
          // setMaterialBill(materialBills);
        } else {
          setContractorBill(bills.filter((bill) => bill.billFor === 'Contractor'));
          setSupplierBill(bills.filter((bill) => bill.billFor === 'Supplier'));
          // setMaterialBill(bills.filter((bill) => bill.billFor === 'Material'));
        }
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
<section className="min-h-full w-full mb-20 flex justify-center bg-white rounded-xl shadow-lg">
  <div className='overflow-x-auto w-full max-w-screen-lg mx-auto'>
    <h1 className="text-xl sm:text-lg lg:text-3xl my-4 font-bold text-center uppercase">Bill's</h1>
    <div className="pt-3 mx-auto mb-4 w-full sm:w-4/5">
      <div className="w-full mx-auto text-gray-700 flex flex-row justify-end items-center">
        <button onClick={handleAdd} className="bg-green-500 rounded-full text-white px-2 py-2 sm:mt-0">
          <MdAdd className='text-xl' />
        </button>
      </div>
    </div>

    <Tabs defaultActiveKey='contractor' tabPosition='top' className="w-full">
      <Tabs.TabPane tab='Contractor' key={'contractor'}>
        <div className="overflow-x-auto">
          <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
            {/* Table Headers */}
            <thead className="bg-gray-800">
              <tr className="text-white text-left">
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Bill For</th>
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Description</th>
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Amount</th>
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Payment Status</th>
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center"></th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {contractorBill?.map((bill) => (
                <tr key={bill._id} className='border-b border-blue-gray-200'>
                  <td className="px-6 py-4">
                    <p className=""> {bill.site?.name}Site </p>
                    <p className="text-gray-500 text-sm font-semibold tracking-wide"> {bill.contractor?.name}Cont </p>
                  </td>
                  <td className="px-6 py-4">
                    <NavLink to={`/bill/${bill._id}`} className="hover:text-blue-800 text-md">
                      {bill.billOf?.workDetail}
                    </NavLink>
                  </td>
                  <td className="px-6 py-4 text-center">{bill.amount}</td>
                  <td className="px-6 py-4 text-center">{bill.paymentStatus}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleEdit(bill._id)} className="mr-2">
                      <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                    </button>
                    <button onClick={() => handleDelete(bill._id)} className="mx-2">
                      <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tabs.TabPane>

      <Tabs.TabPane tab='Supplier' key={'supplier'}>
        <div className="overflow-x-auto">
          <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
            {/* Table Headers */}
            <thead className="bg-gray-800">
              <tr className="text-white text-left">
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Bill For</th>
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Description</th>
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Amount</th>
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Payment Status</th>
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center"></th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {supplierBill?.map((bill) => (
                <tr key={bill._id} className='border-b border-blue-gray-200'>
                  <td className="px-6 py-4">
                    <p className=""> {bill.site?.name}</p>
                    <p className="text-gray-500 text-sm font-semibold tracking-wide"> {bill.supplier?.name} </p>
                  </td>
                  <td className="px-6 py-4">
                    <NavLink to={`/bill/${bill?._id}`} className="hover:text-blue-800 text-md">
                      {bill?.billOf.material}
                    </NavLink>
                  </td>
                  <td className="px-6 py-4 text-center">{bill.amount}</td>
                  <td className="px-6 py-4 text-center">{bill.paymentStatus}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleEdit(bill._id)} className="mr-2">
                      <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                    </button>
                    <button onClick={() => handleDelete(bill._id)} className="mx-2">
                      <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tabs.TabPane>
    </Tabs>
    <Toaster position="top-right" reverseOrder={false} />
    {error && <p className="text-red-500">{error}</p>}
  </div>
</section>

  );
};

export default Bills;