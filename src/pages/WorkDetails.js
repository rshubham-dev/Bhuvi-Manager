import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";

const WorkDetails = () => {
  const [workDetails, setWorkDetail] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchWorkDetails = async () => {
      // const response = await axios.get('/api/v1/work-details');
      // console.log(response.data)
      // setWorkDetail(response.data);
      // toast.success(response.data.message)
    };
    fetchWorkDetails();
  },[]);

  const handleAdd = () => {
    navigate('/create-work-details');
  };
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg h-full">
    <h1 className="text-2xl font-bold text-center mt-5">Work Details</h1>
    <div className=" mb-4 mr-20 text-right">
      <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
        Add Work Details
      </button>
    </div>

    {workDetails.map((workDetail)=>(
      <div key={workDetail._id} className="card ">
          <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
            <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              {workDetail.title}
            </summary>

            {workDetail.description.map((description)=>(
              <div key={description._id} className='flex justify-between flex-row my-1.5'>
              <dt className='font-medium text-color-title mx-5 my-1.5'>{description.work}</dt>
              <dd className='text-color-title mx-5 my-1.5'></dd>
            </div>
              ))}

          </details>
        </div>
          ))}
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