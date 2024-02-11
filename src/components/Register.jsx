import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import convertToBase64 from '../helper/converter';
import Header from '../components/Header';
// import Style from '../style/User.module.css'
import './components.css'
import image from '../asset/profile.png';
axios.defaults.withCredentials = true;

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName: '',
        userMail: '',
        password: '',
        confirmPassword: '',
        whatsapp: '',
        avatar: '',
    })
    const userName = useRef();
    const userMail = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const whatsapp = useRef();
    const [avatar, setAvatar] = useState('');
    console.log(avatar)

    const inputData = (data, field) => {
        const { name, value, type } = data.target;
        if (type === 'file') {
            setUser((prevUser) => ({
                ...prevUser,
                [field]: data.target.files[0],
            }));
        } else {
            setUser((prevUser) => ({ ...prevUser, [name]: value }));
        }
    };

    useEffect(() => {
        onUpload();
    }, [user?.avatar]);
    const onUpload = async () => {
        const base64 = await convertToBase64(user?.avatar);
        setAvatar(base64);
    }


    const formSubmit = async (e) => {
        e.preventDefault();
        console.log(userName)
        const formData = new FormData();
        Object.entries(user).forEach(([key, value]) => {
            if (value instanceof File) {
                formData.append(key, value);
            } else {
                formData.append(key, value);
            }
        });
        // formData.append('avatar', avatar);
        // formData.append('userName', userName.current.value);
        // formData.append('userMail', userMail.current.value);
        // formData.append('password', password.current.value);
        // formData.append('whatsapp', whatsapp.current.value);

        // if (password.current.value === confirmPassword.current.value) {
        try {
            const response = await axios.post('/api/v1/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            toast.success('Registration successful!');
            navigate('/login');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error.message)
            toast.error('An error occurred while registering. Please try again.');
        }
        // } else {
        //     toast.error('Please Confirm your password');
        // }
    };

    return (
        <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
            <Header category="Page" title="Dashboard" />
            <section className='max-w-md mx-auto my-4 p-6'>
                <form
                    className='bg-white shadow-md rounded px-8 pt-4 pb-6 mb-6 w-full max-w-md'
                    onSubmit={formSubmit}
                >
                    <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>

                    <div className='profile flex justify-center py-4'>
                        <label htmlFor="avatar">
                            <img
                                src={avatar || image}
                                className='border-4 border-gray-100 w-28 h-28 rounded-full shadow-lg cursor-pointer object-cover object-center' alt="avatar" />
                        </label>
                        <input
                            // onChange={onUpload} 
                            type="file"
                            id='avatar'
                            name='avatar'
                            // onChange={(e) => setAvatar(e.target.files[0])}
                            onChange={(e) => inputData(e, 'avatar')}
                            accept='.png, .jpg, .jpeg' />
                    </div>

                    {/* <div className="mb-4">
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-600">
                            Avatar
                        </label>
                        <input
                            type="file"
                            name="avatar"
                            // onChange={(e) => setAvatar(e.target.files[0])}
                            onChange={(e) => inputData(e, 'avatar')}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
                    </div> */}

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                            Full Name
                        </label>
                        <input
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='text'
                            name='userName'
                            placeholder='Enter Your Name here'
                            autoComplete='off'
                            ref={userName}
                            // required
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
                            autoComplete='off'
                            ref={userMail}
                            // required
                            value={user.userMail}
                            onChange={inputData}
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='whatsapp' className='block text-gray-900 text-sm font-bold mb-2'>Contact Number</label>
                        <input
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='text'
                            name='whatsapp'
                            placeholder='Enter Your Whatsapp Number'
                            autoComplete='off'
                            ref={whatsapp}
                            // required
                            value={user.whatsapp}
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
                            ref={password}
                            // required
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
                            autoComplete='off'
                            ref={confirmPassword}
                            // required
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
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </section>
        </div>
    )
}

export default Register;