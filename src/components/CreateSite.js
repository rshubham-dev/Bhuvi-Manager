import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
axios.defaults.baseURL = 'https://bhuvi-management-server.onrender.com';
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
    address: {
      street: '',
      city: '',
      district: '',
      state: '',
    },
  })
  // value: [{
  //   work: '',
  //   area: '',
  //   rate: '',
  //   unit: '',
  // }],
  const [employees, setEmployee] = useState([]);
  const [clients, setClient] = useState([]);
  const projectType = ['Residential', 'Commercial', 'Instutional', 'Government'];
  const floors = ['Ground', 'G+1', 'G+2', 'G+3', 'G+4', 'G+5', 'G+6'];
  const location = useLocation();
  const navigate = useNavigate();
  const [siteIdToEdit, setSiteIdToEdit] = useState(null);
  const units = ['SQFT', 'RFT', 'LUMSUM', 'NOS', 'FIXED', 'RMT', 'SQMT', 'CUM'];

  useEffect(() => {
    const siteId = new URLSearchParams(location.search).get('siteId');
    if (siteId) {
      setSiteIdToEdit(siteId);
      fetchSiteDetails(siteId);
    }
  }, [location.search]);

  const fetchSiteDetails = async(siteId)=>{
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
        address: {
          street: site.address.street,
          city: site.address.city,
          district: site.address.district,
          state: site.address.state,
        }
      })
    } catch (error) {
      toast.error(error.message)
    }

  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setSite((prevSite) => ({
        ...prevSite,
        address: {
          ...prevSite.address,
          [addressField]: value,
        },
      }));
    }else{
      setSite((prevSite) => ({
        ...prevSite,
        [name]: value,
      }));
    }
  };

  useEffect(() => {

    const getemployees = async () => {
      try {
        const employeesData = await axios.get('/api/v1/employee');
        setEmployee(employeesData.data);
      } catch (error) {
        toast.error(error.message)
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
    try {
      if (siteIdToEdit) {
        await axios.put(`/api/v1/site/${siteIdToEdit}`, site);
        toast.success('User edited successfully');
      } else {
        console.log(site)
        const siteData = await axios.post('/api/v1/site', {
          name: site.name,
          client: site.client,
          siteId: site.siteId,
          floors: site.floors,
          area: site.area,
          incharge: site.incharge,
          supervisor: site.supervisor,
          projectType: site.projectType,
          agreement: site.agreement,
          address: {
            street: site.address.street,
            city: site.address.city,
            district: site.address.district,
            state: site.address.state,
          }
        });
        console.log(siteData);
        toast.success('Site created successfully');
        navigate('/sites');
      }
    } catch (error) {
      console.log('Error submitting site data:', error.message);
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
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
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
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Address</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-600">
                Street
              </label>
              <input
                type="text"
                id="address.street"
                name="address.street"
                placeholder="Street"
                value={site.address.street}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-600">
                City
              </label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                value={site.address.city}
                placeholder="City"
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-600">
                District
              </label>
              <input
                type="text"
                id="address.district"
                name="address.district"
                value={site.address.district}
                placeholder="District"
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-600">
                State
              </label>
              <input
                type="text"
                id="address.state"
                name="address.state"
                value={site.address.state}
                placeholder="State"
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Agreement */}
        <div className="mb-4">
          <label htmlFor="agreement" className="block text-sm font-medium text-gray-600">
            Agreement
          </label>
          <input 
          type="file" 
          name="agreement" 
          onChange={handleChange}
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