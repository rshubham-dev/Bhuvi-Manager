import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
axios.defaults.baseURL = 'https://bhuvi-management-server.onrender.com';
axios.defaults.withCredentials = true;

const ProjectSchedules = () => {
  const navigate = useNavigate();
  const [projectSchedules, setProjectSchedule] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getprojectSchedules = async () => {
      try {
        const projectScheduleData = await axios.get('/api/v1/project-schedule');
        setProjectSchedule(projectScheduleData.data);
        console.log(projectSchedules); // Add this line
      } catch (error) {
        toast.error(error.message);
        setError(error.message);
      }
    }
    getprojectSchedules();
  }, []);


  const handleEdit = (projectScheduleId) => {
    // Add your edit logic here
    navigate(`/edit-project-schedule?project-scheduleId=${projectScheduleId}`);
  };

  const handleRedirect = (projectScheduleId) => {
    navigate(`/project-schedule?project-scheduleId=${projectScheduleId}`);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/project-schedule/${id}`);
      setProjectSchedule(projectSchedules.filter((projectSchedule) => projectSchedule._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleAdd = () => {
    navigate('/create-project-schedule');
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-2xl font-bold text-center mt-4">Project Schedule</h1>
      <div className=" mb-4 mr-20 text-right">
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
          Add Project Schedule
        </button>
      </div>

      <section className='bg-white px-12 py-8 mb-16 h-full w-2/5'>
        {/* <div className="mt-6 w-full">
          {projectSchedules.map((projectSchedule) => (
            <div key={projectSchedule._id} className="card">
              <details className="rounded-lg bg-white overflow-hidden shadow-lg p-3">
                <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                  Project Schedule of {projectSchedule?.site || 'Unknown Site'}
                </summary>


                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Name</th>
                      <th scope="col" className="px-6 py-3">Total Floor</th>
                      <th scope="col" className="px-6 py-3">Area</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectSchedule?.projectDetail.map((work) => (
                      <tr key={work._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                          {work.workDetail || 'No Work Detail'}
                        </td>

                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </details>
            </div>
          ))}
        </div> */}
      </section>

      {/* 
              <button
                onClick={() => handleRedirect(projectSchedule._id)}
                className="bg-blue-500 text-white px-2 py-1 mr-2"
              >
                <FaExternalLinkAlt />
              </button>
              <button
                onClick={() => handleEdit(projectSchedule._id)}
                className="bg-blue-500 text-white px-2 py-1 mr-2"
              >
                <GrEdit />
              </button>
              <button
                onClick={() => handleDelete(projectSchedule._id)}
                className="bg-red-500 text-white px-2 py-1 mr-2"
              >
                <MdDelete />
              </button> */}

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default ProjectSchedules;