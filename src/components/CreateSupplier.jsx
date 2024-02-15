import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
axios.defaults.withCredentials = true;

const CreateSupplier = () => {

  const [supplier, setSupplier] = useState({
    name: '',
    contactNo: '',
    whatsapp: '',
    gst: '',
    address: '',
    pan: '',
    bank: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [supplierIdToEdit, setSupplierIdToEdit] = useState(null);

  useEffect(() => {
    const id = new URLSearchParams(location.search).get('supplierId');

    if (id) {
      setSupplierIdToEdit(id);
      fetchSupplierDetails(id);
    }
  }, [location.search]);

  const fetchSupplierDetails = async (id) => {
    try {
      const response = await axios.get(`/api/v1/supplier/${id}`);
      const supplier = response.data;
      setSupplier({
        name: supplier.name,
        contactNo: supplier.contactNo,
        whatsapp: supplier.whatsapp,
        gst: supplier.gst,
        address: supplier.address,
        pan: supplier.pan,
        bank: '',
      });
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  const handleChange = (data) => {
    const { type, value, name } = data.target;
    if (type === 'file') {
      setSupplier((prevSupplier) => ({
        ...prevSupplier,
        [name]: data.target.files[0],
      }));
    } else {
      setSupplier((prevSupplier) => ({
        ...prevSupplier,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(supplier).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    try{
    if (supplierIdToEdit) {
        await axios.put(`/api/v1/supplier/${supplierIdToEdit}`, formData);
        toast.success('User edited successfully');
        navigate(-1)
    } else {
      console.log('Form data submitted:', supplier);
        const response = await axios.post('/api/v1/supplier/create', supplier);
        toast.success(response.data.message);
        navigate(-1)
      }
    } catch (error) {
      console.error('Error creating contractor:', error);
      toast.error('Failed Creating Contractor. Please check your credentials.');
    }
  };

  return (
    <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
    <Header category="Page" title="Create Supplier" />
    <section className='container mx-auto mt-4 mb-16'>
      <form onSubmit={handleSubmit}
        className="max-w-md mx-auto">

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Name:
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
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
            placeholder='Enter Your Contact Number'
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
            placeholder='Enter Your Whatsapp Number'
            onChange={handleChange}
          />
        </div>

        <div className='mb-4'>
          <label htmlFor="address" className="block text-sm font-medium text-gray-600">
            Address
          </label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            placeholder="Address"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className='mb-4'>
          <label htmlFor="gst" className="block text-sm font-medium text-gray-600">
            GST No
          </label>
          <input
            type="text"
            name="gst"
            onChange={handleChange}
            placeholder="GST No."
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className='mb-4'>
          <label htmlFor="pan" className="block text-sm font-medium text-gray-600">
            Pan Card:
          </label>
          <input
            type="text"
            name="pan"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className='mb-4'>
          <label htmlFor="account" className="block text-sm font-medium text-gray-600">
            Account Details:
          </label>
          <input
            type="file"
            name="bank"
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Create Supplier
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </section>
    </div>
  )
}

export default CreateSupplier