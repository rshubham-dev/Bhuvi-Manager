import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

axios.defaults.withCredentials = true;

const CreateBill = () => {
  const [sites, setSite] = useState([]);
  const [employees, setEmployee] = useState([]);
  const [bill, setBill] = useState({
    site: '',
    contractor: '',
    client: '',
    createdBy: '',
    billOf: '',
    dateOfPayment: '',
    status: '',
    paidAmount: '',
    dueAmount: '',
  });
  
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const getsites = async () => {
      try {
        const sitesData = await axios.get('/api/v1/site');
        setSite(sitesData.data);
      } catch (error) {
        toast.error(error.message)
      }
    }
    const getemployees = async () => {
      try {
        const id = user._id;
        const employeesData = await axios.get(`/api/v1/employee/${id}`);
        setEmployee(employeesData.data);
      } catch (error) {
        toast.error(error.message)
      }
    }
    const getpaymentSchedule = async () => {
      try {

      } catch (error) {
        toast.error(error.message)
      }
    }
    getsites();
    getemployees();
    getpaymentSchedule();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <main>
      <section className='container mx-auto mt-6 mb-24'>
        <form className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
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
            <label htmlFor="client" className="block text-sm font-medium text-gray-600">
              Choose Client
            </label>
            <select name="client" required className="mt-1 p-2 w-full border rounded-md">
              <option>Client</option>
              {sites.map((site) => (
                <option key={site.client?.id} value={site.client?.id}>
                  {site.client?.name}
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
              {sites.map((site) => (
                <option key={site.contractor?._id} value={site.contractor?._id}>
                  {site.contractor?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor='work'
              className="block text-sm font-medium text-gray-600">
              Work
            </label>
            <select>
              <option>Select Work For Bill</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Create Bill
            </button>
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