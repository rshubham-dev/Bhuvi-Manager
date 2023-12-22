import React from 'react';

const Bills = () => {
 return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="mb-5">
              <h1 className="text-2xl font-bold text-gray-900">Contractor Bill</h1>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <div className="">
                <label className="text-gray-700">CONTRACTOR NAME</label>
                <input className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-primary" type="text" />
              </div>
              <div className="">
                <label className="text-gray-700">BILL NO</label>
                <input className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-primary" type="text" />
              </div>
              <div className="">
                <label className="text-gray-700">SITE</label>
                <input className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-primary" type="text" />
              </div>
              <div className="">
                <label className="text-gray-700">DATE</label>
                <input className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-primary" type="date" />
              </div>
              <div className="">
                <label className="text-gray-700">DESCRIPTIONS</label>
                <textarea className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-primary" rows="3"></textarea>
              </div>
              <div className="">
                <label className="text-gray-700">CONTRACTOR REPRESENTATIVE</label>
                <input className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-primary" type="text" />
              </div>
              <div className="">
                <label className="text-gray-700">BILLING MANAGER</label>
                <input className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-primary" type="text" />
              </div>
              {/* ... rest of the form fields */}
            </div>
          </div>
        </div>
      </div>
    </div>
 );
};

export default Bills;