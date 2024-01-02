import React from 'react'
import UserProfile from '../components/ProfileCard.js';
import All from './All';
import TeamSection from './Team.js';

const Ceo = () => {
  return (
    <>
      <UserProfile />
      <All />
      <TeamSection />
    </>
  )
}

export default Ceo