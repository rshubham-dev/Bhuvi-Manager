import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;
const CreateContractor = () => {
  const [contractor, setContractor] = useState({
    name: '',
    contactNo: '',
    whatsapp: '',
    address: '',
    addhar: '',
    pan: '',
    bank: '',
  });
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContractor((prevContractor) => ({
      ...prevContractor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contractor)
    try {
      const response = await axios.post('/api/v1/contractor', {
        name: contractor.name,
        contactNo: contractor.contactNo,
        whatsapp: contractor.whatsapp,
        address: contractor.address,
        addhar: contractor.addhar,
        pan: contractor.pan,
        bank: contractor.bank,
      });
      toast.success(response.data.message);
      console.log('Form data submitted:', contractor);
      navigate(-1);
    } catch (error) {
      console.log('Error creating contractor:', error);
      toast.error('Failed Creating Contractor. Please check your credentials.');
    }
  };

  return (
    <section className='container mx-auto mt-6 mb-24'>
      <form onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Contractor</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={contractor.name}
            onChange={handleChange}
            placeholder='Name'
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='phone'
            className='block text-sm font-medium text-gray-600'>
            Contact Number:
          </label>
          <input
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500'
            type='text'
            name='contactNo'
            id='contactNo'
            placeholder='Enter Your Contact Number'
            required
            autoComplete='off'
            value={contractor.contactNo}
            onChange={handleChange}
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='whatsapp'
            className='block text-sm font-medium text-gray-600'>
            Whatsapp Number:
          </label>
          <input
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500'
            type='text'
            name='whatsapp'
            id='whatsapp'
            placeholder='Enter Your Whatsapp Number'
            required
            autoComplete='off'
            value={contractor.whatsapp}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-600">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={contractor.address}
            onChange={handleChange}
            placeholder="Address"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Documents</h4>
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label htmlFor="addhar" className="block text-sm font-medium text-gray-600">
                Addhar Card:
              </label>
              <input
                type="file"
                id="addhar"
                name="addhar"
                value={contractor.addhar}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="pan" className="block text-sm font-medium text-gray-600">
                Pan Card:
              </label>
              <input
                type="file"
                id="pan"
                name="pan"
                value={contractor.pan}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="account" className="block text-sm font-medium text-gray-600">
                Account Details:
              </label>
              <input
                type="file"
                id="bank"
                name="bank"
                value={contractor.bank}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          Create Contractor
        </button>
      </form>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </section>
  )
}

export default CreateContractor