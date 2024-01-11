import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

axios.defaults.withCredentials = true;

const ExtraWork = () => {
  const navigate = useNavigate();
  const [extraWorks, setExtraWork] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchExtraWork = async () => {
      try {
        const extraWorkData = await axios.get('/api/v1/extra-work');
        setExtraWork(extraWorkData.data);
        console.log(extraWorkData.data)
      } catch (error) {
        toast.error(error.message)
        setError(error.message);
      }
    }

    fetchExtraWork();
  }, [])

  // const handleEdit = (extraWorkId) => {
  //   // Add your edit logic here
  //   navigate(`/edit-extra-work?extraWorkId=${extraWorkId}`);
  // };

  // const handleRedirect = (extraWorkId) => {
  //   navigate(`/workOrder?workOrderId=${extraWorkId}`);
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`/api/v1/extra-work/${id}`);
  //     setWorkOrder(extraWorks.filter((extraWork) => extraWork._id !== id));
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // };

  const handleAdd = () => {
    navigate('/create-extra-work');
  };
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
    <h1 className="text-2xl font-bold text-center">Extra Work</h1>
    <div className=" mb-4 mr-20 text-right">
      <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
        Add Extra Work
      </button>
    </div>
    {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Work-Order Name</th>
          <th scope="col" className="px-6 py-3">Work-Order Id</th>
          <th scope="col" className="px-6 py-3">Site</th>
          <th scope="col" className="px-6 py-3">Contractor</th>
          <th scope="col" className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {extraWorks.map((extraWork) => (
          <tr key={workOrder._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">
                {extraWork}
            </td>
            <td className="px-6 py-4">{workOrder.workOrderNo}</td>
            <td className="px-6 py-4">{workOrder.site?.name}</td>
            <td className="px-6 py-4">{workOrder.contractor?.name}</td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleRedirect(workOrder._id)}
                className="bg-blue-500 text-white px-2 py-1 mr-2"
              >
                <FaExternalLinkAlt />
              </button>
              <button
                onClick={() => handleEdit(workOrder._id)}
                className="bg-blue-500 text-white px-2 py-1 mr-2"
              >
                <GrEdit />
              </button>
              <button
                onClick={() => handleDelete(workOrder._id)}
                className="bg-red-500 text-white px-2 py-1 mr-2"
              >
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {error && <p className="text-red-500">{error}</p>}
    </table> */}
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
  </div>
  )
}

export default ExtraWork