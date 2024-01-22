import React from 'react'
import UserProfile from '../components/ProfileCard.js';
import { NavLink } from 'react-router-dom';
import { GrUserWorker } from "react-icons/gr";
import { BiSolidPurchaseTag } from "react-icons/bi";
import {
  MdDateRange,
  MdPayment,
  MdLocationOn,
  MdReceipt,
  MdPlaylistAddCheck,
  MdConstruction,
  MdBuild,
  MdAssignment,
  MdWork
} from "react-icons/md";

const SiteIncharge = () => {
  const navItems = [
    { to: '/sites', text: 'Site', icon: <MdLocationOn /> },
    { to: '/contractors', text: 'Contractor', icon: <MdConstruction /> },
    { to: '/suppliers', text: 'Supplier', icon: <GrUserWorker/> },
    { to: '/work-orders', text: 'Work-Order', icon: <MdWork /> },
    { to: '/project-schedules', text: 'Project Schedule', icon: <MdDateRange /> },
    { to: '/payment-schedules', text: 'Payment Schedule', icon: <MdPayment /> },
    { to: '/bills', text: 'Bill', icon: <MdReceipt /> },
    { to: '/checklist', text: 'Check-List', icon: <MdPlaylistAddCheck /> },
    { to: '/purchase-order', text: 'Purchase-Order', icon: <BiSolidPurchaseTag /> },
    { to: '/material-order', text: 'Material-Order', icon: '' },
    { to: '/extra-work', text: 'Extra-Work', icon: <MdBuild /> },
    { to: '/work-details', text: 'Work-Details', icon: <MdAssignment /> },
  ];
  return (
    <>
      <UserProfile />
      <section>
            <div className="container mx-auto p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {navItems.map((item, index) => (
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
    </>
  )
}

export default SiteIncharge