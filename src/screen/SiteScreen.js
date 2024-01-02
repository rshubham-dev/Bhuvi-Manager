import React from 'react';
import { useLocation} from 'react-router-dom';

const SiteScreen = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>SiteScreen</div>
  )
}

export default SiteScreen