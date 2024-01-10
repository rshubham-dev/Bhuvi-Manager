import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
axios.defaults.baseURL = 'https://bhuvi-management-server.onrender.com';
axios.defaults.withCredentials = true;
const WorkDetails = () => {
  const [workDetails, setWorkDetail] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkDetails = async () => {
      try {
        const response = await axios.get('/api/v1/work-details');
        setWorkDetail(response.data);
        toast.success(response.data.message)
      } catch (error) {
        toast.error(error.message)
      }
    };
    fetchWorkDetails();
  }, []);

  const handleAdd = () => {
    navigate('/create-work-details');
  };
  return (
    <div className="overflow-x-auto h-full">
      <h1 className="text-2xl font-bold text-center mt-5">Work Details</h1>
      <div className=" mb-4 mr-20 text-right">
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
          Add Work Details
        </button>
      </div>
      
      <section className='bg-white px-12 py-8 mb-16 h-full w-2/5'>
        <h1 className="text-3xl font-semibold text-gray-800"> Site Details</h1>
        <div className="mt-6 w-full">
          {workDetails.map((workDetail) => (
            <div key={workDetail._id} className="card">
              <details className="rounded-lg bg-white overflow-hidden shadow-lg p-3">
                <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                  {workDetail.title}
                </summary>

                {workDetail.description.map((description) => (
                  <ul key={description._id} className='flex justify-between flex-row my-1.5'>
                    <li className='font-medium text-color-title mx-5 my-1.5 list-disc'>{description.work}</li>
                  </ul>
                ))}

              </details>
            </div>
          ))}
        </div>
      </section>

      {/* <td className="px-6 py-4">
              <button
                onClick={() => handleRedirect(workOrder._id)}
                className="bg-blue-500 text-white px-2 py-1 mr-2"
              >
                <FaExternalLinkAlt />
              </button>
              <button
                onClick={() => handleEdit(workOrder._id)}
                className="bg-blue-500 text-white px-2 py-1 mr-2"
              >
                <GrEdit />
              </button>
              <button
                onClick={() => handleDelete(workOrder._id)}
                className="bg-red-500 text-white px-2 py-1 mr-2"
              >
                <MdDelete />
              </button>
            </td> */}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default WorkDetails