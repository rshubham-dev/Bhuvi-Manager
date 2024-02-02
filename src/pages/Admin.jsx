import React from 'react';
import UserProfile from '../components/ProfileCard.jsx';
import All from './All.jsx';
import TeamSection from './Team.jsx';

const Admin = () => {

  return (
    <>
    <UserProfile />
      <All/>
      <TeamSection />
    </>
  )
}

export default Admin;