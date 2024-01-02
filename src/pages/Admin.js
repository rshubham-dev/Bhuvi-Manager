import React from 'react';
import UserProfile from '../components/ProfileCard.js';
import All from './All';
import { MdPerson, MdDateRange, MdPayment, MdLocationOn, MdBusiness, MdPeople, MdDesignServices, MdReceipt, MdPlaylistAddCheck, MdConstruction, MdBuild, MdMoney, MdAssignment, MdWork } from "react-icons/md";
import TeamSection from './Team.js';
import Dashboard from './Dashboard.js';

const Admin = () => {
  const adminItems = [
    { to: '/user', text: 'User', icon: <MdPerson /> },
    { to: '/project-schedule', text: 'Project Schedule', icon: <MdDateRange /> },
    { to: '/payment-schedule', text: 'Payment Schedule', icon: <MdPayment /> },
    { to: '/site', text: 'Site', icon: <MdLocationOn /> },
    { to: '/clients', text: 'Client', icon: <MdBusiness /> },
    { to: '/design', text: 'Design', icon: <MdDesignServices /> },
    { to: '/bill', text: 'Bill', icon: <MdReceipt /> },
    { to: '/checklist', text: 'Check-List', icon: <MdPlaylistAddCheck /> },
    { to: '/contractors', text: 'Contractor', icon: <MdConstruction /> },
    { to: '/material', text: 'Material', icon: <MdBuild /> },
    { to: '/expenses', text: 'Expenses', icon: <MdMoney /> },
    { to: '/work-details', text: 'WorkDetails', icon: <MdAssignment /> },
    { to: '/work-order', text: 'WorkOrder', icon: <MdWork /> },
];

  return (
    <Dashboard>
      <section>
        <div className="container mx-auto p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {adminItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-gray-200 transition-colors duration-200">
                <NavLink to={item.to}>
                  <div className="flex flex-col items-center">
                    <div className="icon text-4xl mb-2">{item.icon}</div>
                    <div className="text-lg font-bold">{item.text}</div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TeamSection />
    </Dashboard>
  )
}

export default Admin;