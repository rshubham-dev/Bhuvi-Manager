import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdAccountBalanceWallet, MdDashboard, MdSettings, MdMessage, MdLocationOn } from "react-icons/md";
import { GoBackward, GoForward } from './Navigation.jsx';
import { FaTasks } from "react-icons/fa";
import { useSelector } from 'react-redux';

const MobileBar = () => {
    const { user, isLoggedIn } = useSelector((state) => {
        return state.auth
    });
    const navigate = useNavigate();
    const handleRedirect = (id) => {
        navigate(`/site/${id}`);
      }
    if (isLoggedIn) {
        return (
            <section className='fixed flex justify-between mx-auto z-10 mt-4 bg-red-700'>
                    <div>
                    <GoBackward />
                    </div>
                    <div className='self-end'>
                    <GoForward />
                    </div>
            </section>
        )
    }
}

export default MobileBar;
