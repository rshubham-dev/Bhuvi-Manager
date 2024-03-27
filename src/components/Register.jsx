import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import convertToBase64 from '../helper/converter';
import Header from '../components/Header';
// import Style from '../style/User.module.css'
import './components.css';
import { IoEyeOff, IoEye } from "react-icons/io5";
import { MdKeyboardBackspace } from "react-icons/md";
import image from '../asset/profile.webp';
axios.defaults.withCredentials = true;

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName: '',
        userMail: '',
        password: '',
        newPassword: '',
        phone: '',
        whatsapp: '',
        avatar: '',
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const userName = useRef();
    const userMail = useRef();
    const password = useRef();
    const newPassword = useRef();
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
            console.log('Error submitting form:', error);
            toast.error(error.message)
            toast.error('An error occurred while registering. Please try again.');
        }
    };

    return (
        <div className='m-1 md:m-6 p-3 min-w-screen min-h-screen md:p-8'>
            {/* <Header category="Page" title="Register" /> */}
            <section className='mx-auto w-full md:w-3/4 lg:w-2/5 h-fit bg-white px-6 py-10 rounded-2xl shadow-xl'>
                <div className='mb-2 py-2'>
                    <Link to={-1}
                        className="text-2xl font-semibold text-gray-900 hover:text-blue-600">
                        <MdKeyboardBackspace />
                    </Link>
                </div>
                <form
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
                        <input
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='tel'
                            name='phone'
                            placeholder='Enter Your Phone Number'
                            autoComplete='off'
                            // required
                            value={user.phone}
                            onChange={inputData}
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='whatsapp' className='block text-gray-900 text-sm font-bold mb-2'>Contact Number</label>
                        <input
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='tel'
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
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-1">Password:</label>
                        <div className='flex flex-row border rounded-md justify-between items-center '>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="w-full border-none outline-none p-2"
                                placeholder='Enter Your Password'
                                autoComplete='off'
                                value={user.password}
                                onChange={inputData}
                            />
                            <span
                                className="block text-gray-700 text-xl font-bold cursor-pointer p-2"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <IoEyeOff /> : <IoEye />}
                            </span>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='Password' className='block text-gray-700 text-sm font-bold mb-2'>Change Password</label>
                        <div className='flex flex-row border rounded-md justify-between items-center '>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                className="w-full border-none outline-none p-2"
                                placeholder='Enter Your Password'
                                name='newPassword'
                                autoComplete='off'
                                ref={newPassword}
                                // required
                                value={user.newPassword}
                                onChange={inputData}
                            />
                            <span
                                className="block text-gray-700 text-xl font-bold cursor-pointer p-2"
                                onClick={() => setShowNewPassword(!showNewPassword)}>
                                {showNewPassword ? <IoEyeOff /> : <IoEye />}
                            </span>
                        </div>
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
        </div >
    )
}

export default Register;