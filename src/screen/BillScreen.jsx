import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BillScreen = () => {
  const { id } = useParams();
  return (
    <div>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
  </div>
  )
}

export default BillScreen