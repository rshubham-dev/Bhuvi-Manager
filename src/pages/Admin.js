import React from 'react';
import UserProfile from '../components/ProfileCard.js';
import All from './All';
import TeamSection from './Team.js';

const Admin = () => {
  return (
    <>
      <UserProfile />
      <All />
      <TeamSection />
    </>
  )
}

export default Admin;