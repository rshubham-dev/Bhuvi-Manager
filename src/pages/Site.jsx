import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
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
<section className="overflow-x-auto shadow-md sm:rounded-lg mb-8 mt-4">
  {/* <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">Site List</h1> */}
  <div className="m-4 flex justify-between">
    <h2 className="text-lg sm:text-xl text-green-600 mb-2 sm:mb-0 sm:mr-4">Total Sites: {sites?.length}</h2>
    {user.role === 'Admin' && (
      <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-2 sm:px-4 sm:py-2">
        Add Site
      </button>
    )}
  </div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-4 sm:px-6 py-3 sm:py-4">Name</th>
        <th scope="col" className="px-4 sm:px-6 py-3 sm:py-4">Client</th>
        <th scope="col" className="px-4 sm:px-6 py-3 sm:py-4">Total Floor</th>
        <th scope="col" className="px-4 sm:px-6 py-3 sm:py-4">Area</th>
        <th scope="col" className="px-4 sm:px-6 py-3 sm:py-4">Project Type</th>
        <th scope="col" className="px-4 sm:px-6 py-3 sm:py-4">Actions</th>
      </tr>
    </thead>
    <tbody>
      {sites?.map((site) => (
        <tr key={site._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="px-4 sm:px-6 py-4">
            {site.name}
          </td>
          <td className="px-4 sm:px-6 py-4">{site.client.name}</td>
          <td className="px-4 sm:px-6 py-4">{site.floors}</td>
          <td className="px-4 sm:px-6 py-4">{site.area}</td>
          <td className="px-4 sm:px-6 py-4">{site.projectType}</td>
          <td className="px-4 sm:px-6 py-4">
            <button
              onClick={() => handleRedirect(site._id)}
              className="bg-blue-500 text-white px-2 py-1 mr-2"
            >
              <FaExternalLinkAlt />
            </button>
            <button
              onClick={() => handleEdit(site._id)}
              className="bg-blue-500 text-white px-2 py-1 mr-2"
            >
              <GrEdit />
            </button>
            <button
              onClick={() => handleDelete(site._id)}
              className="bg-red-500 text-white px-2 py-1 mr-2"
            >
              <MdDelete />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {error && <p className="text-red-500">{error}</p>}
  <Toaster
    position="top-right"
    reverseOrder={false}
  />
</section>

  );
}

export default Sites