import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import MobileBar from '../components/MobileBar'

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <MobileBar/>
    </>
  )
}

export default Layout