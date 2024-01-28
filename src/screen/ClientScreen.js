import React, { useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import moment from 'moment';

const ClientScreen = () => {
  const location = useLocation();

  useEffect(() => {
    const clientId = new URLSearchParams(location.search).get('siteId');
    if (clientId) {
      fetchClientDetails(clientId);
    }
  }, [location.search]);
  const fetchClientDetails = async ()=>{}
  return (
    <div>ClientScreen</div>
  )
}

export default ClientScreen