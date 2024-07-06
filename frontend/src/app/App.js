// Landing Page of the Product
// Has React routes of other pages
// All Project Modules are being imported to this page.

import React from 'react';
import '../assets/styles.css';
import Content from '../users/home/Content';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from '../log/SignupPage';
import LoginPage from '../log/LoginPage';
import Dashboard from '../users/home/Dashboard';
import Terms from '../common/Terms';
import Privacy from '../common/Privacy';
import SettingsPage from '../common/Settings';
import HelpPage from '../common/Help';
import AdminLoginPage from '../log/AdminLogin';
import AdminDashboard from '../admin/pages/AdminDash';
import Hospital from '../admin/services/healthcare/AdminHospital';
import AdminUserAccess from '../admin/users/AdminUserAccess';
import AdminFeatures from '../admin/pages/AdminFeatures';
import HospitalPortal from '../admin/services/healthcare/AdminViewHosp';
import MarketAccess from '../users/services/marketaccess/MarketAccess';
import CityPortal from '../admin/services/healthcare/AdminCityHosp';
import Dealers from '../admin/services/medtech/AdminDealers';
import DealerPortal from '../admin/services/medtech/AdminViewDealer';
import Products from '../admin/services/products/AdminProducts';
import ProductPortal from '../admin/services/products/AdminViewProducts';
import StartupForm from '../admin/services/startups/AdminStartups';
import StartupPortal from '../admin/services/startups/AdminViewStartup';
import CreateProject from '../admin/services/projects/AdminProjects';
import UpdateProject from '../admin/services/projects/AdminUpdateProjects';
import MarketAccessAll from '../users/services/marketaccess/MarketAccessAll';
import AdminSaveProject from '../admin/services/projects/AdminSaveProject';
import NotFoundPage from '../common/NotFound';
import AdminHelpPage from '../common/AdminHelp';
import AddContent from '../admin/services/content/addcontent';
import ViewContent from '../admin/services/content/viewcontent';
import PartnersPage from '../users/services/partners/viewpartners';
import AdminSettings from './../common/AdminSettings';
import MarketInsights from '../users/services/marketinsights/MarketInsights';
import LandingPage2 from '../users/home/LandingPage2';
import HomePage from '../users/home/HomePage';
import PanIndiaDash from '../admin/pages/PanIndiaDash';
import CompetitiveIntelligence from '../admin/services/intel/AdminCompIntel';
import AdminNotFoundPage from '../admin/services/logs/AdminAuditlogs';
import AdminViewCI from '../admin/services/intel/AdminViewCI';
import PanIndia from '../users/home/PanIndia';
import NewCSRForm from '../admin/services/csr/addcsr';
import CSRPortal from '../admin/services/csr/viewcsr';
import ViewCSRPortal from '../users/services/csrs/CSRAccess';
import StateDetails from '../admin/pages/StateDetails';
import Subscription from '../common/Subscribe';
import BillingForm from '../admin/pages/EvalPDF';
import AdminBill from '../admin/services/products/AdminBill';
import LandingPage3 from '../users/home/LP3';
import LandingPage4 from '../users/home/Mr-Home';
import LandingPage5 from '../users/home/mrLand5';
import UserStateDetails from '../users/home/uStateDetails';
import SalesForm from '../users/services/sales/sales';
import ViewSales from '../users/services/sales/viewsales';
import CityDetails from '../admin/pages/CityDetails';
import UserCityDetails from '../users/home/uCityDetails';
import AdNotFoundPage from '../common/AdNotFount';
import UserHospital from '../users/services/marketaccess/Marketform';


//Entry Function into the Product
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home3 />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/admin' element={<AdminLoginPage />} />
        <Route path='/admin/dashboard/Features' element={<AdminFeatures />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='admin/dashboard/Add-Hospital' element={<Hospital />} />
        <Route path='admin/dashboard/View-Hospital' element={<HospitalPortal />} />
        <Route path='admin/dashboard/City-Hospital' element={<CityPortal />} />
        <Route path='admin/dashboard/User-Dashboard' element={<AdminUserAccess />} />
        <Route path='admin/dashboard/Add-MedTech-Companies' element={<Dealers />} />
        <Route path='admin/dashboard/View-MedTech-Companies' element={<DealerPortal />} />
        <Route path='admin/dashboard/Add-Products' element={<Products />} />
        <Route path='admin/dashboard/View-Products' element={<ProductPortal />} />
        <Route path='admin/dashboard/Add-Startups' element={<StartupForm />} />
        <Route path='admin/dashboard/View-Startups' element={<StartupPortal />} />
        <Route path='admin/dashboard/Create-Project' element={<CreateProject />} />
        <Route path='admin/dashboard/Update-Project' element={<UpdateProject />} />
        <Route path='/home' element={<Home />} />
        <Route path='/home-mr' element={<HomeMR />} />
        <Route path='/home-mr2' element={<HomeMR2 />} />
        <Route path='/home-mr3' element={<HomeMR3 />} />
        <Route path='/home-2' element = {<Home2 />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path='/termsofuse' element={<Terms />} />
        <Route path='/privacypolicy' element={<Privacy />} />
        <Route path="/dashboard/Market-Access" element={<MarketAccess />} />
        <Route path="/dashboard/Pan-India-Analysis" element={<PanIndia />} />
        <Route path='/dashboard/View-Healthcare-Centres-All' element={<MarketAccessAll />} />
        <Route path='/dashboard/Market-Insights' element={<MarketInsights />} />
        <Route path='/dashboard/form-healthcare' element = {<UserHospital />} />

        <Route path='/admin/dashboard/Save-Project' element={<AdminSaveProject />} />
        <Route path='/admin/dashboard/Add-Content' element={<AddContent />} />
        <Route path='/admin/dashboard/View-Content' element={<ViewContent />} />
        <Route path='/admin/dashboard/Pan-India-Dashboard' element={<PanIndiaDash />} />
        <Route path='/admin/help' element={<AdminHelpPage />} />
        <Route path='/admin/settings' element={<AdminSettings />} />
        <Route path='/dashboard/Access-GTM-Partners' element={<PartnersPage />} />
        <Route path='/admin/competitive-intelligence' element = {<CompetitiveIntelligence />} />
        <Route path='/dashboard/Subscription' element = {<Subscription />} />
        <Route path="/dashboard/Sales-Tracker" element={<SalesForm />} />
        <Route path='/admin/view-competitive-intelligence' element = {<AdminViewCI />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/admin/audit-logs' element={<AdminNotFoundPage />} />
        <Route path='/admin/dashboard/Add-CSR-Foundation' element = {<NewCSRForm />} />
        <Route path='/admin/dashboard/View-CSR-Foundation' element = {<CSRPortal />} />
        <Route path="/state-details/:state" element={<StateDetails />} />
        <Route path="/city/:city" element={<CityDetails />} />
        <Route path="/dashboard/city-analysis/:city" element={<UserCityDetails />} />
        <Route path="/dashboard/state-details/:state" element={<UserStateDetails />} />
        <Route path='/dashboard/CSRs-Foundations' element = {<ViewCSRPortal />} />
        <Route path='/admin/dashboard/Eval-PDF' element = {<BillingForm />} />
        <Route path='/admin/dashboard/Admin-Bill' element = {<AdminBill />} />
        <Route path='/dashboard/View-Sales-Progress' element = {<ViewSales />}  /> 
        <Route path='/admin/academy' element = {<AdNotFoundPage />}  /> 
       
      </Routes>
    </Router>
  );
}

function HomeMR2(){
  return (
    <div className="landing-page">
      <div className="content">
        <LandingPage3 />
       </div>
     </div>
  ); 
}

function HomeMR(){
  return (
    <div className="landing-page">
      <div className="content">
        <LandingPage4 />
       </div>
     </div>
  ); 
}

function HomeMR3(){
  return (
    <div className="landing-page">
      <div className="content">
        <LandingPage5 />
       </div>
     </div>
  ); 
}

//Landing Page
function Home() {
  return (
    <div className="landing-page">
      <div className="content">
        <LandingPage2 />
       </div>
     </div>
  );
}

function Home2(){
  return (
    <div className="landing-page">
      <div className="content">
        <Content />
      </div>
    </div>
  );
}

const Home3 = () => {
  return (
    <div className="landing-page">
      <div className="content">
        <HomePage />
      </div>
    </div>
  );
}