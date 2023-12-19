import React from 'react';
import logo from '../asset/logo.png';

const Profile = () => {
  return (
    <section className="flex flex-col justify-center">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <img src={logo} className="h-12 w-auto" alt="Profile" />
            </div>
            <div className="divide-y divide-gray-400">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="font-bold">
                  Praveen Kumar Singh
                </div>
                <div>
                  CEO
                </div>
                <div>
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;