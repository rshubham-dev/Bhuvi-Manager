import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdAdd, MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import moment from 'moment';
import Header from '../components/Header';

axios.defaults.withCredentials = true;

const QualitySchedules = () => {
  const navigate = useNavigate();
  const [qualitySchedules, setQualitySchedule] = useState([]);

  useEffect(() => {
    const getprojectSchedules = async () => {
      try {
        const qualitySchedulesData = await axios.get('/api/v1/quality-schedule');
        setQualitySchedule(qualitySchedulesData.data);
        console.log(projectScheduleData.data)
      } catch (error) {
        toast.error(error.message);
      }
    }
    getprojectSchedules();
  }, []);


  const handleEdit = (id) => {
    console.log(id)
    navigate(`/edit-qualitySchedule/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/quality-schedule/${id}`);
      setQualitySchedule(qualitySchedules.filter((qualitySchedule) => qualitySchedule._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleRedirect = (id) => {
    navigate(`/quality-schedule/${id}`);
  };

  const handleAdd = () => {
    navigate('/create-quality-schedule');
  };

  return (
    <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-8 shadow-md bg-white rounded-2xl'>
      <div className="overflow-x-auto">
        <Header category="Page" title="Quality Check Schedule's" />
        <div className="w-full mx-auto mb-6 text-gray-700 p-1 flex flex-row justify-between items-center">
          <h2 className="text-lg text-wrap sm:text-md md:text-lg lg:text-xl text-green-600 mr-4 pr-4">
            Total Quality Schedules: {qualitySchedules?.length}
          </h2>
          <button onClick={handleAdd} className="bg-green-500 rounded-full text-white px-2 py-2">
            <MdAdd className='text-xl' />
          </button>
        </div>

        <div className="overflow-x-auto"
          style={{
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
          }}>
          <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
            <thead className="bg-gray-800">
              <tr className="text-white text-left">
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4">Site</th>
                {/* <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Starting Date</th>
                      <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Status</th>
                      <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center">Actual Date</th> */}
                <th scope="col" className="font-semibold text-sm uppercase px-6 py-4 text-center"></th>
              </tr>
            </thead>

            <tbody>
              {qualitySchedules.map((qualitySchedule) => (
                <tr key={qualitySchedule._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">
                    {qualitySchedule.site?.name}
                  </td>
                  {/* <td className="px-6 py-4">{moment(work.toStart).format('DD-MM-YYYY')}</td>
                        <td className="px-6 py-4">{work.status}</td>
                        <td className="px-6 py-4 text-center">{work.startedAt ? moment(work.startedAt).format('DD-MM-YYYY') : '-'}</td> */}
                  <td className="px-6 py-4">
                    <button onClick={() => handleRedirect(qualitySchedule._id)} className="mr-2">
                      <FaExternalLinkAlt className='text-blue-500 hover:text-blue-800 text-lg' />
                    </button>
                    <button
                      onClick={() => handleEdit(qualitySchedule._id)}
                      className="mr-2">
                      <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                    </button>
                    <button
                      onClick={() => handleDelete(qualitySchedule._id)}>
                      <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
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
      </div>
    </div>
  )
}

export default QualitySchedules;