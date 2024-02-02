import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineRemoveCircle, MdOutlineAddCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const CreateEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        password: "",
        contactNo: '',
        whatsapp: '',
        employeeId: "",
        joinDate: "",
        birthdate: "",
        address: "",
        addhar: "",
        pan: "",
        cv: "",
        offerletter: "",
        bank: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
      useEffect(() => {
        const getUsers = async () => {
          try {
            const userData = await axios.get('/api/v1/user/lists');
            let users = userData.data;
            if(userData){
              setUsers(users.filter((user)=> user.role === 'Employee'));
            }
          } catch (error) {
            toast.error(error.message);
          }
        }
        getUsers();
      }, [])

    const inputData = (data, field) => {
        const { name, value, type } = data.target;
        if (type === 'file') {
            setEmployee((prevEmployee) => ({
                ...prevEmployee,
                [field]: data.target.files[0],
            }));
        } else {
            setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
        }
    };

    const formSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(employee).forEach(([key, value]) => {
            if (value instanceof File) {
                formData.append(key, value);
            } else {
                formData.append(key, value);
            }
        });

        try {
            console.log(employee);
            const response = await axios.post('/api/v1/employee/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
                },
            });
            if (response.data) {
                console.log(response.data);
                toast.success('Employee Created successfully!');
                navigate(-1)
            }
        } catch (error) {
            toast.error(error.message);
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

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                            Full Name
                        </label>
                        <select
                            name="name"
                            value={employee.name}
                            onChange={inputData}
                            required
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500">
                            <option>Employee</option>
                            {users.map((user) => (
                                <option key={user._id} value={user.userName}>
                                    {user.userName}
                                </option>
                            ))}
                        </select>
                        {/* <input
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='text'
                            name='name'
                            placeholder='Enter Your Name here'
                            autoComplete='off'
                            value={employee.name}
                            onChange={inputData}
                        /> */}
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
                            autoComplete='off'
                            value={employee.email}
                            onChange={inputData}
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
                            autoComplete='off'
                            value={employee.contactNo}
                            onChange={inputData}
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
                            autoComplete='off'
                            value={employee.password}
                            onChange={inputData}
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Address"
                            value={employee.address}
                            onChange={inputData}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        />
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
                                onChange={(e) => inputData(e, 'addhar')}
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='pan'
                                className='block text-gray-700 text-sm font-bold mb-2'>Pan Card:</label>
                            <input
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='file'
                                name='pan'
                                onChange={(e) => inputData(e, 'pan')}
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='cv'
                                className='block text-gray-700 text-sm font-bold mb-2'>CV:</label>
                            <input
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='file'
                                name='cv'
                                onChange={(e) => inputData(e, 'cv')}
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='offerletter'
                                className='block text-gray-700 text-sm font-bold mb-2'>Offer Letter:</label>
                            <input
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='file'
                                name='offerletter'
                                onChange={(e) => inputData(e, 'offerletter')}
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='account'
                                className='block text-gray-700 text-sm font-bold mb-2'>Bank Detail:</label>
                            <input
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='file'
                                name='bank'
                                onChange={(e) => inputData(e, 'bank')}
                            />
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
                            autoComplete='off'
                            value={employee.birthdate}
                            onChange={inputData}
                        />
                    </div>

                    <button
                        type='submit'
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Create
                    </button>

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