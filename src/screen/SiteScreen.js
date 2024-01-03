import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation} from 'react-router-dom';

const SiteScreen = () => {
  const [siteData, setSiteData] = useState({});
  const location = useLocation();
  console.log(location); 

  useEffect(() => {
    console.log('location.search:', location.search);
    const id = new URLSearchParams(location.search).get('siteId');
    console.log('siteId:', id);
    if (id) {
      fetchSiteDetails(id);
    }
  }, [location.search]);

  const fetchSiteDetails = async (id) => {
    try {
      console.log(`before res: ${id}`)
      const response = await axios.get(`/api/v1/site/${id}`);
      console.log(response.data.site);
      console.log(response.data)
      setSiteData(response.data.site);
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };
  return (
    <div>{siteData.name}</div>
  )
}

export default SiteScreen