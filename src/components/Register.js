import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName: "",
        userMail: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });
    const [error, setError] = useState(null);

    const inputData = (data) => {
        const { name, value } = data.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        if(user.password === user.confirmPassword){
            try {
                const response = await axios.post('/api/v1/user/register', {
                    userName:user.userName,
                    userMail: user.userMail,
                    password: user.password,
                    phone: user.phone,
                });
                console.log(response.data);
                toast.success('Registration successful!');
                navigate('/login');
            } catch (error) {
                console.error('Error submitting form:', error);
                toast.error(error.message)
                toast.error('An error occurred while registering. Please try again.');
            }
        } else{
            toast.error('Please Confirm your password');
        }
    };

    return (
        <main>
            <section className='flex justify-center items-center mb-16'>
                <form
                    className='bg-white shadow-md rounded px-8 pt-4 pb-6 mb-6 w-full max-w-md'
                    onSubmit={formSubmit}
                >
                    <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                            Full Name
                        </label>
                        <input
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='text'
                            name='userName'
                            placeholder='Enter Your Name here'
                            required
                            autoComplete='off'
                            value={user.userName}
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
                            name='userMail'
                            placeholder='Enter Your Email here'
                            required
                            autoComplete='off'
                            value={user.userMail}
                            onChange={inputData}
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='phone' className='block text-gray-900 text-sm font-bold mb-2'>Contact Number</label>
                        <input
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='text'
                            name='phone'
                            placeholder='Enter Your Phone Number'
                            required
                            autoComplete='off'
                            value={user.phone}
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
                            value={user.password}
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
                            value={user.confirmPassword}
                            onChange={inputData}
                        />
                    </div>
                    <button
                        type='submit'
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Register Now</button>
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

export default Register;