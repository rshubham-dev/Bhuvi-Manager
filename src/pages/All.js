import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdPerson, MdDateRange, MdPayment, MdLocationOn, MdBusiness, MdPeople, MdDesignServices, MdReceipt, MdPlaylistAddCheck, MdConstruction, MdBuild, MdMoney, MdAssignment, MdWork } from "react-icons/md";

const All = () => {
    const navItems = [
        { to: '/user', text: 'User', icon: <MdPerson /> },
        { to: '/project-schedule', text: 'Project Schedule', icon: <MdDateRange /> },
        { to: '/payment-schedule', text: 'Payment Schedule', icon: <MdPayment /> },
        { to: '/site', text: 'Site', icon: <MdLocationOn /> },
        { to: '/client', text: 'Client', icon: <MdBusiness /> },
        { to: '/employee', text: 'Employee', icon: <MdPeople /> },
        { to: '/design', text: 'Design', icon: <MdDesignServices /> },
        { to: '/bill', text: 'Bill', icon: <MdReceipt /> },
        { to: '/checklist', text: 'Check-List', icon: <MdPlaylistAddCheck /> },
        { to: '/contractor', text: 'Contractor', icon: <MdConstruction /> },
        { to: '/material', text: 'Material', icon: <MdBuild /> },
        { to: '/expenses', text: 'Expenses', icon: <MdMoney /> },
        { to: '/work-details', text: 'WorkDetails', icon: <MdAssignment /> },
        { to: '/work-order', text: 'WorkOrder', icon: <MdWork /> },
    ];

    return (
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
    );
}

export default All;