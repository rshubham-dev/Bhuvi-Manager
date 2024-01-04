import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineRemoveCircle, MdOutlineAddCircle } from "react-icons/md";

const CreateEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        password: "",
        contactNo: '',
        whatsapp: '',
        employeeId: "",
        avatar: "",
        joinDate: "",
        birthdate: "",
    });
    // address: {
    //     street: "",
    //     city: "",
    //     district: "",
    //     state: "",
    //     pincode: "",
    // },
    // addhar: "",
    // pan: "",
    // cv: "",
    // offerletter: "",
    // bank: "",
    // certificates: [],

    // const [location, setLocation] = useState({
    //     street: "",
    //     city: "",
    //     district: "",
    //     state: "",
    //     pincode: "",
    // });

    const [error, setError] = useState(null);

    const inputData = (data) => {
        const { name, value } = data.target;
        setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(employee)
             const response = await axios.post('/api/v1/employee/create', employee);
            console.log(response.data);
            console.log(response.data.error);
            toast.success('Employee Created successful!');
        } catch (error) {
            toast.error(error.message)
            setError(error.message);
        }
    };

    return (
        <main>
            <section className='flex justify-center items-center mb-12'>
                <form
                    className='bg-white shadow-md rounded px-8 pt-4 pb-4 mb-12 w-full max-w-md'
                    onSubmit={formSubmit}
                >
                    <h2 className='text-2xl font-bold mb-6 text-center'>Create Employee</h2>

                    {/* Group Personal Information */}
                    <div className='mb-4'>
                        <label htmlFor='avatar'
                            className='block text-gray-700 text-sm font-bold mb-2'>Avatar:</label>
                        <input
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='file'
                            name='avatar'
                            onChange={inputData}
                        />
                    </div>

                    
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                            Full Name
                        </label>
                        <input
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='text'
                            name='name'
                            placeholder='Enter Your Name here'
                            required
                            autoComplete='off'
                            value={employee.name}
                            onChange={inputData}
                        />
                    </div>


                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='email'
                            name='email'
                            placeholder='Enter Your Email here'
                            required
                            autoComplete='off'
                            value={employee.email}
                            onChange={inputData}
                        />
                    </div>

                    {/* Contact no */}
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
                            value={employee.contactNo}
                            onChange={inputData}
                        />
                    </div>

                    {/* Whatsapp No */}
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
                            value={employee.whatsapp}
                            onChange={inputData}
                        />
                    </div>


                    <div className='mb-4'>
                        <label htmlFor='employeeId' className='block text-gray-700 text-sm font-bold mb-2'>Employee ID</label>
                        <input
                            type='text'
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            name='employeeId'
                            placeholder='Enter Your Employee ID here'
                            required
                            autoComplete='off'
                            value={employee.employeeId}
                            onChange={inputData}
                        />
                    </div>


                    <div className='mb-4'>
                        <label htmlFor='Password' className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                        <input
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='password'
                            name='password'
                            placeholder='Enter Your Password here'
                            required
                            autoComplete='off'
                            value={employee.password}
                            onChange={inputData}
                        />
                    </div>


                    {/* <div className='mb-4'> 
                        <h4 className='mb-2'>Address</h4>
                        <div className='mb-4'>
                            <label htmlFor="street" 
                            className='block text-gray-700 text-sm font-bold mb-2'>Street:</label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                placeholder='Enter Street here'
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                value={location.street}
                                onChange={inputData}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="city"
                             className='block text-gray-700 text-sm font-bold mb-2'>City:</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder='Enter Your City here'
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                value={location.city}
                                onChange={inputData}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="district" 
                            className='block text-gray-700 text-sm font-bold mb-2'>District:</label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                placeholder='Enter District here'
                                value={location.district}
                                onChange={inputData}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="state" 
                            className='block text-gray-700 text-sm font-bold mb-2'>State:</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                placeholder='Enter Your State here'
                                value={location.state}
                                onChange={inputData}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="pincode" className='block text-gray-700 text-sm font-bold mb-2'>Pincode:</label>
                            <input
                                type="number"
                                id="pincode"
                                name="pincode"
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                placeholder='Enter Pin code here'
                                value={location.pincode}
                                onChange={inputData}
                            />
                        </div>
                    </div> */}
                    {/* <div className='mb-4'>
                        <h4 className='mb-2'>Document Name</h4>
                        <div className='mb-4'>
                            <label htmlFor='addhar' 
                            className='block text-gray-700 text-sm font-bold mb-2'>Addhar Card:</label>
                            <input
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='file'
                                name='addhar'
                                onChange={inputData}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='pan' 
                            className='block text-gray-700 text-sm font-bold mb-2'>Pan Card:</label>
                            <input
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='file'
                                name='pan'
                                onChange={inputData}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='cv' 
                            className='block text-gray-700 text-sm font-bold mb-2'>CV:</label>
                            <input
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='file'
                                name='cv'
                                onChange={inputData}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='offerletter' 
                            className='block text-gray-700 text-sm font-bold mb-2'>Offer Letter:</label>
                            <input
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='file'
                                name='offerletter'
                                onChange={inputData}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='account' 
                            className='block text-gray-700 text-sm font-bold mb-2'>Bank Detail:</label>
                            <input
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='file'
                                name='bank'
                                onChange={inputData}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='certificates' className='block text-gray-700 text-sm font-bold mb-2'>Certificates:</label>
                            <input
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='file'
                                name='certificates'
                                onChange={inputData} />
                             {employee.certificates.map((certificate, index) => (
                                <div key={index}>
                                    Certificate {index + 1}: {certificate ? certificate.name : ''}
                                </div>
                            ))} 
                        </div> 
                    </div> */}
                    <div className='mb-4'>
                        <label
                            htmlFor='joining'
                            className='block text-gray-700 text-sm font-bold mb-2'>
                            Joining Date
                        </label>
                        <input
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='date'
                            name='joinDate'
                            placeholder='Enter Your Joining Date'
                            required
                            autoComplete='off'
                            value={employee.joinDate}
                            onChange={inputData}
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='birthdate' className='block text-gray-700 text-sm font-bold mb-2'>DOB</label>
                        <input
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='date'
                            name='birthdate'
                            placeholder='Enter Your Date of Birth'
                            required
                            autoComplete='off'
                            value={employee.birthdate}
                            onChange={inputData}
                        />
                    </div>
                    <button
                        type='submit'
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Create</button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </form>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </section>
        </main>
    )
}


export default CreateEmployee

const SiteScreen = () => {
  const [site, setSiteData] = useState({});
  const [client, setClient] = useState({});
  const location = useLocation();

  useEffect(() => {
    const id = new URLSearchParams(location.search).get('siteId');
    if (id) {
      fetchSiteDetails(id);
    }
  }, [location.search]);

  const fetchSiteDetails = async (id) => {
    try {
      const response = await axios.get(`/api/v1/site/${id}`);
      setSiteData(response.data);
    } catch (error) {
      console.log('Error fetching site details:', error);
    }
  };
  const fetchClientDetail = async () => {
    try {
      const clientId = site.client;
      console.log(site.client);

      const clientData = await axios.get(`/api/v1/client/${clientId}`);
      console.log(clientData.data)
      console.log(clientData)
      setClient(clientData.data);
    } catch (error) {
      console.log('Error fetching site details:', error);
    }
  };
  fetchClientDetail();

  return (
    <>
      <section className='bg-white shadow-md rounded px-14 py-12 mb-16 h-full'>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">{site.name} Site Details</h3>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Site Id</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{site.siteId}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Client</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{client.name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Project Type</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{site.projectType}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Total Floor</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{site.floors}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Site Incharge</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{site.incharge}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Site Supervisor</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{site.supervisor}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Agreement</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">{site.agreement}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <Link to={'#'} className="font-medium text-indigo-600 hover:text-indigo-500">
                        Download
                      </Link>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  )
}

export default SiteScreen

