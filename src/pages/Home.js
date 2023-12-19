import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginForm from '../components/Login'
import Layout from './Layout'
import CreateWorkOrder from '../components/CreateWorkOrder'
import WorkDetailsForm from '../components/CreateWorkDetail'
import Register from '../components/Register'
import CreateBill from '../components/CreateBill'
import CreateProjectSchedule from '../components/CreateProjectSchedule'
import CreatePaymentSchedule from '../components/CreatePaymentSchedule'
import Profile from '../components/Profile';
import CreateUser from '../components/CreateUser';
import CreateSite from '../components/CreateSite';
import CreateEmployee from '../components/CreateEmployee';
import CreateClient from '../components/CreateClient';
import UserList from './User'

const Home = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />} />
      <Route path='/user' element={<UserList />} />
      <Route path='/create-user' element={<CreateUser />} />
      <Route path='/site' element={<CreateSite />} />
      <Route path='/client' element={<CreateClient />} />
      <Route path='/employee' element={<CreateEmployee />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/register' element={<Register />} />
      <Route path='/work-order' element={<CreateWorkOrder />} />
      <Route path='/work-details' element={<WorkDetailsForm />} />
      <Route path='/project-schedule' element={<CreateProjectSchedule />} />
      <Route path='/payment-schedule' element={<CreatePaymentSchedule />} />
      <Route path='/design' />
      <Route path='/bill' element={<CreateBill />} />
      <Route path='/checklist' />
      <Route path='/contractor' />
      <Route path='/material' />
      <Route path='/expenses' />
      <Route path='/users' />
      <Route path='/setting' element={<Profile/>} />
    </Routes>
  )
}

export default Home