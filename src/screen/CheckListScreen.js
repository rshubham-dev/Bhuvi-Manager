import React from 'react';
import { useLocation} from 'react-router-dom';

const CheckListScreen = () => {
    const location = useLocation();
    console.log(location);
  return (
    <div>CheckListScreen</div>
  )
}

export default CheckListScreen