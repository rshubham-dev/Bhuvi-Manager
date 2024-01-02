import React from 'react';
// import { UserContext } from '../context/AuthContext';
import { useSelector } from 'react-redux'

const UserProfile = () => {
  // const {user} = useContext(UserContext);
  //   console.log(user)
  const {user} = useSelector((state)=> state.auth)
 return (
    <div>
    <div className="container mx-auto py-8">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <img className="w-24 h-24 rounded-full mx-auto" alt={user.userName} />
      <h2 className="text-2xl font-semibold text-center mt-4">{user.userName}</h2>
      <p className="text-center mt-2">{user.userMail}</p>
      <p className="text-center mt-2">{user.phone}</p>
      <p className="text-center mt-2">{user.role}</p>
      <p className="text-center mt-2">{user.department}</p>
    </div>
    </div>
  </div>
 );
};

export default UserProfile;