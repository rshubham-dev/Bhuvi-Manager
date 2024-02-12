import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';

const Project_ScheduleScreen = () => {
  const { id } = useParams();
  return (
    <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
    <Header category="Page" title="Work-Orders" />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default Project_ScheduleScreen