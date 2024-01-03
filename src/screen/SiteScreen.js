import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation} from 'react-router-dom';

const SiteScreen = () => {
  const [site, setSiteData] = useState({});
  const location = useLocation();
  console.log(location); 

  useEffect(() => {
    console.log('location.search:', location.search);
    const id = new URLSearchParams(location.search).get('siteId');
    console.log('siteId:', id);
    if (id) {
      fetchSiteDetails(id);
    }
  }, [location.search]);

  const fetchSiteDetails = async (id) => {
    try {
      console.log(`before res: ${id}`)
      const response = await axios.get(`/api/v1/site/${id}`);
      console.log(response.data)
      setSiteData(response.data);
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };
  return (
    <>
<div className="bg-white shadow-md rounded px-12 py-8 mb-4 h-screen">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Site Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 ">
        <div className="mb-4 border-b-2">
          <label className="block text-l font-medium text-gray-600">Name</label>
          <p className="text-lg text-gray-800">{site.name}</p>
        </div>
        <div className="mb-4 border-b-2">
          <label className="block text-l font-medium text-gray-600">Client</label>
          <p className="text-lg text-gray-800">{site.client}</p>
        </div>
        <div className="mb-4 border-b-2">
          <label className="block text-l font-medium text-gray-600">Project Type</label>
          <p className="text-lg text-gray-800">{site.projectType}</p>
        </div>
        <div className="mb-4 border-b-2">
          <label className="block text-l font-medium text-gray-600">Total Floor</label>
          <p className="text-lg text-gray-800">{site.floors}</p>
        </div>
        <div className="mb-4 border-b-2">
          <label className="block text-l font-medium text-gray-600">Site Incharge</label>
          <p className="text-lg text-gray-800">{site.incharge}</p>
        </div>
        <div className="mb-4 border-b-2">
          <label className="block text-l font-medium text-gray-600">Site Supervisor</label>
          <p className="text-lg text-gray-800">{site.supervisor}</p>
        </div>
        <div className="mb-4 border-b-2">
          <label className="block text-l font-medium text-gray-600">Site Address</label>
          <p className="text-lg text-gray-800"></p>
        </div>
        <div className="mb-4 border-b-2">
          <label className="block text-l font-medium text-gray-600">Agreement</label>
              <span className="truncate font-medium text-gray-800">{site.agreement}</span>
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Download
              </a>
        </div>
      </div>
    </div>
        </>
  )
}

export default SiteScreen

