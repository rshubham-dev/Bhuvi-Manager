import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { Tabs } from 'antd';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import moment from 'moment';
import { useSelector } from 'react-redux'
axios.defaults.withCredentials = true;

const ExtraWork = () => {
  const navigate = useNavigate();
  const [clientExtraWorks, setClientExtraWork] = useState([]);
  const [contractorExtraWorks, setContractorExtraWork] = useState([]);
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {

    const fetchExtraWork = async () => {
      try {
        const extraWorkData = await axios.get('/api/v1/extra-work');
        let clientExtraWork;
        let contractorExtraWork;
        if (user.department === 'Site Supervisor' || user.department === 'Site Incharge' && isLoggedIn) {
          const sites = user?.site;
          for (let site of sites) {
            clientExtraWork = extraWorkData.data.filter((extra) => extra.extraFor === 'Client' && extra?.site?._id.includes(site))
            contractorExtraWork = extraWorkData.data.filter((extra) => extra.extraFor === 'Contractor' && extra?.site?._id.includes(site))
          }
          setClientExtraWork(clientExtraWork);
          setContractorExtraWork(contractorExtraWork);
        } else {
          setClientExtraWork(extraWorkData.data.filter((extra) => extra.extraFor === 'Client'));
          setContractorExtraWork(extraWorkData.data.filter((extra) => extra.extraFor === 'Contractor'));
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchExtraWork();
  }, [])

  const handleEdit = (id, index) => {
    navigate(`/edit-extra-work/${id}/work/${index}`);
  };

  const addMore = (id) => {
    navigate(`/edit-extra-work/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/extra-work/${id}`);
      setClientExtraWork(clientExtraWorks.filter((extraWork) => extraWork._id !== id));
      setContractorExtraWork(contractorExtraWorks.filter((extraWork) => extraWork._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const deleteDetail = async (id, index) => {
    try {
      const response = await axios.delete(`/api/v1/extra-work/${id}/work/${index}`);
      const deletedWork = response.data.existingExtraWork;
      setClientExtraWork(deletedWork?.filter((extra) => extra.extraFor === 'Client'));
      setContractorExtraWork(deletedWork?.filter((extra) => extra.extraFor === 'Contractor'));
      // const deletedWork = clientExtraWorks.filter((extraWork) => extraWork._id === id)[0].WorkDetail[index];
    } catch (error) {
      toast.error(error.message)
    }
  };


  const handleAdd = () => {
    navigate('/create-extra-work');
  };
  return (
    <section className='bg-white px-12 py-6 mb-16 h-full w-full'>
      <h1 className="text-3xl font-bold text-center">Extra Work</h1>
      <div className=" mb-4 mr-20 text-right">
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
          Add Extra Work
        </button>
      </div>
      <Tabs defaultActiveKey='client'>

        <Tabs.TabPane tab='Client' key={'client'}>
          {clientExtraWorks.map((extraWork) => (
            <div key={extraWork._id} className="card">
              <details className="rounded-lg bg-white overflow-hidden shadow-lg p-3">
                <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                  <NavLink>
                    Extra Work for {extraWork.site?.name} of {extraWork.client?.name}
                  </NavLink>
                  <div className='self-end'>
                    <button
                      onClick={() => addMore(extraWork._id)}
                      className="bg-green-500 rounded-2xl text-white px-1.5 py-1.5 mr-2">
                      <MdAdd />
                    </button>
                    <button
                      onClick={() => addMore(extraWork._id)}
                      className="bg-blue-500 rounded-2xl text-white px-1.5 py-1.5 mr-2">
                      <GrEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(extraWork._id)}
                      className="bg-red-500 rounded-2xl text-white px-1.5 py-1.5 mr-2">
                      <MdDelete />
                    </button>
                  </div>
                </summary>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Work</th>
                      <th scope="col" className="px-6 py-3">Unit</th>
                      <th scope="col" className="px-6 py-3">Rate</th>
                      <th scope="col" className="px-6 py-3">Area</th>
                      <th scope="col" className="px-6 py-3">Amount</th>
                      <th scope="col" className="px-6 py-3">Approval Status</th>
                      <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                  </thead>

                  {extraWork?.WorkDetail.map((detail, index) => (
                    <tbody key={index}>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                          {detail.work}
                        </td>
                        <td className="px-6 py-4">{detail.unit}</td>
                        <td className="px-6 py-4">{detail.rate}</td>
                        <td className="px-6 py-4">{detail.area}</td>
                        <td className="px-6 py-4">{detail.amount}</td>
                        <td className="px-6 py-4">{detail.status}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleEdit(extraWork._id, index)}
                            className="bg-blue-500 text-white px-2 py-1 mr-2">
                            <GrEdit />
                          </button>
                          <button
                            onClick={() => deleteDetail(extraWork._id, index)}
                            className="bg-red-500 text-white px-2 py-1 mr-2">
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </details>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab='Contractor' key={'contractor'}>
          {contractorExtraWorks.map((extraWork) => (
            <div key={extraWork._id} className="card">
              <details className="rounded-lg bg-white overflow-hidden shadow-lg p-3">
                <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                  <NavLink>
                    Extra Work for {extraWork.site?.name} of {extraWork.contractor?.name}
                  </NavLink>
                  <div className='self-end'>
                    <button
                      onClick={() => addMore(extraWork._id)}
                      className="bg-green-500 rounded-2xl text-white px-1.5 py-1.5 mr-2">
                      <MdAdd />
                    </button>
                    <button
                      onClick={() => addMore(extraWork._id)}
                      className="bg-blue-500 rounded-2xl text-white px-1.5 py-1.5 mr-2">
                      <GrEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(extraWork._id)}
                      className="bg-red-500 rounded-2xl text-white px-1.5 py-1.5 mr-2">
                      <MdDelete />
                    </button>
                  </div>
                </summary>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Work</th>
                      <th scope="col" className="px-6 py-3">Unit</th>
                      <th scope="col" className="px-6 py-3">Rate</th>
                      <th scope="col" className="px-6 py-3">Area</th>
                      <th scope="col" className="px-6 py-3">Amount</th>
                      <th scope="col" className="px-6 py-3">Approval Status</th>
                      <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                  </thead>

                  {extraWork?.WorkDetail.map((detail, index) => (
                    <tbody key={index}>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                          {detail.work}
                        </td>
                        <td className="px-6 py-4">{detail.unit}</td>
                        <td className="px-6 py-4">{detail.rate}</td>
                        <td className="px-6 py-4">{detail.area}</td>
                        <td className="px-6 py-4">{detail.amount}</td>
                        <td className="px-6 py-4">{detail.status}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleEdit(extraWork._id, index)}
                            className="bg-blue-500 text-white px-2 py-1 mr-2">
                            <GrEdit />
                          </button>
                          <button
                            onClick={() => deleteDetail(extraWork._id, index)}
                            className="bg-red-500 text-white px-2 py-1 mr-2">
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </details>
            </div>
          ))}
        </Tabs.TabPane>

      </Tabs>
    
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </section>
  )
}

export default ExtraWork