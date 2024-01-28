import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdAccountBalanceWallet, MdDashboard, MdSettings, MdMessage } from "react-icons/md";
import { GoBackward, GoForward } from './Navigation';
import { FaTasks } from "react-icons/fa";

const MobileBar = () => {
    return (
        <section className='fixed bottom-0 w-full z-10'>
            <div className="flex items-center justify-between mx-6 md:mx-14 mb-4">
                <GoBackward />
                <GoForward />
            </div>
            <div className='flex justify-around bg-blue-500 p-2 mt-2'>
                <NavLink to='/dashboard' className='text-white flex flex-col items-center'>
                    <MdDashboard className='text-xl mb-1 lg:text-2xl' />
                    Dashboard
                </NavLink>
                {/* <NavLink to='/expenses' className='text-white flex flex-col items-center'>
                    <MdAccountBalanceWallet className='text-xl mb-1 lg:text-2xl' />
                    Expense
                </NavLink> */}
                <NavLink to='/tasks' className='text-white flex flex-col items-center'>
                <FaTasks className='text-xl mb-1 lg:text-2xl' />
                    Task
                </NavLink>
                <NavLink to='/message' className='text-white flex flex-col items-center'>
                <MdMessage className='text-xl mb-1 lg:text-2xl' />
                    Message
                </NavLink>
                {/* <NavLink to='/setting' className='text-white flex flex-col items-center'>
                    <MdSettings className='text-xl mb-1 lg:text-2xl' />
                    Setting
                </NavLink> */}
            </div>
        </section>
    )
}

export default MobileBar;
