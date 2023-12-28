import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineRemoveCircle, MdOutlineAddCircle } from "react-icons/md";

const CreateEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: [""],
        employeeId: "",
        address: {
            street: "",
            city: "",
            district: "",
            state: "",
            pincode: "",
        },
        addhar: "",
        pan: "",
        cv: "",
        offerletter: "",
        bank: "",
        certificates: [],
        joinDate: "",
        department: "",
        avatar: "",
        birthdate: "",
        salary: "",
        site: "",
        role: "",
    });
    const [department, setDepartment] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const inputData = (data, index) => {
        const { name, value } = data.target;
        if (name === "phone") {
            const updatedPhones = [...employee.phone];
            updatedPhones[index] = value;
            setEmployee((prevEmployee) => ({ ...prevEmployee, phone: updatedPhones }));
        } else {
            setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
        }
    }

    const addPhone = () => {
        setEmployee((prevEmployee) => ({ ...prevEmployee, phone: [...prevEmployee.phone, ""] }));
    };

    const removePhone = (index) => {
        const updatedPhones = [...employee.phone];
        updatedPhones.splice(index, 1);
        setEmployee((prevEmployee) => ({ ...prevEmployee, phone: updatedPhones }));
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/employee/create', employee);
            console.log(response.data);
            toast.success('Registration successful!');
            setDepartment(response.data.user.department);
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error.message)
            toast.error('An error occurred while registering. Please try again.');
        }
    };
    useEffect(() => {
        const handleNavigation = () => {
            switch (department) {
                case 'Admin':
                    navigate('/admin');
                    break;
                case 'Client':
                    navigate('/client');
                    break;
                case 'Employee':
                    navigate('/create-employee');
                    break;
                default:
                    console.log("Not exists");
                    break;
            }
        };
        if (department) {
            handleNavigation();
        }
    }, [department, navigate]);

    return (
        <main>
            <section className='flex justify-center items-center '>
                <form
                    className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md'
                    onSubmit={formSubmit}
                >
                    <h2 className='text-2xl font-bold mb-6 text-center'>Create Employee</h2>

                    {/* Group Personal Information */}
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
                    <div className='mb-4'>
                        <label htmlFor='phone' className='block text-gray-900 text-sm font-bold mb-2'>Contact Number</label>
                        {employee.phone.map((tel, index) => (
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
                                {employee.phone.length > 1 && (
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
                    <div className='mb-4'>
                        <label htmlFor='Password' className='block text-gray-700 text-sm font-bold mb-2'>Confirm Password</label>
                        <input
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm Your Password'
                            required
                            autoComplete='off'
                            value={employee.confirmPassword}
                            onChange={inputData}
                        />
                    </div>
                    {/* <div>
                        <h4>Address</h4>
                        <div>
                            <label htmlFor="street" className='block text-gray-700 text-sm font-bold mb-2'>Street:</label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                value={employee.address.street}
                                onChange={inputData}
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className='block text-gray-700 text-sm font-bold mb-2'>City:</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                onChange={inputData}
                                value={employee.address.city}
                            />
                        </div>
                        <div>
                            <label htmlFor="district" className='block text-gray-700 text-sm font-bold mb-2'>District:</label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                placeholder='Enter District here'
                                value={employee.address.district}
                                onChange={inputData}
                            />
                        </div>
                        <div>
                            <label htmlFor="state" className='block text-gray-700 text-sm font-bold mb-2'>State:</label>
                            <select onChange={inputData}>
                                <option>Select your State</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pincode" className='block text-gray-700 text-sm font-bold mb-2'>Pincode:</label>
                            <input
                                type="number"
                                id="pincode"
                                name="pincode"
                                placeholder='Enter Pin code here'
                                value={employee.address.pincode}
                                onChange={inputData}
                            />
                        </div>
                    </div> */}
                    <div className='mb-4'>
                        <h4>Document Name</h4>
                        <div>
                            <label htmlFor='addhar' className='block text-gray-700 text-sm font-bold mb-2'>Addhar Card:</label>
                            <input
                                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='file'
                                name='addhar'
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
                            {/* store the document in seprate state and asign valuse of that array to orignal one */}
                            {employee.certificates.map((certificate, index) => (
                                <div key={index}>
                                    Certificate {index + 1}: {certificate ? certificate.name : ''}
                                </div>
                            ))}

                        </div>
                    </div>
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
                    {/* <div>
                        <label htmlFor='department' className='block text-gray-700 text-sm font-bold mb-2'>Department</label>
                        <select onChange={inputData} value={employee.department} name='department'>
                            <option value='site'>Site</option>
                            <option value='design'>Design</option>
                        </select>
                    </div> */}
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
                </form>
                {error && <p className="text-red-500">{error}</p>}
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </section>
        </main>
    )
}


export default CreateEmployee