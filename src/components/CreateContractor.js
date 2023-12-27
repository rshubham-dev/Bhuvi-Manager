import React, { useState } from 'react';
import { MdOutlineRemoveCircle, MdOutlineAddCircle } from "react-icons/md";
import property from '../config';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const CreateContractor = () => {
  const [contractor, setContractor] = useState({
    name: '',
    phone: [],
    address: {
      street: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
    },
    documents: {
      addhar: '',
      pan: '',
      bank: '',
    },
  });
  const [contact, setContact] = useState(['']);

  const [error, setError] = useState(null);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const updatedContact = [...contact];
      updatedContact[index] = value;
      setContact(updatedContact);
    } else if (name.startsWith('address.')) {
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

  const addPhone = () => {
    setContact((prevContact) => [...prevContact, '']);
  };

  const removePhone = (index) => {
    const updatedContact = [...contact];
    updatedContact.splice(index, 1);
    setContact(updatedContact);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setContractor((prevContractor)=>({
        ...prevContractor,
        phone: [...contact],
      }));
      console.log(contractor);
      const response = await axios.post(`${property.BASE_URL}/api/v1/contractor`, {
        name: contractor.name,
        phone: [...contact],
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
          <label htmlFor='phone' className='block text-gray-900 text-sm font-bold mb-2'>Contact Number</label>
          {contact.map((phone, index) => (
            <div key={index} className='mb-4 w-full'>
              <input
                className='appearance-none border rounded w-800 py-2 px-3 mr-2 text-gray-600 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                name='phone'
                placeholder='Enter Phone Number'
                required
                autoComplete='off'
                value={phone}
                onChange={(e) => handleChange(e, index)}
              />
              {contact.length > 1 && (
                <button
                  className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600 mr-0'
                  type='button'
                  onClick={() => removePhone(index)}
                >
                  <MdOutlineRemoveCircle />
                </button>
              )}
            </div>
          ))}
          <button
            className="w-400 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            type="button"
            onClick={addPhone}>
            <MdOutlineAddCircle />
          </button>
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
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-600">
                Pincode
              </label>
              <input
                type="number"
                id="pincode"
                name="address.pincode"
                value={contractor.address.pincode}
                onChange={handleChange}
                placeholder="Pin code"
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