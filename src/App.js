import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserManagement from './pages/User';
import CreateUser from './components/CreateUser';
import Sites from './pages/Site';
import CreateSite from './components/CreateSite';
import Clients from './pages/Client';
import CreateClient from './components/CreateClient';
import TeamSection from './pages/Team';
import CreateEmployee from './components/CreateEmployee';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import WorkOrders from './pages/WorkOrder';
import CreateWorkOrder from './components/CreateWorkOrder';
import CreateWorkDetails from './components/CreateWorkDetail';
import ProjectSchedules from './pages/ProjectSchedules';
import CreateProjectSchedule from './components/CreateProjectSchedule';
import PaymentSchedules from './pages/PaymentSchedule';
import CreatePaymentSchedule from './components/CreatePaymentSchedule';
import Bills from './pages/Bill';
import CreateBill from './components/CreateBill';
import CheckList from './pages/CheckList';
import Contractors from './pages/Contractors';
import CreateContractor from './components/CreateContractor';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Ceo from './pages/Ceo';
import {UserContextProvider} from './context/AuthContext';

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/ceo' element={<Ceo/>}/>
        <Route path='/user' element={<UserManagement />} />
        <Route path='/create-user' element={<CreateUser />} />
        <Route path='/site' element={<Sites />} />
        <Route path='/create-site' element={<CreateSite />} />
        <Route path='/client' element={<Clients />} />
        <Route path='/create-client' element={<CreateClient />} />
        <Route path='/team' element={<TeamSection />} />
        <Route path='/create-employee' element={<CreateEmployee />} />
        <Route path='/account' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create-work-order' element={<CreateWorkOrder />} />
        <Route path='/work-order' element={<WorkOrders />} />
        <Route path='/create-work-details' element={<CreateWorkDetails />} />
        <Route path='/create-project-schedule' element={<CreateProjectSchedule />} />
        <Route path='/project-schedule' element={<ProjectSchedules />} />
        <Route path='/payment-schedule' element={<PaymentSchedules />} />
        <Route path='/create-payment-schedule' element={<CreatePaymentSchedule />} />
        <Route path='/bill' element={<Bills />} />
        <Route path='/create-bill' element={<CreateBill />} />
        <Route path='/checklist' element={<CheckList />} />
        <Route path='/contractors' element={<Contractors />} />
        <Route path='/create-contractors' element={<CreateContractor />} />
        <Route path='/setting' element={<Profile/>} />
      </Routes>
    </UserContextProvider>
  )
}

export default App