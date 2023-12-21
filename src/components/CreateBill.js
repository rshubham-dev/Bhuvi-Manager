import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import property from '../config.js';

const CreateBill = () => {
  const [sites, setSite] = useState([]);
  const [contractors, setContractor] = useState([]);
  const [employees, setEmployee] = useState([]);
  const [bill, setBill] = useState({});

  useEffect(() => {
    const getsites = async ()=>{
      try {
        const sitesData = await axios.get(`${property.BASE_URL}/api/v1/site`);
        setSite(sitesData.data);
      } catch (error) {
        toast.error(error.message)
      }
    }
    const getcontractors = async () => {
      try {
        const contractorsData = await axios.get(`${property.BASE_URL}/api/v1/contractor`);
        setContractor(contractorsData.data);
      } catch (error) {
        toast.error(error.message)
      }
    }
    const getemployees = async () => {
      try {
        const employeesData = await axios.get(`${property.BASE_URL}/api/v1/employee`);
        setEmployee(employeesData.data);
      } catch (error) {
        toast.error(error.message)
      }
    }

    getsites();
    getcontractors();
    getemployees();
  },[])
  console.log(sites);
  
  return (
    <main>
      <section className='container mx-auto mt-6 mb-24'>
        <form className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Bill</h1>
          <div className="mb-4">
            <label htmlFor='site' className="block text-sm font-medium text-gray-600">Site</label>
            <select 
            name='site' 
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option>Site</option>
              {sites.map((site) => (
                <option key={site._id} value={site._id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label 
            htmlFor='contractor'
            className="block text-sm font-medium text-gray-600"
            >
              Contractor
            </label>
            <select 
            name='contractor'
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option>Contractor</option>
              {contractors.map((contractor) => (
                <option key={contractor._id} value={contractor._id}>
                  {contractor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label 
            htmlFor='creater'
            className="block text-sm font-medium text-gray-600"
            >Bill By</label>
            <select 
            name='createdBy'
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option>Bill by</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label 
            htmlFor='billNo'
            className="block text-sm font-medium text-gray-600"
            >Bill No</label>
            <input
            type='string'
            name='billNo'
            required
            autoComplete='false'
            placeholder='Enter Bill No Here'
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label 
            htmlFor='date'
            className="block text-sm font-medium text-gray-600"
            >Date</label>
            <input
            type='date'
            name='date'
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label 
            htmlFor=''
            className="block text-sm font-medium text-gray-600"
            ></label>
          </div>
        </form>
      </section>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </main>
  )
}

export default CreateBill