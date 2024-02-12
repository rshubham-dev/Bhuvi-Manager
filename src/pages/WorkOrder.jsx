import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import moment from 'moment';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
axios.defaults.withCredentials = true;

const WorkOrders = () => {
  const navigate = useNavigate();
  const [workOrders, setWorkOrder] = useState([]);
  const [error, setError] = useState(null);
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {

    const fetchWorkorders = async () => {
      try {
        const workOrdersData = await axios.get('/api/v1/work-order');
        if (user.department === 'Site Supervisor' || user.department === 'Site Incharge') {
          const sites = user?.site;
          let WorkOrders;
          for (let site of sites) {
            WorkOrders = workOrdersData.data?.filter((workOrder) => workOrder.site?._id.includes(site))
          }
          setWorkOrder(WorkOrders)
        } else {
          setWorkOrder(workOrdersData.data);
        }
        console.log(workOrdersData.data)
      } catch (error) {
        toast.error(error.message)
        setError('No Work Order Found');
      }
    }
    fetchWorkorders();
  }, [])

  const handleEdit = (id) => {
    navigate(`/edit-workOrder/${id}`);
  };

  const handleRedirect = (id) => {
    navigate(`/work-order/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/work-order/${id}`);
      setWorkOrder(workOrders.filter((workOrder) => workOrder._id !== id));
      toast.success(response.data.message)
      console.log(response.data)
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleAdd = () => {
    navigate('/create-work-order');
  };

  return (
    <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
    <Header category="Page" title="Work-Orders" />
<section className="min-h-screen mb-16 flex justify-center">
  <div className='overflow-x-auto w-full px-4'>
    <h1 className="text-3xl sm:text-2xl font-bold text-center uppercase">Work Order's</h1>
    <div className="pt-3 px-4 mx-auto mb-6">
      <div className="text-sm text-gray-700 py-1 flex flex-col sm:flex-row items-center justify-between">
        <h2 className="text-lg sm:text-xl text-green-600 mb-2 sm:mb-0 sm:mr-4">Total Work Orders: {workOrders?.length}</h2>
        <button onClick={handleAdd} className="bg-green-500 rounded-full text-white p-2 mt-2 sm:mt-0">
          <MdAdd className='text-xl' /> 
        </button>
      </div>
    </div>
    <div className='overflow-x-auto'>
      <table className='mx-auto w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
        <thead className="bg-gray-800">
          <tr className="text-white text-left">
            <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Work-Order Name</th>
            <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Site</th>
            <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Contractor</th>
            <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Total Value</th>
            <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Duration</th>
            <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {workOrders.map((workOrder) => (
            <tr key={workOrder._id} className='border-b border-blue-gray-200'>
              <td className="px-6 py-4">
                <NavLink to={`/work-order/${workOrder._id}`} className="hover:text-blue-800 text-md">
                  {workOrder.workOrderName}
                </NavLink>
              </td>
              <td className="px-6 py-4">{workOrder.site?.name}</td>
              <td className="px-6 py-4 text-center">{workOrder.contractor?.name}</td>
              <td className="px-6 py-4 text-center">{workOrder.workOrderValue}</td>
              <td className="px-6 py-4 text-center">{moment(workOrder.duration).format('DD-MM-YYYY')}</td>
              <td className="px-6 py-4 text-center">
                <button onClick={() => handleEdit(workOrder._id)} className="mr-2">
                  <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                </button>
                <button onClick={() => handleDelete(workOrder._id)} className="mr-2">
                  <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {error && <p className="text-red-500">{error}</p>}
    <Toaster position="top-right" reverseOrder={false} />
  </div>
</section>
</div>
  )
}

export default WorkOrders