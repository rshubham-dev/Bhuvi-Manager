import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserManagement from './pages/User';
import CreateUser from './components/CreateUser';
import CreateSite from './components/CreateSite';
import CreateClient from './components/CreateClient';
import CreateEmployee from './components/CreateEmployee';
import Profile from './components/Profile';
import LoginForm from './components/Login';
import Register from './components/Register';
import WorkOrderForm from './components/CreateWorkOrder';
import WorkDetailsForm from './components/CreateWorkDetail';
import CreateProjectSchedule from './components/CreateProjectSchedule';
import CreatePaymentSchedule from './components/CreatePaymentSchedule';
import CreateBill from './components/CreateBill';
import Admin from './pages/Admin';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Admin />} />
        <Route path='/user' element={<UserManagement />} />
        <Route path='/create-user' element={<CreateUser />} />
        <Route path='/site' element={<CreateSite />} />
        <Route path='/client' element={<CreateClient />} />
        <Route path='/employee' element={<CreateEmployee />} />
        <Route path='/account' element={<Profile />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<Register />} />
        <Route path='/work-order' element={<WorkOrderForm />} />
        <Route path='/work-details' element={<WorkDetailsForm />} />
        <Route path='/project-schedule' element={<CreateProjectSchedule />} />
        <Route path='/payment-schedule' element={<CreatePaymentSchedule />} />
        <Route path='/bill' element={<CreateBill />} />
        <Route path='/setting' element={<Profile/>} />
      </Routes>
    </>
  )
}

export default App