import React from 'react';
import UserProfile from '../components/ProfileCard';
import All from './All';
import TeamSection from './Employee';

const Admin = () => {
  return (
    <>
      <UserProfile/>
      <All/>
      <TeamSection/>
    </>
  )
}

export default Admin;