import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineRemoveCircle, MdOutlineAddCircle } from "react-icons/md";
axios.defaults.baseURL = 'https://bhuvi-management-server.onrender.com';
axios.defaults.withCredentials = true;

const CreateClient = () => {
  const [client, setClient] = useState({
    name: '',
    email: '',
    password: '',
    contactNo: '',
    whatsapp: '',
    address: {
      street: "",
      city: "",
      district: "",
      state: "",
    },
  });

  const handleChange = (e, index) => {
    const [name, value] = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/client', client);
      toast(response.data.message)
      console.log(response.data)
    } catch (error) {
      toast.error(error.message)
    }

    console.log('Form data submitted:', client);
  };

  return (
    <section className='container mx-auto mt-6 mb-24'>
      <form onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Client</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="UserEmail"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={client.password}
            onChange={handleChange}
            required
            minLength={8}
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
            value={client.contactNo}
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
            value={client.whatsapp}
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
                name="street"
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
                name="city"
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
                name="district"
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
                name="state"
                placeholder="State"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Create Client
        </button>
      </form>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </section>
  );
};

export default CreateClient;
