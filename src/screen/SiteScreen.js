import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation} from 'react-router-dom';

const SiteScreen = () => {
  const [siteData, setSiteData] = useState({});
  const location = useLocation();
  console.log(location); 

  useEffect(() => {
    console.log('location.search:', location.search);
    const siteId = new URLSearchParams(location.search).get('siteId');
    console.log('siteId:', siteId);
    if (siteId) {
      fetchUserDetails(siteId);
    }
  }, [location.search]);

  const fetchUserDetails = async (siteId) => {
    try {
      const response = await axios.get(`/api/v1/site/${siteId}`);
      console.log(response.data)
      setSiteData(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  return (
    <div>{siteData.name}</div>
  )
}

export default SiteScreen