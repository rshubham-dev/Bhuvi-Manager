import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './screen.css';
import { GrEdit } from "react-icons/gr";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';
import Header from '../components/Header';
axios.defaults.withCredentials = true;

const WorkOrderScreen = () => {
  const [workDetail, setWorkDetail] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchWorkDetails(id);
    }
  }, [id]);

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
    <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-6 rounded-3xl bg-white'>
      <Header category="Page" title="Work Order Work Detail" />
      <section className='mb-12 h-full w-full'>
        <div className=" w-full flex flex-row justify-end items-end mb-6">
          <button onClick={() => handleEdit(id)} className="bg-green-500 text-white px-2 py-2 rounded-full">
            <MdAdd className='text-xl' />
          </button>
        </div>

        <div className="overflow-x-auto"
          style={{
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
          }}>          <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
            <thead className="bg-gray-800">
              <tr className="text-white text-left">
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Work</th>
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Rate</th>
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Area</th>
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Amount</th>
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Status</th>
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {workDetail.map((work, index) => (
                <tr key={index} className='border-b border-blue-gray-200'>
                  <td className="px-6 py-4">
                    {work.workDetail}
                  </td>
                  <td className="px-6 py-4 text-center">{work.rate}</td>
                  <td className="px-6 py-4 text-center">{work.area}</td>
                  <td className="px-6 py-4 text-center">{work.amount}</td>
                  <td className="px-6 py-4 text-center">{work.status}</td>
                  <td className="px-6 py-4 text-center">
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
        </div>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </section>
    </div>
  )
}

export default WorkOrderScreen