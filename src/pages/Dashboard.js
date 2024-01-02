import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const {user} = useSelector((state)=>{
    return state.auth
  })
  return (
    <>
    </>
  )
}

export default Dashboard