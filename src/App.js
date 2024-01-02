import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import Accountant from './pages/Accountant';
import Design_Head from './pages/Design_Head';
import SiteIncharge from './pages/SiteIncharge';
import SiteSupervisour from './pages/SiteSupervisour';
import Quality_Engineer from './pages/Quality_Engineer';
import Design_Engineer from './pages/Design_Engineer';
import Marketing from './pages/Marketing';
import Dashboard from './pages/Dashboard';

const App = () => {
  const navigate = useNavigate()
  const PrivateRoute = ({ element, ...rest }) => {
    const { isLoggedIn } = useSelector((state) => {
      return state.auth
    });
  
    return isLoggedIn ? (
      <Route {...rest} element={element} />
    ) : (
      <Navigate to="/login" replace />
    );
  };
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <PrivateRoute path='/dashboard' element={<Dashboard />} />
        <PrivateRoute path='/ceo' element={<Ceo />} />
        <PrivateRoute path='/admin' element={<Admin />} />
        <PrivateRoute path='/client' element={<Clients />} />
        <PrivateRoute path='/design-head' element={<Design_Head />} />
        <PrivateRoute path='/site-incharge' element={<SiteIncharge />} />
        <PrivateRoute path='/site-supervisour' element={<SiteSupervisour />} />
        <PrivateRoute path='/marketing' element={<Marketing />} />
        <PrivateRoute path='/quality-engineer' element={<Quality_Engineer />} />
        <PrivateRoute path='/design-engineer' element={<Design_Engineer />} />
        <PrivateRoute path='/employee-profile' element={<CreateEmployee />} />
        <PrivateRoute path='/accountant' element={<Accountant />} />
        <PrivateRoute path='/contractors' element={<Contractors />} />
        <PrivateRoute path='/user' element={<UserManagement />} />
        <PrivateRoute path='/account' element={<Profile />} />
        <PrivateRoute path='/create-user' element={<CreateUser />} />
        <PrivateRoute path='/site' element={<Sites />} />
        <PrivateRoute path='/create-site' element={<CreateSite />} />
        <PrivateRoute path='/create-client' element={<CreateClient />} />
        <PrivateRoute path='/team' element={<TeamSection />} />
        <PrivateRoute path='/create-work-order' element={<CreateWorkOrder />} />
        <PrivateRoute path='/work-order' element={<WorkOrders />} />
        <PrivateRoute path='/create-work-details' element={<CreateWorkDetails />} />
        <PrivateRoute path='/create-project-schedule' element={<CreateProjectSchedule />} />
        <PrivateRoute path='/project-schedule' element={<ProjectSchedules />} />
        <PrivateRoute path='/payment-schedule' element={<PaymentSchedules />} />
        <PrivateRoute path='/create-payment-schedule' element={<CreatePaymentSchedule />} />
        <PrivateRoute path='/bill' element={<Bills />} />
        <PrivateRoute path='/create-bill' element={<CreateBill />} />
        <PrivateRoute path='/checklist' element={<CheckList />} />
        <PrivateRoute path='/create-contractors' element={<CreateContractor />} />
        <PrivateRoute path='/setting' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App