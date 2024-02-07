import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserManagement from './pages/User.jsx';
import CreateUser from './components/CreateUser.jsx';
import Sites from './pages/Site.jsx';
import CreateSite from './components/CreateSite.jsx';
import Clients from './pages/Clients.jsx';
import CreateClient from './components/CreateClient.jsx';
import TeamSection from './pages/Team.jsx';
import CreateEmployee from './components/CreateEmployee.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import WorkOrders from './pages/WorkOrder.jsx';
import CreateWorkOrder from './components/CreateWorkOrder.jsx';
import CreateWorkDetails from './components/CreateWorkDetail.jsx';
import ProjectSchedules from './pages/ProjectSchedules.jsx';
import CreateProjectSchedule from './components/CreateProjectSchedule.jsx';
import PaymentSchedules from './pages/PaymentSchedule.jsx';
import CreatePaymentSchedule from './components/CreatePaymentSchedule.jsx';
import Bills from './pages/Bill.jsx';
import CreateBill from './components/CreateBill.jsx';
import CheckList from './pages/CheckList.jsx';
import Contractors from './pages/Contractors.jsx';
import CreateContractor from './components/CreateContractor.jsx';
import Admin from './pages/Admin.jsx';
import Accountant from './pages/Accountant.jsx';
import Design_Head from './pages/Design_Head.jsx';
import SiteIncharge from './pages/SiteIncharge.jsx';
import SiteSupervisour from './pages/SiteSupervisour.jsx';
import Quality_Engineer from './pages/Quality_Engineer.jsx';
import Design_Engineer from './pages/Design_Engineer.jsx';
import Marketing from './pages/Marketing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Client from './pages/Client.jsx';
import SiteScreen from './screen/SiteScreen.jsx';
import ClientScreen from './screen/ClientScreen.jsx';
import WorkOrderScreen from './screen/WorkOrderScreen.jsx'
import BillScreen from './screen/BillScreen.jsx';
import Payment_SchedulScreen from './screen/Payment_SchedulScreen.jsx';
import Project_ScheduleScreen from './screen/Project_ScheduleScreen.jsx';
import ContractorScreen from './screen/ContractorScreen.jsx';
import WorkDetails from './pages/WorkDetails.jsx';
import CreateExtraWork from './components/CreateExtraWork.jsx';
import ExtraWork from './pages/ExtraWork.jsx';
import CreateSupplier from './components/CreateSupplier.jsx';
import CreatePurchaseOrder from './components/CreatePurchaseOrder.jsx';
import PurchaseOrders from './pages/PurchaseOrders.jsx';
import Suppliers from './pages/Suppliers.jsx';
import PurchaseOrderScreen from './screen/PurchaseOrderScreen.jsx';
import Message from './pages/Message.jsx';
import Employee from './pages/Employee.jsx';
import Task from './pages/Task.jsx';
import ExtraWorkScreen from './screen/ExtraWorkScreen.jsx';
import { logout } from './features/auth/authSlice.js';
import QualitySchedules from './pages/QualitySchedules.jsx';
import CreateQualitySchedule from './components/CreateQualitySchedule.jsx';
import Layout from './components/Layout.jsx';
import './index.css';
import UserProfile from './components/ProfileCard.jsx';

const App = () => {

  const { isLoggedIn } = useSelector((state) => {
    return state.auth
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const isPageReloaded = performance.navigation.type === 1;
    if (isPageReloaded) {
      dispatch(logout());
      navigate('/')
      console.log('Reloaded')
    } else {
      console.log("This page is not reloaded");
    }
  }, []);


  return (
    <>
      <Layout>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/ceo' element={<Admin />} />
        <Route path='/client' element={<Client />} />
        <Route path='/design-head' element={<Design_Head />} />
        <Route path='/site-incharge' element={<SiteIncharge />} />
        <Route path='/site-supervisour' element={<SiteSupervisour />} />
        <Route path='/marketing' element={<Marketing />} />
        <Route path='/quality-engineer' element={<Quality_Engineer />} />
        <Route path='/design-engineer' element={<Design_Engineer />} />
        <Route path='/accountant' element={<Accountant />} />
        <Route path='/employee' element={<Employee />} />
        <Route path='/create-employee' element={<CreateEmployee />} />
        <Route path='/contractors' element={<Contractors />} />
        <Route path='/contractor/:id' element={<ContractorScreen />} />
        <Route path='/edit-contractor/:id' element={<CreateContractor />} />
        <Route path='/create-contractors' element={<CreateContractor />} />
        <Route path='/user' element={<UserManagement />} />
        <Route path='/account' element={<Profile />} />
        <Route path='/create-user' element={<CreateUser />} />
        <Route path='/edit-user/:id' element={<CreateUser />} />
        <Route path='/sites' element={<Sites />} />
        <Route path='/site/:id' element={<SiteScreen />} />
        <Route path='/create-site' element={<CreateSite />} />
        <Route path='/edit-site/:id' element={<CreateSite />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/client/:id' element={<ClientScreen />} />
        <Route path='/create-client' element={<CreateClient />} />
        <Route path='/edit-client/:id' element={<CreateClient />} />
        <Route path='/team' element={<TeamSection />} />
        <Route path='/edit-workOrder/:id' element={<CreateWorkOrder />} />
        <Route path='/edit-workOrder/:id/work/:index' element={<CreateWorkOrder />} />
        <Route path='/create-work-order' element={<CreateWorkOrder />} />
        <Route path='/work-orders' element={<WorkOrders />} />
        <Route path='/work-order/:id' element={<WorkOrderScreen />} />
        <Route path='/edit-work-detail/:id' element={<CreateWorkDetails />} />
        <Route path='/edit-work-detail/:id/:index' element={<CreateWorkDetails />} />
        <Route path='/create-work-details' element={<CreateWorkDetails />} />
        <Route path='/work-details' element={<WorkDetails />} />
        <Route path='/project-schedules' element={<ProjectSchedules />} />
        <Route path='/quality-schedules' element={<QualitySchedules />} />
        <Route path='/project-schedule/:id' element={<Project_ScheduleScreen />} />
        <Route path='/quality-schedule/:id' element={<Project_ScheduleScreen />} />
        <Route path='/edit-projectSchedule/:id/:index' element={<CreateProjectSchedule />} />
        <Route path='/edit-qualitySchedule/:id/:index' element={<CreateQualitySchedule />} />
        <Route path='/edit-projectSchedule/:id' element={<CreateProjectSchedule />} />
        <Route path='/edit-qualitySchedule/:id' element={<CreateQualitySchedule />} />
        <Route path='/create-project-schedule' element={<CreateProjectSchedule />} />
        <Route path='/create-quality-schedule' element={<CreateQualitySchedule />} />
        <Route path='/payment-schedules' element={<PaymentSchedules />} />
        <Route path='/payment-schedule/:id' element={<Payment_SchedulScreen />} />
        <Route path='/edit-paymentSchedule/:id' element={<CreatePaymentSchedule />} />
        <Route path='/edit-paymentSchedule/:id/:index' element={<CreatePaymentSchedule />} />
        <Route path='/create-payment-schedule' element={<CreatePaymentSchedule />} />
        <Route path='/bills' element={<Bills />} />
        <Route path='/bill' element={<BillScreen />} />
        <Route path='/edit-bill/:id' element={<CreateBill />} />
        <Route path='/create-bill' element={<CreateBill />} />
        <Route path='/extra-work' element={<ExtraWork />} />
        <Route path='/extra-work/:id' element={<ExtraWorkScreen />} />
        <Route path='/create-extra-work' element={<CreateExtraWork />} />
        <Route path='/edit-extra-work/:id' element={<CreateExtraWork />} />
        <Route path='/edit-extra-work/:id/work/:index' element={<CreateExtraWork />} />
        <Route path='/checklists' element={<CheckList />} />
        <Route path='/setting' element={<Profile />} />
        <Route path='/create-supplier' element={<CreateSupplier />} />
        <Route path='/edit-supplier/:id' element={<CreateSupplier />} />
        <Route path='/suppliers' element={<Suppliers />} />
        <Route path='/create-purchaseOrder' element={<CreatePurchaseOrder />} />
        <Route path='/edit-purchaseOrder/:id' element={<CreatePurchaseOrder />} />
        <Route path='/edit-purchaseOrder/:id/material/:index' element={<CreatePurchaseOrder />} />
        <Route path='/purchase-order' element={<PurchaseOrders />} />
        <Route path='/purchase-order/:id' element={<PurchaseOrderScreen />} />
        <Route path='/message' element={<Message />} />
        <Route path='/tasks' element={<Task />} />
      </Routes>
      </Layout>
    </>
  )
}
export default App;


