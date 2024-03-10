import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import Header from '../components/Header';
axios.defaults.withCredentials = true;
const WorkDetails = () => {
  const [workDetails, setWorkDetail] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkDetails = async () => {
      try {
        const response = await axios.get('/api/v1/work-details');
        console.log(response.data)
        setWorkDetail(response.data);
      } catch (error) {
        console.error(error)
      }
    };
    fetchWorkDetails();
  }, []);

  const handleAdd = () => {
    navigate('/create-work-details');
  };

  const handleEdit = (id) => {
    navigate(`/edit-work-detail/${id}`);
  };

  const editDetails = (id, index) => {
    navigate(`/edit-work-detail/${id}/${index}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/work-details/${id}`);
      setWorkDetail(workDetails.filter((workDetail) => workDetail._id !== id));
      toast.success(response.data.message)
      console.log(response.data)
    } catch (error) {
      toast.error(error.message)
    }
  };

  const DeleteDetail = async (id, index) => {
    try {
      const response = await axios.delete(`/api/v1/work-details/${id}/${index}`);
      setWorkDetail(response.data?.workDetails);
      toast.success(response.data.message)
      console.log(response.data)
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
      <div className="overflow-x-auto h-full">
        <Header category="Page" title="Work Detail's" />
        <div className="text-sm text-gray-700 py-1 flex flex-row items-center justify-end">
          <button onClick={handleAdd} className="bg-green-500 rounded-full text-white p-2 mt-2 sm:mt-0">
            <MdAdd className='text-xl' />
          </button>
        </div>

        <div className="overflow-x-auto grid grid-cols-1 lg:grid-cols-2"
          style={{
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
          }}>
          {workDetails?.map((workDetail) => (
            <div key={workDetail._id} className="card">
              <details className="rounded-lg bg-white overflow-hidden shadow-lg p-3">
                <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                  {workDetail.title}
                  <div>
                    <button
                      onClick={() => handleEdit(workDetail._id)}
                      className="mr-2"
                    >
                      <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                    </button>
                    <button
                      onClick={() => handleDelete(workDetail._id)}>
                      <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                    </button>
                  </div>
                </summary>

                {workDetail?.description?.map((description, index) => (
                  <ul key={index} className='flex justify-between flex-row my-1.5'>
                    <li className='font-medium text-color-title mx-5 py-2 list-disc'>{description.work}</li>
                    <div className="px-6 py-2">
                      <button
                        onClick={() => editDetails(workDetail._id, index)}
                        className="mr-2"
                      >
                        <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                      </button>
                      <button
                        onClick={() => DeleteDetail(workDetail._id, index)}>
                        <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                      </button>
                    </div>
                  </ul>
                ))}

              </details>
            </div>
          ))}
        </div>

        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </div>
    </div>
  )
}

export default WorkDetails