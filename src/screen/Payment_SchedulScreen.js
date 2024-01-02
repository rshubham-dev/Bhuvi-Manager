import React from 'react';
import { useLocation} from 'react-router-dom';

const Payment_SchedulScreen = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>Payment_SchedulScreen</div>
  )
}

export default Payment_SchedulScreen