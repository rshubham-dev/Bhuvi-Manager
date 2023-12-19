import React from 'react';
import { NavLink } from 'react-router-dom';

const UserProfile = () => {
    const user = {
        name: 'Praveen Kumar Singh',
        email: 'pravinlostboy@gmail.com',
        role:'Admin',
        designation:'CEO',
        image: 'https://via.placeholder.com/24',
        linkedin: 'https://www.linkedin.com',
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com',
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
      <div className="mt-6 flex justify-center space-x-4">
        <NavLink to={user.linkedin} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-gray-700">
          LinkedIn
        </NavLink>
        <NavLink to={user.instagram} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-700">
          Instagram
        </NavLink>
        <NavLink to={user.facebook} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-700">
          Facebook
        </NavLink>
      </div>
    </div>
    </div>
  </div>
 );
};

export default UserProfile;