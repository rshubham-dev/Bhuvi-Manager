import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';

axios.defaults.withCredentials = true;

const Sites = () => {
  const navigate = useNavigate();
  const [sites, setSite] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user && user.department === 'Site Incharge') {
      console.log(user._id)
      getUserSites(user._id);
    } else if (user && user.department === 'Site Supervisor') {
      console.log(user)
      getUserSites(user._id);
    } else {
      const getSites = async () => {
        try {
          const siteData = await axios.get('/api/v1/site');
          setSite(siteData.data);
          console.log(siteData.data)
        } catch (error) {
          toast.error(error.message)
          setError(error.message);
        }
      }
      getSites();
    }
  }, [])

  const getUserSites = async (id) => {
    try {
      const siteData = await axios.get(`/api/v1/site/user/${id}`);
      setSite(siteData.data);
    } catch (error) {
      toast.error(error.message)
      setError(error.message);
    }
  }
  console.log(sites)

  const handleEdit = (id) => {
    navigate(`/edit-site/${id}`);
  };

  const handleRedirect = (id) => {
    navigate(`/site/${id}`);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/site/${id}`);
      setSite(sites.filter((site) => site._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleAdd = () => {
    navigate('/create-site');
  };


  return (
    <section className="min-h-full w-full mb-24 flex justify-center bg-white">
      <div className='overflow-x-auto w-full max-w-screen-lg mx-auto'>
        <h1 className="text-xl sm:text-lg lg:text-3xl font-bold text-center uppercase">Site's</h1>
        <div className="pt-3 mx-auto mb-4 w-full sm:w-4/5">
          <div className="w-full mx-auto text-gray-700 py-1 flex flex-row sm:flex-row justify-between items-center">
            <h2 className="text-lg sm:text-md md:text-lg lg:text-xl text-green-600 mb-2 sm:mb-0 sm:mr-4">Total Sites: {sites?.length}</h2>
            {user.role === 'Admin' && (
              <button onClick={handleAdd} className="bg-green-500 rounded-full text-white px-2 py-2 sm:mt-0">
                <MdAdd className='text-xl' />
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
            <thead className="bg-gray-800">
              <tr className="text-white text-left">
                <th className="font-semibold text-sm uppercase px-6 py-4 "> Name </th>
                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Total Floor </th>
                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Incharge </th>
                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Project Type </th>
                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sites?.map((site) => (
                <tr key={site._id} className='border-b border-blue-gray-200'>
                  <td className="px-6 py-4">
                    <p className=""> {site.name} </p>
                    <p className="text-gray-500 text-sm font-semibold tracking-wide"> {site.client.name} </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {site.floors}
                  </td>
                  <td className="px-6 py-4 text-center">{site.incharge?.userName}</td>
                  <td className="px-6 py-4 text-center">{site.projectType}</td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleRedirect(site._id)} className="mr-2">
                      <FaExternalLinkAlt className='text-blue-500 hover:text-blue-800 text-lg' />
                    </button>
                    <button onClick={() => handleEdit(site._id)} className="mr-2">
                      <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                    </button>
                    <button onClick={() => handleDelete(site._id)} className="mr-2">
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

  );
}

export default Sites