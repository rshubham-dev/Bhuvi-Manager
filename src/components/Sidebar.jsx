import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdPerson, MdDateRange, MdOutlineCancel, MdPayment, MdLocationOn, MdBusiness, MdPeople, MdReceipt, MdPlaylistAddCheck, MdConstruction, MdBuild, MdMoney, MdAssignment, MdWork } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { AiFillPieChart } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import logo from '../asset/logo.png';
import { useStateContext } from '../contexts/ContextProvider.jsx';
import { AiOutlineMenu } from 'react-icons/ai';
// import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const Sidebar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  const activeLink = 'flex item-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-1.5'
  const normalLink = 'flex item-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-700 dark:text-gray-200 text-md dark:hover:text-black hover:bg-light-gray m-1.5'
  const Menus = [
    {
      to: '/',
      name: 'Dashboard',
      icon: <AiFillPieChart />
    },
    {
      to: '/profile',
      name: 'Profile',
      icon: <CgProfile />
    },
    {
      to: '/user',
      name: 'Users',
      icon: <MdPerson />
    },
    {
      to: '/sites',
      name: 'Sites',
      icon: <MdLocationOn />
    },
    {
      to: '/project-schedules',
      name: 'Project Schedules',
      icon: <MdDateRange />
    },
    {
      to: '/payment-schedules',
      name: 'Payment Schedules',
      icon: <MdPayment />
    },
    // { 
    //   to: '/quality-schedules', 
    //   name: 'Quality Schedules', 
    //   icon: <MdPlaylistAddCheck /> 
    // },
    {
      to: '/bills',
      name: 'Bills',
      icon: <MdReceipt />
    },
    {
      to: '/work-orders',
      name: 'Work-Orders',
      icon: <MdWork />
    },
    {
      to: '/purchase-order',
      name: 'Purchase-Orders',
      icon: <BiSolidPurchaseTag />
    },
    {
      to: '/extra-work',
      name: 'Extra-Works',
      icon: <MdBuild />
    },
    {
      to: '/clients',
      name: 'Clients',
      icon: <MdBusiness />
    },
    {
      to: '/contractors',
      name: 'Contractors',
      icon: <MdConstruction />
    },
    {
      to: '/suppliers',
      name: 'Suppliers',
      icon: ''
    },
    {
      to: '/employee',
      name: 'Employees',
      icon: <GrUserWorker />
    },
    // { 
    //   to: '/work-details', 
    //   name: 'Work-Details', 
    //   icon: <MdAssignment /> 
    // },
    // { 
    //   to: '/design', 
    //   name: 'Design', 
    //   icon: <MdDesignServices /> 
    // },
    // { 
    //   to: '/expenses', 
    //   name: 'Expenses', 
    //   icon: <MdMoney /> 
    // },
  ]
  return (
    <div className='h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'
      style={{
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none',
      }}>
      <div className="flex justify-center gap-1 items-center my-2">
        <img src={logo} alt="logo" className='rounded-full w-14 h-14' />
          <span className={`uppercase transition-all text-sm delay-100 duration-300 ease-in ${activeMenu ? 'inline text-lg ' : 'hidden'} items-center flex font-extrabold ml-1 dark:text-white text-slate-900`}>
            Bhuvi Consultants
          </span>

        {/* <TooltipComponent 
      content="Menu"
      position='BottomCenter'>
        <button 
        type='button'
        onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        className='text-xl rounded-full p-2 hover:bg-light-gray mt-4 block md:hidden'>
          <MdOutlineCancel />
        </button>
        </TooltipComponent>   */}
      </div>

      <div className="mb-10 mt-4">
        {Menus.map((menu, index) => (
          <div key={index}>
            <NavLink to={menu.to}
              onClick={() => { }}
              className={({ isActive }) => isActive ? activeLink : normalLink}>
              <span className='text-xl'>
                {menu.icon}
              </span>
              <span className={`capitalize ${activeMenu ? 'inline' : 'hidden'}`}> {menu.name} </span>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar