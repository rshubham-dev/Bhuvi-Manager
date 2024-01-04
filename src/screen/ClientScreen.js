import React from 'react';
import { useLocation} from 'react-router-dom';

const ClientScreen = () => {
  const location = useLocation();

  useEffect(() => {
    const clientId = new URLSearchParams(location.search).get('siteId');
    if (clientId) {
      fetchSiteDetails(clientId);
    }
  }, [location.search]);
  return (
    <div>ClientScreen</div>
  )
}

export default ClientScreen