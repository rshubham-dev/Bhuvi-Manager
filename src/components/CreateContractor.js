import React, { useState } from 'react';
import { MdOutlineRemoveCircle, MdOutlineAddCircle } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const CreateContractor = () => {
  const [contractor, setContractor] = useState({
    name: '',
    contactNo: '',
    whatsapp: '',
    address: '',
    documents: {
      addhar: '',
      pan: '',
      bank: '',
    },
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setContractor((prevContractor) => ({
        ...prevContractor,
        address: {
          ...prevContractor.address,
          [addressField]: value,
        },
      }));
    } else if (name.startsWith('documents.')) {
      const documentField = name.split('.')[1];
      setContractor((prevContractor) => ({
        ...prevContractor,
        documents: {
          ...prevContractor.documents,
          [documentField]: value,
        },
      }));
    } else {
      setContractor((prevContractor) => ({
        ...prevContractor,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contractor)
    try {
      const response = await axios.post('/api/v1/contractor', {
        name: contractor.name,
        contactNo: contractor.contactNo,
        whatsapp: contractor.whatsapp,
        address: {
          street: contractor.address.street,
          city: contractor.address.city,
          district: contractor.address.district,
          state: contractor.address.state,
          pincode: contractor.address.pincode,
        },
        documents: {
          addhar: contractor.documents.addhar,
          pan: contractor.documents.pan,
          bank: contractor.documents.bank,
        },
      });
      toast.success(response.data.message);
      console.log('Form data submitted:', contractor);
    } catch (error) {
      console.error('Error creating contractor:', error);
      toast.error('Failed Creating Contractor. Please check your credentials.');
      setError('Failed Creating Contractor. Please check your credentials.');
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
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Address</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-600">
                Street
              </label>
              <input
                type="text"
                id="street"
                name="address.street"
                value={contractor.address.street}
                onChange={handleChange}
                placeholder="Street"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-600">
                City
              </label>
              <input
                type="text"
                id="city"
                name="address.city"
                value={contractor.address.city}
                onChange={handleChange}
                placeholder="City"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-600">
                District
              </label>
              <input
                type="text"
                id="district"
                name="address.district"
                value={contractor.address.district}
                onChange={handleChange}
                placeholder="District"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-600">
                State
              </label>
              <input
                type="text"
                id="state"
                name="address.state"
                value={contractor.address.state}
                onChange={handleChange}
                placeholder="State"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
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
                name="documents.addhar"
                value={contractor.documents.addhar}
                onChange={handleChange}
                placeholder="Street"
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
                name="documents.pan"
                value={contractor.documents.pan}
                onChange={handleChange}
                placeholder="City"
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
                name="documents.bank"
                value={contractor.address.bank}
                onChange={handleChange}
                placeholder="District"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Create Contractor
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </section>
  )
}

export default CreateContractor