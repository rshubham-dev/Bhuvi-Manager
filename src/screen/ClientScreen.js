import React from 'react';
import { useLocation} from 'react-router-dom';

const ClientScreen = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>ClientScreen</div>
  )
}

export default ClientScreen