import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineRemoveCircle, MdOutlineAddCircle } from "react-icons/md";
axios.defaults.baseURL = 'https://bhuvi-management-server.onrender.com';
axios.defaults.withCredentials = true;

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
        address: {
            street: "",
            city: "",
            district: "",
            state: "",
        },
    });
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
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setEmployee((prevEmployee) => ({
                ...prevEmployee,
                address: {
                    ...prevEmployee.address,
                    [addressField]: value,
                },
            }));
        } else {
            setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
        }
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
                                    value={employee.address.street}
                                    onChange={inputData}
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
                                    value={employee.address.city}
                                    placeholder="City"
                                    onChange={inputData}
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
                                    value={employee.address.district}
                                    placeholder="District"
                                    onChange={inputData}
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
                                    value={employee.address.state}
                                    placeholder="State"
                                    onChange={inputData}
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

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