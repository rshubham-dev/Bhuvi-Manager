import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdPerson, MdDateRange, MdPayment, MdLocationOn, MdBusiness, MdPeople, MdDesignServices, MdReceipt, MdPlaylistAddCheck, MdConstruction, MdBuild, MdMoney, MdAssignment, MdWork } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { BiSolidPurchaseTag } from "react-icons/bi";

const All = () => {
    const navItems = [
        { to: '/user', text: 'User', icon: <MdPerson /> },
        { to: '/project-schedules', text: 'Project Schedule', icon: <MdDateRange /> },
        { to: '/payment-schedules', text: 'Payment Schedule', icon: <MdPayment /> },
        { to: '/sites', text: 'Site', icon: <MdLocationOn /> },
        { to: '/clients', text: 'Client', icon: <MdBusiness /> },
        { to: '/bills', text: 'Bill', icon: <MdReceipt /> },
        { to: '/contractors', text: 'Contractor', icon: <MdConstruction /> },
        { to: '/purchase-order', text: 'Purchase-Order', icon: <BiSolidPurchaseTag />  },
        // { to: '/checklist', text: 'Check-List', icon: <MdPlaylistAddCheck /> },
        // { to: '/design', text: 'Design', icon: <MdDesignServices /> },
        // { to: '/material-order', text: 'Material-Order', icon:''  },
        { to: '/suppliers', text: 'Supplier', icon:''   },
        { to: '/employee', text: 'Employee', icon: <GrUserWorker />},
        { to: '/extra-work', text: 'Extra-Work', icon: <MdBuild /> },
        // { to: '/expenses', text: 'Expenses', icon: <MdMoney /> },
        { to: '/work-details', text: 'Work-Details', icon: <MdAssignment /> },
        { to: '/work-orders', text: 'Work-Order', icon: <MdWork /> },
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