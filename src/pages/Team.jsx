import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';

const TeamSection = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const employeesData = await axios.get('/api/v1/employee');
        setTeams(employeesData.data);
      } catch (error) {
        console.log(error);
      }
    };

    getEmployees();
  }, []);

  return (
    <div className='m-1.5 md:m-8 p-4 min-w-screen min-h-screen md:p-8 bg-white rounded-3xl'>
    <Header category="Page" title="Team" />
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-14">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Our Team</h1>
        </div>
        <div className="flex flex-wrap m-2">
          {
            teams.map((team, index) => (
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={team?.userId?.avatar} />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">{team.name}</h2>
                    <p className="text-gray-500">{team.department}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </section>
    </div>
  );
};

export default TeamSection;
