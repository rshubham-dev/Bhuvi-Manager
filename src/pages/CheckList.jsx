import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import Header from '../components/Header';

const CheckList = () => {
  const navigate = useNavigate();
  const [checkLists, setCheckList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getcheckLists = async () => {
      try {
        const checkListData = await axios.get('/api/v1/checkList');
        setCheckList(checkListData.data);
        console.log(checkLists)
      } catch (error) {
        toast.error(error.message)
        setError(error.message);
      }
    }
    getcheckLists();
  }, [])

  const handleEdit = (checkListId) => {
    // Add your edit logic here
    navigate(`/edit-checkList?checkListId=${checkListId}`);
  };

  const handleRedirect = (checkListId) => {
    navigate(`/checkList?checkListId=${checkListId}`);
  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/checklist/${id}`);
      setCheckList(checkLists.filter((checkList) => checkList._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };
  const handleAdd = () => {
    navigate('/create-site');
  };

  return (
    <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
    <Header category="Page" title="Checklist" />
    <div className="overflow-x-auto">
    <h1 className="text-2xl font-bold text-center">Site List</h1>
    <div className=" mb-4 mr-20 mt-6 text-right flex justify-between align-center">
      <h2 className="text-xl text-green-600 ml-8">Total Purchase Orders: </h2>
      <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
        Add site
      </button>
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">Site Id</th>
          <th scope="col" className="px-6 py-3">Client</th>
          <th scope="col" className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
         {checkLists.map((checkList) => (
          <tr key={checkList._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">
              <NavLink>
              </NavLink>
            </td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleRedirect(checkList._id)}
                className="bg-blue-500 text-white px-2 py-1 mr-2"
              >
                <FaExternalLinkAlt />
              </button>
              <button
                onClick={() => handleEdit(checkList._id)}
                className="bg-blue-500 text-white px-2 py-1 mr-2"
              >
                <GrEdit />
              </button>
              <button
                onClick={() => handleDelete(checkList._id)}
                className="bg-red-500 text-white px-2 py-1 mr-2"
              >
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {error && <p className="text-red-500">{error}</p>}
    </table>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
  </div>
  </div>
  )
}

export default CheckList