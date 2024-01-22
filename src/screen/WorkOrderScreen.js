import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './screen.css';
import { GrEdit } from "react-icons/gr";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';

axios.defaults.withCredentials = true;

const WorkOrderScreen = () => {
  const [workDetail, setWorkDetail] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchWorkDetails(id);
    }
  }, []);

  const handleEdit = (id) => {
    console.log(id)
    navigate(`/edit-workOrder/${id}`);
  };

  const fetchWorkDetails = async (id) => {
    try {
      const response = await axios.get(`/api/v1/work-order/${id}/work`);
      console.log(response.data)
      setWorkDetail(response.data?.workDetail);
    } catch (error) {
      console.log('Error fetching site details:', error);
    }
  };

  const editWork = (id, index) => {
    console.log('id', id)
    console.log('index', index)
    navigate(`/edit-workOrder/${id}/work/${index}`);
  };

  const deleteWork = async (id, index) => {
    try {
      const response = await axios.delete(`/api/v1/work-order/${id}/work/${index}`);
      console.log(response.data.workDetail)
      setWorkDetail(response.data.workDetail);
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <section className='bg-white py-6 mb-16 h-full w-full'>
      <h1 className="text-2xl font-bold text-center">Work Detail</h1>
      <div className=" mb-4 mr-10 text-right">
        <button onClick={() => handleEdit(id)} className="bg-green-500 text-white px-2 py-1.5 rounded-2xl">
          <MdAdd className='text-xl' />
        </button>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-4">Work</th>
            <th scope="col" className="px-6 py-4">Unit</th>
            <th scope="col" className="px-6 py-4">Rate</th>
            <th scope="col" className="px-6 py-4">Area</th>
            <th scope="col" className="px-6 py-4">Amount</th>
            <th scope="col" className="px-6 py-4">Status</th>
            <th scope="col" className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workDetail.map((work, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                {work.workDetail}
              </td>
              <td className="px-6 py-4">{work.unit}</td>
              <td className="px-6 py-4">{work.rate}</td>
              <td className="px-6 py-4">{work.area}</td>
              <td className="px-6 py-4">{work.amount}</td>
              <td className="px-6 py-4">{work.status}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => editWork(id, index)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                >
                  <GrEdit />
                </button>
                <button
                  onClick={() => deleteWork(id, index)}
                  className="bg-red-500 text-white px-2 py-1 mr-2"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </section>
  )
}

export default WorkOrderScreen