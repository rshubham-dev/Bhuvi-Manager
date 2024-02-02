import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles';
const localizer = momentLocalizer(moment)

const Profile = (props) => {
  navigator.geolocation.getCurrentPosition(
    (position)=>{
    console.log(position)
  },
  (error) => {
    console.log(error.message)
  }
  )
  return (
    <div className='h-full p-14 mb-14 z-0'>
    <Calendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
  );
}

export default Profile;