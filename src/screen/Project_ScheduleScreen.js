import React from 'react';
import { useLocation} from 'react-router-dom';

const Project_ScheduleScreen = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>Project_ScheduleScreen</div>
  )
}

export default Project_ScheduleScreen