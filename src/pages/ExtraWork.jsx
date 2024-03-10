import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { Tabs } from 'antd';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import moment from 'moment';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { FcApproval } from "react-icons/fc";
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
        console.log(extraWorkData.data)
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
        console.error(error)
      }
    }

    fetchExtraWork();
  }, [])

  const handleEdit = (id, index) => {
    navigate(`/edit-extra-work/${id}/work/${index}`);
  };

  const handleRedirect = (id) => {
    navigate(`/extra-work/${id}`);
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

  const handleAdd = () => {
    navigate('/create-extra-work');
  };

  return (
    <div className='m-1 md:m-6 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
      <section className="overflow-x-auto"
        style={{
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
        }}>
        <Header category="Page" title="Extra Work's" />
        <div className="w-full mx-auto text-gray-700 px-2 flex justify-end items-center">
          <button onClick={handleAdd} className="bg-green-500 rounded-full text-white px-2 py-2">
            <MdAdd className='text-xl' />
          </button>
        </div>

        <Tabs defaultActiveKey='client'>

          <Tabs.TabPane tab='Client' key={'client'}>

            <div className="overflow-x-auto"
              style={{
                scrollbarWidth: 'none',
                '-ms-overflow-style': 'none',
              }}>
              <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
                <thead className="bg-gray-800">
                  <tr className="text-white text-left">
                    <th className="font-semibold text-sm uppercase px-6 py-4 "> Name </th>
                    {/* <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Total Floor </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Incharge </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Project Type </th> */}
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {clientExtraWorks?.map((extraWork) => (
                    <tr key={extraWork._id} className='border-b border-blue-gray-200'>
                      <td className="px-6 py-4">
                        <p className=""> {extraWork.site?.name} </p>
                        <p className="text-gray-500 text-sm font-semibold tracking-wide"> {extraWork.client?.name} </p>
                      </td>
                      {/* <td className="px-6 py-4 text-center">
                      {site.floors}
                    </td>
                    <td className="px-6 py-4 text-center">{site.incharge?.userName}</td>
                    <td className="px-6 py-4 text-center">{site.projectType}</td> */}
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => handleRedirect(extraWork._id)} className="mr-2">
                          <FaExternalLinkAlt className='text-blue-500 hover:text-blue-800 text-lg' />
                        </button>
                        <button onClick={() => handleEdit(extraWork._id)} className="mr-2">
                          <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                        </button>
                        <button onClick={() => handleDelete(extraWork._id)} className="mr-2">
                          <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* {clientExtraWorks.map((extraWork) => (
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
            ))} */}
          </Tabs.TabPane>

          <Tabs.TabPane tab='Contractor' key={'contractor'}>

            <div className="overflow-x-auto">
              <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
                <thead className="bg-gray-800">
                  <tr className="text-white text-left">
                    <th className="font-semibold text-sm uppercase px-6 py-4 "> Name </th>
                    {/* <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Total Floor </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Incharge </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Project Type </th> */}
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {contractorExtraWorks?.map((extraWork) => (
                    <tr key={extraWork._id} className='border-b border-blue-gray-200'>
                      <td className="px-6 py-4">
                        <p className=""> {extraWork.site?.name} </p>
                        <p className="text-gray-500 text-sm font-semibold tracking-wide"> {extraWork.contractor?.name} </p>
                      </td>
                      {/* <td className="px-6 py-4 text-center">
                      {site.floors}
                    </td>
                    <td className="px-6 py-4 text-center">{site.incharge?.userName}</td>
                    <td className="px-6 py-4 text-center">{site.projectType}</td> */}
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => handleRedirect(extraWork?._id)} className="mr-2">
                          <FaExternalLinkAlt className='text-blue-500 hover:text-blue-800 text-lg' />
                        </button>
                        <button onClick={() => handleEdit(extraWork?._id)} className="mr-2">
                          <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                        </button>
                        <button onClick={() => handleDelete(extraWork?._id)} className="mr-2">
                          <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* {contractorExtraWorks.map((extraWork) => (
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
            ))} */}

          </Tabs.TabPane>

          <Tabs.TabPane tab='Draft' key={'draft'}>

            <div className="overflow-x-auto">
              <table className='w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden'>
                <thead className="bg-gray-800">
                  <tr className="text-white text-left">
                    <th className="font-semibold text-sm uppercase px-6 py-4 "> Name </th>
                    {/* <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Total Floor </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Incharge </th>
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Project Type </th> */}
                    <th className="font-semibold text-sm uppercase px-6 py-4 text-center"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {contractorExtraWorks?.map((extraWork) => (
                    <tr key={extraWork._id} className='border-b border-blue-gray-200'>
                      <td className="px-6 py-4">
                        <p className=""> {extraWork.site?.name} </p>
                        <p className="text-gray-500 text-sm font-semibold tracking-wide"> {extraWork.contractor?.name} </p>
                      </td>
                      {/* <td className="px-6 py-4 text-center">
                      {site.floors}
                    </td>
                    <td className="px-6 py-4 text-center">{site.incharge?.userName}</td>
                    <td className="px-6 py-4 text-center">{site.projectType}</td> */}
                      <td className="px-6 py-4 text-center">
                        {/* <button onClick={() => handleRedirect(extraWork?._id)} className="mr-2">
                          <FaExternalLinkAlt className='text-blue-500 hover:text-blue-800 text-lg' />
                        </button> */}
                        <button onClick={() => handleEdit(extraWork?._id)} className="mr-2">
                          <GrEdit className="text-blue-500 hover:text-blue-800 text-lg" />
                        </button>
                        <button onClick={() => handleDelete(extraWork?._id)} className="mr-2">
                          <MdDelete className='text-red-500 hover:text-red-600 text-xl' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </Tabs.TabPane>

        </Tabs>

        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </section>
    </div>
  )
}

export default ExtraWork