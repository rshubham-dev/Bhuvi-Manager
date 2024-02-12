import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Header from '../components/Header';
axios.defaults.withCredentials = true;


const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClient] = useState([]);
  const [error, setError] = useState(null);
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const getClients = async () => {
      try {
        const clientData = await axios.get('/api/v1/client');
        if (user.department === 'Site Supervisor' || user.department === 'Site Incharge') {
          const sites = user?.site;
          let Clients;
          for (let site of sites) {
            Clients = clientData.data?.filter((client) => client.site?._id.includes(site))
          }
          setClient(Clients)
        } else {
          setClient(clientData.data);
        }
        console.log(clients)
      } catch (error) {
        toast.error(error.message)
        setError(error.message);
      }
    }
    getClients();
  }, [])

  const handleEdit = (id) => {
    navigate(`/edit-client/${id}`);
  };

  const handleRedirect = (id) => {
    navigate(`/client/${id}`);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/client/${id}`);
      setClient(clients.filter((client) => client._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleAdd = () => {
    navigate('/create-client');
  };

  return (
    <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
      <section className="overflow-x-auto">
        <Header category="Page" title="Client's" />
        <div className=" mb-4 text-right flex justify-between align-center">
          <h2 className="text-xl text-green-600">Total Client: {clients?.length}</h2>
          <button onClick={handleAdd} className="bg-green-500 rounded-full text-white px-2 py-2">
            <MdAdd className='text-xl' />
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Whatsapp</th>
              <th scope="col" className="px-6 py-3">Site</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{client.name}</td>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">{client.contactNo}</td>
                <td className="px-6 py-4">{client.whatsapp}</td>
                <td className="px-6 py-4">{client.site?.name}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleRedirect(client._id)}
                    className="bg-blue-500 text-white px-2 py-1 mr-2"
                  >
                    <FaExternalLinkAlt />
                  </button>
                  <button
                    onClick={() => handleEdit(client._id)}
                    className="bg-blue-500 text-white px-2 py-1 mr-2"
                  >
                    <GrEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="bg-red-500 text-white px-2 py-1 mr-2"
                  >
                    <MdDelete />
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
      </section>
    </div>
  );
}

export default Clients