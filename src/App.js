import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserManagement from './pages/User';
import CreateUser from './components/CreateUser';
import Sites from './pages/Site';
import CreateSite from './components/CreateSite';
import Clients from './pages/Clients';
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
import Accountant from './pages/Accountant';
import Design_Head from './pages/Design_Head';
import SiteIncharge from './pages/SiteIncharge';
import SiteSupervisour from './pages/SiteSupervisour';
import Quality_Engineer from './pages/Quality_Engineer';
import Design_Engineer from './pages/Design_Engineer';
import Marketing from './pages/Marketing';
import Dashboard from './pages/Dashboard';
import Client from './pages/Client';
import { ProtectedRoute } from './components/ProtectedPages'; 



const App = () => {

    const { isLoggedIn } = useSelector((state) => {
      return state.auth
    });

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {/* <Route path='/ceo' element={<Ceo />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/client' element={<Client />} />
        <Route path='/design-head' element={<Design_Head />} />
        <Route path='/site-incharge' element={<SiteIncharge />} />
        <Route path='/site-supervisour' element={<SiteSupervisour />} />
        <Route path='/marketing' element={<Marketing />} />
        <Route path='/quality-engineer' element={<Quality_Engineer />} />
        <Route path='/design-engineer' element={<Design_Engineer />} />
      <Route path='/accountant' element={<Accountant />} /> */}
      <ProtectedRoute LoggedIn={isLoggedIn}>
        <Route path='/clients' element={<Clients />} />
      <Route path='/employee-profile' element={<CreateEmployee />} />
        <Route path='/contractors' element={<Contractors />} />
        <Route path='/user' element={<UserManagement />} />
        <Route path='/account' element={<Profile />} />
        <Route path='/create-user' element={<CreateUser />} />
        <Route path='/site' element={<Sites />} />
        <Route path='/create-site' element={<CreateSite />} />
        <Route path='/create-client' element={<CreateClient />} />
        <Route path='/team' element={<TeamSection />} />
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
        <Route path='/create-contractors' element={<CreateContractor />} />
        <Route path='/setting' element={<Profile />} />
      </ProtectedRoute>
      </Routes>
    </>
  )
}

export default App