import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import convertToBase64 from '../helper/converter';
import Header from '../components/Header';
import { GrEdit } from "react-icons/gr";
import './components.css';
import { IoEyeOff, IoEye } from "react-icons/io5";
import image from '../asset/profile.webp';
axios.defaults.withCredentials = true;

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [User, setUser] = useState({
    userName: '',
    userMail: '',
    phone: '',
    whatsapp: '',
    avatar: '',
  })
  const [toUpdate, setToUpdate] = useState(false);
  const [profileUpdate, setProfileUpdate] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  // const [showNewPassword, setShowNewPassword] = useState(false);
  const [avatar, setAvatar] = useState('');

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
  }, [User?.avatar]);

  useEffect(() => {
    if (user) {
      fetchUser(user?._id)
    };
  }, []);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`/api/v1/user/${id}`);
      console.log(response.data.avatar)
      setUser({
        userName: response.data?.userName,
        userMail: response.data?.userMail,
        phone: response.data?.phone,
        whatsapp: response.data?.whatsapp,
        avatar: response.data?.avatar,
      })
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  const onUpload = async () => {
    const base64 = await convertToBase64(User?.avatar);
    setAvatar(base64);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(User).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });
    try {
      if (profileUpdate === true) {
        const response = await axios.put(`/api/v1/User/${user?._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // if (response.status === 201) {
        console.log(response.data);
        toast.success('Updation successful!');
        setProfileUpdate(false)
        // }
      }
    } catch (error) {
      console.log('Error submitting form:', error);
      toast.error(error.message)
      toast.error('An error occurred while updating. Please try again.');
    }
  };

  return (
    <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl shadow-xl'>
      <Header category="Page" title="Profile" />
      <div className='grid grid-cols-1 lg:grid-cols-2 pb-6'>
        <section className='w-full lg:w-3/5 h-fit mb-10 px-4 lg:mb-0'>
          <form
            onSubmit={formSubmit}
          >
            {profileUpdate === false ?
              <div className='profile flex justify-center mb-8'>
                <img
                  src={User?.avatar ? User?.avatar : image}
                  className='border-4 border-gray-100 w-28 h-28 rounded-full shadow-lg cursor-pointer object-cover object-center' alt="avatar" />
              </div> :
              <div className='profile flex justify-center mb-8'>
                <label htmlFor="avatar">
                  <img
                    src={avatar || image}
                    className='border-4 border-gray-100 w-28 h-28 rounded-full shadow-lg cursor-pointer object-cover object-center' alt="avatar" />
                </label>
                <input
                  type="file"
                  id='avatar'
                  name='avatar'
                  onChange={(e) => inputData(e, 'avatar')}
                  accept='.png, .jpg, .jpeg' />
              </div>
            }

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-1' htmlFor='name'>
                Full Name
              </label>
              <input
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                name='userName'
                placeholder='Enter Your Name here'
                autoComplete='off'
                disabled={profileUpdate}
                value={User.userName}
                onChange={inputData}
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-1' htmlFor='email'>
                Email
              </label>
              <input
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='email'
                name='userMail'
                placeholder='Enter Your Email here'
                autoComplete='off'
                disabled={profileUpdate}
                value={User.userMail}
                onChange={inputData}
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='whatsapp' className='block text-gray-900 text-sm font-bold mb-1'>Contact Number</label>
              <input
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='tel'
                name='whatsapp'
                placeholder='Enter Your Whatsapp Number'
                autoComplete='off'
                disabled={profileUpdate}
                value={User.whatsapp}
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
                disabled={profileUpdate}
                value={User.phone}
                onChange={inputData}
              />
            </div>

            {/* <div className='mb-4'>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-1">Password:</label>
              <div className='flex flex-row border rounded-md justify-between items-center '>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full border-none outline-none p-2"
                  placeholder='Enter Your Password'
                  autoComplete='off'
                  value={User.password}
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
                  value={User.newPassword}
                  onChange={inputData}
                />
                <span
                  className="block text-gray-700 text-xl font-bold cursor-pointer p-2"
                  onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <IoEyeOff /> : <IoEye />}
                </span>
              </div>
            </div> */}

            {profileUpdate === true && (
              <button
                type='submit'
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                Update
              </button>
            )}
          </form>
          {profileUpdate === false && (
              <button onClick={() => setProfileUpdate(true)} type='button' className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex flex-row gap-3 items-center justify-center'>
                <GrEdit /> Edit
              </button>
          )}
        </section>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div >
  )
}

export default Profile;