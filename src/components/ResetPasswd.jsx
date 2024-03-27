import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { MdKeyboardBackspace } from "react-icons/md";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const ResetPasswd = () => {
    const [formData, setFormData] = useState({
        userMail: '',
        password: '',
        confirmpasswd: '',
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.confirmpasswd === formData.password) {
                const response = await axios.put('/api/v1/user/reset', formData);
                console.log(response.data);
                toast.success(response.data?.message);
                navigate(-1);
            } else {
                toast.error(`Password Doesn't Match`)
            }
        } catch (error) {
            console.log('Error submitting form:', error);
            toast.error(error.message)
        }
    }
    return (
        <div className='m-1 md:m-6 p-3 max-w-screen max-h-screen md:p-8'>
            <section className="mx-auto w-full md:w-3/4 lg:w-2/5 h-fit px-6 py-4 pb-8 bg-white rounded-2xl shadow-xl">
                <div className='mb-2 py-2'>
                    <Link to={-1}
                        className="text-2xl font-semibold text-gray-900 hover:text-blue-600 ">
                        <MdKeyboardBackspace />
                    </Link>
                </div>
                <h2
                    className="my-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Change Password
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                    <div>
                        <label htmlFor="userMail" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                        <input
                            type="email"
                            id="email"
                            name="userMail"
                            value={formData.userMail}
                            onChange={handleChange}
                            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                            placeholder="name@company.com"
                            required="" />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-1">Password:</label>
                        <div className='flex flex-row border border-gray-300 rounded-md justify-between items-center p-0.5'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full border-none outline-none p-2 text-gray-900 sm:text-sm"
                                required="" />
                            <span
                                className="block text-gray-700 text-xl font-bold cursor-pointer p-2"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <IoEyeOff /> : <IoEye />}
                            </span>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-bold mb-1">Confirm-Password:</label>
                        <div className='flex flex-row border border-gray-300 rounded-md justify-between items-center p-0.5'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm-password"
                                name="confirmpasswd"
                                value={formData.confirmpasswd}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full border-none outline-none p-2 text-gray-900 sm:text-sm"
                                required="" />
                            <span
                                className="block text-gray-700 text-xl font-bold cursor-pointer p-2"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset passwod</button>
                </form>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </section>
        </div>
    )
}

export default ResetPasswd