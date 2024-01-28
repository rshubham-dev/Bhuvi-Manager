import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserManagement from './pages/User.js';
import CreateUser from './components/CreateUser.js';
import Sites from './pages/Site.js';
import CreateSite from './components/CreateSite.js';
import Clients from './pages/Clients.js';
import CreateClient from './components/CreateClient.js';
import TeamSection from './pages/Team.js';
import CreateEmployee from './components/CreateEmployee.js';
import Profile from './components/Profile.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import WorkOrders from './pages/WorkOrder.js';
import CreateWorkOrder from './components/CreateWorkOrder.js';
import CreateWorkDetails from './components/CreateWorkDetail.js';
import ProjectSchedules from './pages/ProjectSchedules.js';
import CreateProjectSchedule from './components/CreateProjectSchedule.js';
import PaymentSchedules from './pages/PaymentSchedule.js';
import CreatePaymentSchedule from './components/CreatePaymentSchedule.js';
import Bills from './pages/Bill.js';
import CreateBill from './components/CreateBill.js';
import CheckList from './pages/CheckList.js';
import Contractors from './pages/Contractors.js';
import CreateContractor from './components/CreateContractor.js';
import Admin from './pages/Admin.js';
import Home from './pages/Home.js';
import Accountant from './pages/Accountant.js';
import Design_Head from './pages/Design_Head.js';
import SiteIncharge from './pages/SiteIncharge.js';
import SiteSupervisour from './pages/SiteSupervisour.js';
import Quality_Engineer from './pages/Quality_Engineer.js';
import Design_Engineer from './pages/Design_Engineer.js';
import Marketing from './pages/Marketing.js';
import Dashboard from './pages/Dashboard.js';
import Client from './pages/Client.js';
import { ProtectedRoute } from './components/ProtectedPages.js';
import SiteScreen from './screen/SiteScreen.js';
import ClientScreen from './screen/ClientScreen.js';
import WorkOrderScreen from './screen/WorkOrderScreen.js'
import BillScreen from './screen/BillScreen.js';
import Payment_SchedulScreen from './screen/Payment_SchedulScreen.js';
import Project_ScheduleScreen from './screen/Project_ScheduleScreen.js';
import ContractorScreen from './screen/ContractorScreen.js';
import WorkDetails from './pages/WorkDetails.js';
import CreateExtraWork from './components/CreateExtraWork.js';
import ExtraWork from './pages/ExtraWork.js';
import CreateSupplier from './components/CreateSupplier.js';
import CreatePurchaseOrder from './components/CreatePurchaseOrder.js';
import PurchaseOrders from './pages/PurchaseOrders.js';
import Suppliers from './pages/Suppliers.js';
import PurchaseOrderScreen from './screen/PurchaseOrderScreen.js';
import Message from './pages/Message.js';
import Employee from './pages/Employee.js';
import Task from './pages/Task.js';
import ExtraWorkScreen from './screen/ExtraWorkScreen.js';
import { logout } from './features/auth/authSlice.js';


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
      navigate('/login')
      console.log('Reloaded')
    } else {
      console.log( "This page is not reloaded");
    }
  }, []);


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <ProtectedRoute LoggedIn={isLoggedIn}> */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/ceo' element={<Admin />} />
        <Route path='/Client-dashboard' element={<Client />} />
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
        <Route path='/edit-user' element={<CreateUser />} />
        <Route path='/sites' element={<Sites />} />
        <Route path='/site/:id' element={<SiteScreen />} />
        <Route path='/create-site' element={<CreateSite />} />
        <Route path='/edit-site/:id' element={<CreateSite />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/client' element={<ClientScreen />} />
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
        <Route path='/project-schedule/:id' element={<Project_ScheduleScreen />} />
        <Route path='/edit-projectSchedule/:id/:index' element={<CreateProjectSchedule />} />
        <Route path='/edit-projectSchedule/:id' element={<CreateProjectSchedule />} />
        <Route path='/create-project-schedule' element={<CreateProjectSchedule />} />
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
        {/* </ProtectedRoute> */}
      </Routes>
    </>
  )
}
export default App;


