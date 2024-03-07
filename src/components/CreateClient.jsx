import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineRemoveCircle, MdOutlineAddCircle } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
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
  const [users, setUsers] = useState([]);
  const [clientId, setClientId] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name:''
  })
  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await axios.get('/api/v1/user/lists');
        let users = userData.data;
        if (userData) {
          setUsers(users.filter((user) => user.role === 'Client'));
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    getUsers();
    if (id) {
      setClientId(id)
      fetchClient(id)
    }
  }, [])

  const fetchClient = async (id) => {
    try {
      const clientData = await axios.get(`/api/v1/client/${id}`);
      console.log(clientData.data)
      setData({
        name: clientData.data?.name
      })
      setClient({
        name: clientData.data?.userId,
        email: clientData.data?.email,
        password: '',
        contactNo: clientData.data?.contactNo,
        whatsapp: clientData.data?.whatsapp,
        address: {
          street: clientData.data?.address.street,
          city: clientData.data?.address.city,
          district: clientData.data?.address.district,
          state: clientData.data?.address.state,
        },
      })
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setClient((prevclient) => ({
        ...prevclient,
        address: {
          ...prevclient.address,
          [addressField]: value,
        },
      }));
    } else {
      setClient({ ...client, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Before data submitted:', client);
    try {
      if(clientId){
        const response = await axios.put(`/api/v1/client/${clientId}`, client);
        if (response.data) {
          toast.success(response.data.message)
          console.log(response.data)
          navigate(-1)
        }
      } else {
        const response = await axios.post('/api/v1/client', client);
        if (response.data) {
          toast.success(response.data.message)
          console.log(response.data)
          navigate(-1)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
      <Header category="Page" title="Create Client" />
      <section className='container mx-auto mt-4 mb-16'>
        <form onSubmit={handleSubmit}
          className="max-w-md mx-auto">

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name:
            </label>
            <select
              name="name"
              value={client.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500">
              <option>{clientId ? data.name : 'Client'}</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.userName}
                </option>
              ))}
            </select>

            {/* <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          /> */}
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
              placeholder="Email"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
          </div>

          <div className="mb-4">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={client.password}
              onChange={handleChange}
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
              type='tel'
              name='contactNo'
              id='contactNo'
              placeholder='Enter Your Contact Number'
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
              type='tel'
              name='whatsapp'
              id='whatsapp'
              placeholder='Enter Your Whatsapp Number'
              autoComplete='off'
              value={client.whatsapp}
              onChange={handleChange}
            />
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
                  value={client.address.street}
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
                  value={client.address.city}
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
                  value={client.address.district}
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
                  value={client.address.state}
                  placeholder="State"
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

            </div>
          </div>


          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            {clientId ? 'Update' : 'Create' } Client
          </button>
        </form>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </section>
    </div>
  );
};

export default CreateClient;
