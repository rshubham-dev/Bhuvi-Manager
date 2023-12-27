import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import property from '../config';


const Contractors = () => {
  const navigate = useNavigate();
    const [contractors, setContractor] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const getContractors = async () => {
          try {
              const contractorData = await axios.get(`${property.BASE_URL}/api/v1/contractor`);
              setContractor(contractorData.data);
          } catch (error) {
              toast.error(error.message)
          }
      }
      getContractors();
  }, [])

    const handleEdit = (contractorId) => {
        // Add your edit logic here
        console.log(`Edit contractor with ID ${contractorId}`);
    };

    const handleDelete = (contractorId) => {
        // Add your delete logic here
        setContractor(contractors.filter((contractor) => contractor._id !== contractorId));
    };

    const handleAdd = () => {
        navigate('/create-contractors');
    };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <h1 className="text-2xl font-bold text-center">contractor List</h1>
    <div className=" mb-4 mr-20 text-right">
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
            Add Contractor
        </button>
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">contractor Name</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
        </thead>
        <tbody>
            {contractors.map((contractor) => (
                <tr key={contractor.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{contractor.name}</td>
                    <td className="px-6 py-4">{contractor.phone}</td>
                    <td className="px-6 py-4">
                        <button
                            onClick={() => handleEdit(contractor._id)}
                            className="bg-blue-500 text-white px-2 py-1 mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(contractor.id)}
                            className="bg-red-500 text-white px-2 py-1 mr-2"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    {error && <p className="text-red-500">{error}</p>}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
</div>
  )
}

export default Contractors