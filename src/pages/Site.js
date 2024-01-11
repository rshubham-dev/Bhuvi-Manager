import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";

axios.defaults.baseURL = 'https://jolly-pasca-1c0cf6.netlify.app';
axios.defaults.withCredentials = true;


const Sites = () => {
  const navigate = useNavigate();
  const [sites, setSite] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, [])

  const handleEdit = (siteId) => {
    navigate(`/edit-site?siteId=${siteId}`);
  };

  const handleRedirect = (siteId) => {
    navigate(`/site?siteId=${siteId}`);
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
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-2xl font-bold text-center">Site List</h1>
      <div className=" mb-4 mr-20 text-right">
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
          Add site
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-4">Name</th>
            <th scope="col" className="px-6 py-4">Client</th>
            <th scope="col" className="px-6 py-4">Total Floor</th>
            <th scope="col" className="px-6 py-4">Area</th>
            <th scope="col" className="px-6 py-4">Project Type</th>
            <th scope="col" className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                  {site.name}
              </td>
              <td className="px-6 py-4">{site.client.name}</td>
              <td className="px-6 py-4">{site.floors}</td>
              <td className="px-6 py-4">{site.area}</td>
              <td className="px-6 py-4">{site.projectType}</td>
              <td className="px-6 py-4">
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
        {error && <p className="text-red-500">{error}</p>}
      </table>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}

export default Sites