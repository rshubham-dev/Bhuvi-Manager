import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { FcApproval } from "react-icons/fc";
import Header from '../components/Header';
axios.defaults.withCredentials = true;

const PurchaseOrders = () => {
  const navigate = useNavigate();
  const [purchaseOrders, setPurchaseOrder] = useState([]);
  const [draftOrder, setDraftOrder] = useState([]);
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
        console.error(error)
      }
    };
    
    const getDraftOrders = async () => {
      try {
        const orderData = await axios.get('/api/v1/purchase-order/draft');
        const orders = orderData.data;
        if (user.department === 'Site Supervisor' || user.department === 'Site Incharge' && isLoggedIn) {
          const sites = user?.site;
          // console.log('user', user);
          // console.log('sites', sites);
          let draftOrders;
          for (let site of sites) {
            draftOrders = orders?.filter((bill) => bill.site?._id.includes(site))
          }
          setDraftOrder(draftOrders);
          console.log(draftOrders);
        }
      } catch (error) {
        toast.error(error.message)
      }
    };
    fetchPurchaseOrders();
    getDraftOrders();
  }, [])

  const handleEdit = (id) => {
    navigate(`/edit-purchaseOrder/${id}`);
  };

  const handleRedirect = (id) => {
    navigate(`/purchase-order/${id}`);
  }

  // const editRequirement = (id, index) => {
  //   navigate(`/edit-purchaseOrder/${id}/material/${index}`);
  // };

  // const deleteRequirement = async (id, index) => {
  //   try {
  //     await axios.delete(`/api/v1/purchase-order/${id}/requirement/${index}`);
  //     setPurchaseOrder();
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/purchase-order/${id}`);
      setPurchaseOrder(purchaseOrders.filter((purchaseOrder) => purchaseOrder._id !== id));
      setDraftOrder(draftOrder.filter((order) => order._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.post(`/api/v1/purchase-order/save/${id}`);
      setDraftOrder(draftBill.filter((bill) => bill._id !== id));
      toast.success(response.data?.message);
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };

  const handleAdd = () => {
    navigate('/create-purchaseOrder');
  };

  return (
    <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-6 shadow-lg bg-white rounded-3xl'>
        <Header category="Page" title="Purchase Order's" />
      <section className="overflow-x-auto">
        <div className='overflow-x-auto w-full max-w-screen-xl mx-auto'>
        <div className="w-full mx-auto mb-6 text-gray-700 p-1 flex flex-row justify-between items-center">
          <h2 className="text-lg text-wrap sm:text-md md:text-lg lg:text-xl text-green-600 mr-4 pr-4">
            Total Purchase Orders: {purchaseOrders?.length}
          </h2>
          <button onClick={handleAdd} className="bg-green-500 rounded-full text-white px-2 py-2">
            <MdAdd className='text-xl' />
          </button>
        </div>
        <Tabs defaultActiveKey='ordered' tabPosition='top' className="w-full">

          <Tabs.TabPane tab='Ordered' key={'ordered'}>
            <div className="overflow-x-auto"
              style={{
                scrollbarWidth: 'none',
                '-ms-overflow-style': 'none',
              }}>
              <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
                <thead className="bg-gray-800">
                  <tr className="text-white text-left">
                    <th className="font-semibold text-sm uppercase px-6 py-4 "> Name </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Admin Approve </th>
                    {/* <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Supplier Approve</th> */}
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Total Amount </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Total Paid </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Total Due </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {purchaseOrders?.map((purchaseOrder) => (
                    <tr key={purchaseOrder._id} className='border-b border-blue-gray-200'>
                      <td className="px-6 py-4">
                        <p className=""> {purchaseOrder.site?.name} </p>
                        <p className="text-gray-500 text-sm font-semibold tracking-wide"> {purchaseOrder.supplier?.name} </p>
                      </td>
                      <td className="px-6 py-4 text-center">{purchaseOrder?.adminApprove}</td>
                      {/* <td className="px-6 py-4 text-center">{purchaseOrder?.supplierApprove}</td> */}
                      <td className="px-6 py-4 text-center">₹ {purchaseOrder?.totalValue ? purchaseOrder?.totalValue : ' 0'}</td>
                      <td className="px-6 py-4 text-center">₹ {purchaseOrder?.totalPaid ? purchaseOrder?.totalPaid : ' 0'}</td>
                      <td className="px-6 py-4 text-center">₹ {purchaseOrder?.totalDue ? purchaseOrder?.totalDue : ' 0'}</td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => handleRedirect(purchaseOrder._id)} className="mr-2">
                          <FaExternalLinkAlt className='text-blue-500 hover:text-blue-800 text-lg' />
                        </button>
                        <button onClick={() => handleEdit(purchaseOrder._id)} className="mr-2">
                          <GrEdit className="text-green-500 hover:text-green-800 text-lg" />
                        </button>
                        <button onClick={() => handleDelete(purchaseOrder._id)} className="mr-2">
                          <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane tab='Draft' key={'draft'}>

            <div className="overflow-x-auto"
              style={{
                scrollbarWidth: 'none',
                '-ms-overflow-style': 'none',
              }}>
              <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
                <thead className="bg-gray-800">
                  <tr className="text-white text-left">
                    <th className="font-semibold text-sm uppercase px-6 py-4 "> Name </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Admin Approve </th>
                    {/* <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Supplier Approve</th> */}
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {draftOrder?.map((purchaseOrder) => (
                    <tr key={purchaseOrder._id} className='border-b border-blue-gray-200'>
                      <td className="px-6 py-4">
                        <p className=""> {purchaseOrder.site?.name} </p>
                        <p className="text-gray-500 text-sm font-semibold tracking-wide"> {purchaseOrder.supplier?.name} </p>
                      </td>
                      <td className="px-6 py-4 text-center">{purchaseOrder?.adminApprove}</td>
                      {/* <td className="px-6 py-4 text-center">{purchaseOrder?.supplierApprove}</td> */}
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => handleSave(purchaseOrder._id)} className=" mr-2">
                          <FcApproval className="text-green-500 hover:text-green-700 text-xl" />
                        </button>
                        <button onClick={() => handleRedirect(purchaseOrder._id)} className="mr-2">
                          <FaExternalLinkAlt className='text-blue-500 hover:text-blue-800 text-lg' />
                        </button>
                        <button onClick={() => handleEdit(purchaseOrder._id)} className="mr-2">
                          <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                        </button>
                        <button onClick={() => handleDelete(purchaseOrder._id)}>
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
        </div>

        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </section>
    </div>
  )
}

export default PurchaseOrders