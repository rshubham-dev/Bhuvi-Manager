import React, { useState } from 'react';
import { MdOutlineRemoveCircle, MdOutlineAddCircle } from "react-icons/md";


const CreateClient = () => {
  const [client, setClient] = useState({
    name: '',
    email: '',
    password: '',
    phone: [''],
    address: {
      street: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
    },
  });

  const handleChange = (e, index) => {
    const [name, value] = e.target;
    if (name === "phone") {
      const updatedPhones = [...client.phone];
      updatedPhones[index] = value;
      setClient((prevClient) => ({ ...prevClient, phone: updatedPhones }));
    } else {
      setClient({ ...client, [name]: value });
    }
  };

  const addPhone = () => {
    setClient((client) => ({ ...client, phone: [...client.phone, ""] }));
  };

  const removePhone = (index) => {
    const updatedPhones = [...client.phone];
    updatedPhones.splice(index, 1);
    setClient((client) => ({ ...client, phone: updatedPhones }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

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
          <label htmlFor='phone' className='block text-gray-900 text-sm font-bold mb-2'>Contact Number</label>
          {client.phone.map((tel, index) => (
            <div key={index} className='mb-4 w-full'>
              <input
                className='appearance-none border rounded w-800 py-2 px-3 mr-2 text-gray-600 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                name='phone'
                placeholder='Enter Your Phone Number'
                required
                autoComplete='off'
                value={tel}
                onChange={(e) => inputData(e, index)}
              />
              {client.phone.length > 1 && (
                <button
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 mr-0"
                  type="button"
                  onClick={() => removePhone(index)}>
                  <MdOutlineRemoveCircle />
                </button>)}
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
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-600">
                Pincode
              </label>
              <input
                type="number"
                id="pincode"
                name="pincode"
                placeholder="Pin code"
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
    </section>
  );
};

export default CreateClient;
