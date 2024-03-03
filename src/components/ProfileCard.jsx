import React, { useEffect, useState } from 'react';
// import styles from '../style/User.module.css';
import { useSelector } from 'react-redux';
import image from '../asset/profile.webp';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { MdCheck } from "react-icons/md";
axios.defaults.withCredentials = true;

const UserProfile = () => {
  const [avatar, setAvatar] = useState('');
  const { user } = useSelector((state) => state.auth);
  const [User, setUser] = useState('');
  useEffect(() => {
    setUser(user);
  }, [user])

  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', avatar);
    try {
      const response = await axios.put(`/api/v1/user/${User._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      toast.success(response.data.message);
      setUser(response.data.existingUser)
      setAvatar('')
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.message)
    }
  };

  return (
    <div className='flex justify-center mx-auto mt-8 mb-4 sm:mx-8'>

      <form onSubmit={formSubmit} className="p-3 bg-white shadow-lg rounded-2xl w-90 dark:bg-gray-800">
        <div className="flex flex-row items-start gap-5">

          <div className='profile flex justify-center bg-red mx-2'>
            <label htmlFor="avatar">
              <img
                src={User?.avatar || image}
                className='border-2 border-gray-100 rounded-full w-52 h-32 shadow-lg object-cover object-center cursor-pointer text-center' alt="avatar" />
            </label>
            <input
              type="file"
              id='avatar'
              name='avatar'
              onChange={(e) => setAvatar(e.target.files[0])}
              accept='.png, .jpg, .jpeg' />
          </div>

          <div className="flex flex-col gap-4 justify-between w-full h-28 mx-2">
            <div>
              <p className="text-xl font-medium text-gray-800 dark:text-white">
                {User?.userName}
              </p>
              <p className="text-md text-gray-400">
                {User?.department}
              </p>
            </div>
            <div className="w-full p-1.5 bg-blue-100 rounded-lg dark:bg-white">
              <div className="flex items-start flex-col justify-center gap-2 text-xs text-gray-400 dark:text-black">
                <p className="flex flex-row">
                  Email:
                  <span className="font-bold text-black dark:text-indigo-500 ml-2">
                    {User?.userMail}
                  </span>
                </p>
                <p className="flex flex-row">
                  Contact No:
                  <span className="font-bold text-black dark:text-indigo-500 ml-2">
                    {User?.phone}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          { avatar ? 
          <button type="submit" className="w-1/3 px-3 py-2 text-base text-white bg-indigo-500 border rounded-lg hover:bg-indigo-700 ">
            Update
          </button> : ''
          }
        </div>
      </form>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default UserProfile;