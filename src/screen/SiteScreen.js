import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './screen.css';

axios.defaults.baseURL = 'https://bhuvi-management-server.onrender.com';
axios.defaults.withCredentials = true;

const SiteScreen = () => {
  const [site, setSiteData] = useState({});
  const location = useLocation();

  useEffect(() => {
    const siteId = new URLSearchParams(location.search).get('siteId');
    if (siteId) {
      fetchSiteDetails(siteId);
    }
  }, [location.search]);

  const fetchSiteDetails = async (siteId) => {
    try {
      const response = await axios.get(`/api/v1/site/${siteId}`);
      console.log(response.data)
      setSiteData(response.data);
    } catch (error) {
      console.log('Error fetching site details:', error);
    }
  };


  return (
      <section className='bg-white px-12 py-8 mb-16 h-full w-full'>
        <h1 className="text-3xl font-semibold text-gray-800"> Site Details</h1>
        <div className="mt-6 w-full">

          <div className="card ">
            <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
              <summary className='text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                Site Info
              </summary>

              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'>Name</dt>
                <dd className='text-color-title mx-5 my-1.5'>{site.name}</dd>
              </div>

              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'>Site Id</dt>
                <dd className='text-color-title mx-5 my-1.5'>{site.siteId}</dd>
              </div>

              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'>Client</dt>
                <dd className='text-color-title mx-5 my-1.5'>{site.client?.name}</dd>
              </div>

              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'>Project Type</dt>
                <dd className='text-color-title mx-5 my-1.5'>{site.projectType}</dd>
              </div>

              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'>Total Floor</dt>
                <dd className='text-color-title mx-5 my-1.5'>{site.floors}</dd>
              </div>

              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'>Site Incharge</dt>
                <dd className='text-color-title mx-5 my-1.5'>{site.incharge?.name}</dd>
              </div>

              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'>Site Supervisor</dt>
                <dd className='text-color-title mx-5 my-1.5'>{site.supervisor?.name}</dd>
              </div>

            </details>
          </div>

          <div className="card ">
            <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
              <summary className='text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Agreement
              </summary>
              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'></dt>
                <dd className='text-color-title mx-5 my-1.5'></dd>
              </div>
            </details>
          </div>

          <div className="card ">
            <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
              <summary className='text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Payment Schedules
              </summary>
              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'></dt>
                <dd className='text-color-title mx-5 my-1.5'></dd>
              </div>
            </details>
          </div>

          <div className="card ">
            <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
              <summary className='text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Project Schedules
              </summary>
              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'></dt>
                <dd className='text-color-title mx-5 my-1.5'></dd>
              </div>
            </details>
          </div>

          <div className="card ">
            <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
              <summary className='text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Quality Check Schedule
              </summary>
              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'></dt>
                <dd className='text-color-title mx-5 my-1.5'></dd>
              </div>
            </details>
          </div>

          <div className="card ">
            <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
              <summary className='text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Work Order
              </summary>
              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'></dt>
                <dd className='text-color-title mx-5 my-1.5'></dd>
              </div>
            </details>
          </div>

          <div className="card ">
            <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
              <summary className='text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
              Bills
              </summary>
              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'></dt>
                <dd className='text-color-title mx-5 my-1.5'></dd>
              </div>
            </details>
          </div>

          <div className="card ">
            <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
              <summary className='text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                Purchase Order
              </summary>
              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'></dt>
                <dd className='text-color-title mx-5 my-1.5'></dd>
              </div>
            </details>
          </div>

          <div className="card ">
            <details className="info rounded-lg bg-white overflow-hidden shadow-lg p-3">
              <summary className='text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                Extra Work
              </summary>
              <div className='flex justify-between flex-row my-1.5'>
                <dt className='font-medium text-color-title mx-5 my-1.5'></dt>
                <dd className='text-color-title mx-5 my-1.5'></dd>
              </div>
            </details>
          </div>

        </div>
      </section>
  )
}

export default SiteScreen

