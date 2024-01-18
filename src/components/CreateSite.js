import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

axios.defaults.withCredentials = true;

const CreateSite = () => {
  const [site, setSite] = useState({
    name: '',
    client: '',
    siteId: '',
    floors: '',
    area: '',
    incharge: '',
    supervisor: '',
    projectType: '',
    agreement: '',
    address: '',
  })
  const [incharges, setIncharge] = useState([]);
  const [supervisors, setSupervisor] = useState([]);
  const [clients, setClient] = useState([]);
  const projectType = ['Residential', 'Commercial', 'Instutional', 'Government'];
  const floors = ['Ground', 'G+1', 'G+2', 'G+3', 'G+4', 'G+5', 'G+6', 'First', 'Second'];
  const location = useLocation();
  const navigate = useNavigate();
  const [siteIdToEdit, setSiteIdToEdit] = useState(null);

  useEffect(() => {
    const siteId = new URLSearchParams(location.search).get('siteId');
    if (siteId) {
      setSiteIdToEdit(siteId);
      fetchSiteDetails(siteId);
    }
  }, [location.search]);

  const fetchSiteDetails = async (siteId) => {
    try {
      const response = await axios.get(`/api/v1/site/${siteId}`);
      const site = response.data;
      setSite({
        name: site.name,
        client: site.client,
        siteId: site.siteId,
        floors: site.floors,
        area: site.area,
        incharge: site.incharge,
        supervisor: site.supervisor,
        projectType: site.projectType,
        agreement: site.agreement,
        address: site.address,
      })
    } catch (error) {
      toast.error(error.message)
    }

  }

  const handleChange = (e, field) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setSite((prevSite) => ({
        ...prevSite,
        [field]: e.target.files[0],
      }));
    } else {
      setSite((prevSite) => ({
        ...prevSite,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const getemployees = async () => {
      try {
        const userData = await axios.get('/api/v1/user/lists');
        let users = userData.data;
        if (userData) {
          setIncharge(users.filter((user) => user.department === 'Site Incharge'));
          setSupervisor(users.filter((user) => user.department === 'Site Supervisor'));
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    const getClients = async () => {
      try {
        const clientsData = await axios.get('/api/v1/client');
        setClient(clientsData.data);
      } catch (error) {
        toast.error(error.message)
      }
    }

    getClients();
    getemployees();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(site).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      if (siteIdToEdit) {
        await axios.put(`/api/v1/site/${siteIdToEdit}`, formData);
        toast.success('User edited successfully');
      } else {
        const siteData = await axios.post('/api/v1/site/create', formData);
        if(siteData.data){
          console.log(siteData.data);
          toast.success('Site created successfully');
          navigate(-1);
        }
      }
    } catch (error) {
      console.error('Error submitting site data:', error);
      toast.error(error.message || 'An error occurred');
    }
  };

  return (
    <section className="container mx-auto mt-6 mb-24">
      <form className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Site</h2>

        {/* Site Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Site Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={site.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Client */}
        <div className="mb-4">
          <label htmlFor="client" className="block text-sm font-medium text-gray-600">
            Choose Client
          </label>
          <select
            name="client"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleChange}
          >
            <option value=''>Client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>


        {/* Site ID */}
        <div className="mb-4">
          <label htmlFor="siteId" className="block text-sm font-medium text-gray-600">
            Site ID
          </label>
          <input
            type="text"
            name="siteId"
            required
            value={site.siteId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Total Floor */}
        <div className="mb-4">
          <label htmlFor="floor" className="block text-sm font-medium text-gray-600">
            Total Floor
          </label>
          <select
            name="floors"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md">
            <option value=''>Select a Floor</option>
            {floors.map((floor, index) => (
              <option key={index} value={floor}>
                {floor}
              </option>
            ))}
          </select>
        </div>

        {/* Area */}
        <div className="mb-4">
          <label htmlFor="area" className="block text-sm font-medium text-gray-600">
            Area
          </label>
          <input
            type="text"
            name="area"
            value={site.area}
            required
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* PROJECT TYPE */}
        <div className="mb-4">
          <label htmlFor="floor" className="block text-sm font-medium text-gray-600">
            Project Type
          </label>
          <select
            name="projectType"
            required
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md">
            <option>Select a Floor</option>
            {projectType.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Value */}
        {/* <div className="mb-4">
          <label htmlFor="floorNo" className="block text-sm font-medium text-gray-600">
            Floor No
          </label>
          <input
            type="text"
            name="floorNo"
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="unit" className="block text-sm font-medium text-gray-600">
            Unit
          </label>
          <select name="unit" className="mt-1 p-2 w-full border rounded-md">
            <option>Select a Unit</option>
            {units.map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="area" className="block text-sm font-medium text-gray-600">
            Area
          </label>
          <input
            type="number"
            name="area"
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rate" className="block text-sm font-medium text-gray-600">
            Rate
          </label>
          <input
            type="number"
            name="rate"
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div> */}

        {/* Site Incharge */}
        <div className="mb-4">
          <label htmlFor="incharge" className="block text-sm font-medium text-gray-600">
            Site Incharge
          </label>
          <select
            name="incharge"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md">
            <option>Assign an incharge</option>
            {incharges.map((incharge) => (
              <option key={incharge._id} value={incharge._id}>
                {incharge.userName}
              </option>
            ))}
          </select>
        </div>

        {/* Site Supervisor */}
        <div className="mb-4">
          <label htmlFor="supervisor" className="block text-sm font-medium text-gray-600">
            Site Supervisor
          </label>
          <select name="supervisor"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md">
            <option>Assign a supervisor</option>
            {supervisors.map((supervisor) => (
              <option key={supervisor._id} value={supervisor._id}>
                {supervisor.userName}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-600">
            Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={site.address}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Agreement */}
        <div className="mb-4">
          <label htmlFor="agreement" className="block text-sm font-medium text-gray-600">
            Agreement
          </label>
          <input
            type="file"
            name="agreement"
            onChange={(e) => handleChange(e, 'agreement')}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </div>

      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </section>
  )
}

export default CreateSite