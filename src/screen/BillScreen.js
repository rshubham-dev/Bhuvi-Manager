import React from 'react';
import { useLocation} from 'react-router-dom';

const BillScreen = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>BillScreen</div>
  )
}

export default BillScreen