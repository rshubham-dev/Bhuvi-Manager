import React, { useState } from 'react';
import { Menu, Tooltip } from 'antd';
import { MdPerson, MdDateRange, MdPayment, MdLocationOn, MdBusiness, MdPeople, MdReceipt, MdPlaylistAddCheck, MdConstruction, MdBuild, MdMoney, MdAssignment, MdWork } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { AiFillPieChart } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom';

const MenuList = () => {
  const [collapsed, setCollapsed] = useState(true);
    const Menus = [
        { 
          to: '/', 
          name: 'Dashboard', 
          icon: <AiFillPieChart style={{ width: '20px', height: '20px' }} /> 
        },
        // { 
        //   to: '/profile', 
        //   name: 'Profile', 
        //   icon: <CgProfile style={{ width: '20px', height: '20px' }} /> 
        // },
        { 
          to: '/user', 
          name: 'Users', 
          icon: <MdPerson style={{ width: '20px', height: '20px' }} /> 
        },
        { 
          to: '/sites', 
          name: 'Sites', 
          icon: <MdLocationOn style={{ width: '20px', height: '20px' }} /> 
        },
        { 
          to: '/project-schedules', 
          name: 'Project Schedules', 
          icon: <MdDateRange style={{ width: '20px', height: '20px' }} /> 
        },
        { 
          to: '/payment-schedules', 
          name: 'Payment Schedules', 
          icon: <MdPayment style={{ width: '20px', height: '20px' }} /> 
        },
        // { 
        //   to: '/quality-schedules', 
        //   name: 'Quality Schedules', 
        //   icon: <MdPlaylistAddCheck /> 
        // },
        { 
          to: '/bills', 
          name: 'Bills', 
          icon: <MdReceipt style={{ width: '20px', height: '20px' }} /> 
        },
        { 
          to: '/work-orders', 
          name: 'Work-Orders', 
          icon: <MdWork style={{ width: '20px', height: '20px' }} /> 
        },
        { 
          to: '/purchase-order', 
          name: 'Purchase-Orders', 
          icon: <BiSolidPurchaseTag style={{ width: '20px', height: '20px' }} /> },
        { 
          to: '/extra-work', 
          name: 'Extra-Works', 
          icon: <MdBuild style={{ width: '20px', height: '20px' }} /> 
        },
        { 
          to: '/clients', 
          name: 'Clients', 
          icon: <MdBusiness style={{ width: '20px', height: '20px' }} /> 
        },
        { 
          to: '/contractors', 
          name: 'Contractors', 
          icon: <MdConstruction style={{ width: '20px', height: '20px' }} /> 
        },
        { 
          to: '/suppliers', 
          name: 'Suppliers', 
          icon: '' 
        },
        { 
          to: '/employee', 
          name: 'Employees', 
          icon: <GrUserWorker style={{ width: '20px', height: '20px' }} /> 
        },
        // { 
        //   to: '/work-details', 
        //   name: 'Work-Details', 
        //   icon: <MdAssignment style={{ width: '20px', height: '20px' }} /> 
        // },
        // { 
        //   to: '/design', 
        //   name: 'Design', 
        //   icon: <MdDesignServices style={{ width: '20px', height: '20px' }} /> 
        // },
        // { 
        //   to: '/expenses', 
        //   name: 'Expenses', 
        //   icon: <MdMoney style={{ width: '20px', height: '20px' }} /> 
        // },
      ]
  return (
    <Menu
      theme="dark"
      mode="inline"
      style={{ margin: '20px 0px 40px 0px' }}
      defaultSelectedKeys={['0']}
      inlineCollapsed={collapsed}
    >
      {Menus.map((menu, index) => (
        <Menu.Item
          key={index}
          icon={menu.icon}
          style={{ fontSize: '16px', padding: '0px 4px' }}
        >
            <Link to={menu.to} onClick={() => setCollapsed(false)}>
              {menu.name}
            </Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default MenuList