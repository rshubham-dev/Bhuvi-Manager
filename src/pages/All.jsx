import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdPerson, MdDateRange, MdPayment, MdLocationOn, MdBusiness, MdPeople, MdDesignServices, MdReceipt, MdPlaylistAddCheck, MdConstruction, MdBuild, MdMoney, MdAssignment, MdWork } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { BiSolidPurchaseTag } from "react-icons/bi";

const All = () => {
    const navItems = [
        { to: '/user', text: 'Users', icon: <MdPerson /> },
        { to: '/sites', text: 'Sites', icon: <MdLocationOn /> },
        { to: '/project-schedules', text: 'Project Schedules', icon: <MdDateRange /> },
        { to: '/payment-schedules', text: 'Payment Schedules', icon: <MdPayment /> },
        { to: '/quality-schedules', text: 'Quality Schedules', icon: <MdPlaylistAddCheck /> },
        { to: '/bills', text: 'Bills', icon: <MdReceipt /> },
        { to: '/work-orders', text: 'Work-Orders', icon: <MdWork /> },
        { to: '/purchase-order', text: 'Purchase-Orders', icon: <BiSolidPurchaseTag />  },
        { to: '/extra-work', text: 'Extra-Works', icon: <MdBuild /> },
        { to: '/clients', text: 'Clients', icon: <MdBusiness /> },
        { to: '/contractors', text: 'Contractors', icon: <MdConstruction /> },
        { to: '/suppliers', text: 'Suppliers', icon:''   },
        { to: '/employee', text: 'Employees', icon: <GrUserWorker />},
        { to: '/work-details', text: 'Work-Details', icon: <MdAssignment /> },
        // { to: '/design', text: 'Design', icon: <MdDesignServices /> },
        // { to: '/expenses', text: 'Expenses', icon: <MdMoney /> },
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