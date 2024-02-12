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
  const [projectSchedules, setProjectSchedule] = useState([]);

  useEffect(() => {
    const getprojectSchedules = async () => {
      try {
        const projectScheduleData = await axios.get('/api/v1/quality-schedule');
        setProjectSchedule(projectScheduleData.data);
        console.log(projectScheduleData.data)
      } catch (error) {
        toast.error(error.message);
      }
    }
    getprojectSchedules();
  }, []);


  const handleEdit = (id, index) => {
    console.log(id)
    console.log(index)
    navigate(`/edit-qualitySchedule/${id}/${index}`);
  };

  const addMore = async (id) => {
      navigate(`/edit-qualitySchedule/${id}`);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/quality-schedule/${id}`);
      setProjectSchedule(projectSchedules.filter((projectSchedule) => projectSchedule._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const deleteDetail = async (id, index) => {
    try {
      const response = await axios.delete(`/api/v1/quality-schedule/${id}/workDetails/${index}`);
      setProjectSchedule(response.data);
      console.table(response.data)
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleAdd = () => {
    navigate('/create-quality-schedule');
  };

  return (
    <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 shadow-md bg-white rounded-2xl'>
    <div className="overflow-x-auto">
    <Header category="Page" title="Quality Check Schedule's" />
      <div className=" mb-4 text-right flex justify-between align-center">
      <h2 className="text-xl text-green-600 ml-8">Total Quality Schedules: {projectSchedules?.length}</h2>
        <button onClick={handleAdd} className="bg-green-500 rounded-full text-white px-2 py-2 sm:mt-0">
        <MdAdd className='text-xl' />
        </button>
      </div>

      <section className='bg-white px-12 py-8 mb-16 h-full w-full'>
        <div className="mt-6">
          {projectSchedules?.map((projectSchedule) => (
            <div key={projectSchedule._id} className="card">
              <details className="rounded-lg bg-white overflow-x-auto shadow-lg p-3">
                <summary className='tracking-tight flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                  Project Schedule of {projectSchedule.site?.name}
                  <div className='self-end'>
                    <button
                    onClick={()=> addMore(projectSchedule._id)}
                      className="bg-green-500 rounded-3xl text-white px-1.5 py-1.5 mr-2">
                      <MdAdd className="text-xl text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(projectSchedule._id)}
                      className="bg-red-500 rounded-3xl text-white px-1.5 py-1.5 mr-2"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </summary>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Work</th>
                      <th scope="col" className="px-6 py-3">Starting Date</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-6 py-3">Actual Date</th>
                      <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {projectSchedule?.projectDetail.map((work, index) => (
                      <tr key={work._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                          {work.workDetail || 'No Work Detail'}
                        </td>
                        <td className="px-6 py-4">{moment(work.toStart).format('DD-MM-YYYY')}</td>
                        <td className="px-6 py-4">{work.status}</td>
                        <td className="px-6 py-4 text-center">{work.startedAt ? moment(work.startedAt).format('DD-MM-YYYY') : '-'}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleEdit(projectSchedule._id, index)}
                            className="bg-blue-500 text-white px-1.5 py-1.5 mr-2 rounded-3xl"
                          >
                            <GrEdit />
                          </button>
                          <button
                            onClick={() => deleteDetail(projectSchedule._id, index)}
                            className="bg-red-500 text-white px-1.5 py-1.5 mr-2 rounded-3xl"
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </details>
            </div>
          ))}
        </div>
      </section>


      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
    </div>
  )
}

export default QualitySchedules;