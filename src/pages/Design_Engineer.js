import React from 'react';
import { MdPerson, MdDateRange, MdPayment, MdLocationOn, MdBusiness, MdPeople, MdDesignServices, MdReceipt, MdPlaylistAddCheck, MdConstruction, MdBuild, MdMoney, MdAssignment, MdWork } from "react-icons/md";

const Design_Engineer = () => {
  const Items = [
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
    <div>Design_Engineer</div>
  )
}

export default Design_Engineer