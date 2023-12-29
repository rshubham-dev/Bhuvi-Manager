import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';

const UserProfile = () => {
  const {user} = useContext(UserContext);
  if(!user) return <div>Please Login</div>
  console.log(user.name)
    console.log(user)
  const users = {
        name: 'Praveen Kumar Singh',
        email: 'pravinlostboy@gmail.com',
        role:'Admin',
        designation:'CEO',
        image: 'https://via.placeholder.com/24',
     };
 return (
    <div>
    <div className="container mx-auto py-8">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <img className="w-24 h-24 rounded-full mx-auto" src={user.image} alt={user.name} />
      <h2 className="text-2xl font-semibold text-center mt-4">{user.name}</h2>
      <p className="text-center mt-2">{user.email}</p>
      <p className="text-center mt-2">{user.role}</p>
      <p className="text-center mt-2">{user.designation}</p>
    </div>
    </div>
  </div>
 );
};

export default UserProfile;