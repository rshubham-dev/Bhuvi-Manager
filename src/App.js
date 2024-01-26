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
import SiteScreen from './screen/SiteScreen';
import ClientScreen from './screen/ClientScreen';
import WorkOrderScreen from './screen/WorkOrderScreen'
import BillScreen from './screen/BillScreen';
import Payment_SchedulScreen from './screen/Payment_SchedulScreen';
import Project_ScheduleScreen from './screen/Project_ScheduleScreen';
import ContractorScreen from './screen/ContractorScreen';
import WorkDetails from './pages/WorkDetails';
import CreateExtraWork from './components/CreateExtraWork';
import ExtraWork from './pages/ExtraWork';
import CreateSupplier from './components/CreateSupplier';
import CreatePurchaseOrder from './components/CreatePurchaseOrder';
import CreateMaterialOrder from './components/CreateMaterialOrder';
import PurchaseOrders from './pages/PurchaseOrders';
import Suppliers from './pages/Suppliers';
import EditDetails from './components/EditDetails';
import PurchaseOrderScreen from './screen/PurchaseOrderScreen';
import Message from './pages/Message';
import Employee from './pages/Employee';
import Task from './pages/Task';
import ExtraWorkScreen from './screen/ExtraWorkScreen';

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
        {/* <ProtectedRoute LoggedIn={isLoggedIn}> */}
        <Route path='/ceo' element={<Admin />} />
        <Route path='/admin' element={<Admin />} />
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

export default App