// Landing Page of the Product
// Has React routes of other pages
// All Project Modules are being imported to this page.

import React from 'react';
import './styles.css';
import Content from './Content';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import Dashboard from './Dashboard';
import Terms from './Terms';
import Privacy from './Privacy';
import SettingsPage from './Settings';
import HelpPage from './Help';
import AdminLoginPage from './components/AdminLogin';
import AdminDashboard from './AdminDash';
import Hospital from './AdminHospital';
import AdminUserAccess from './AdminUserAccess';
import AdminFeatures from './AdminFeatures';
import HospitalPortal from './AdminViewHosp';
import MarketAccess from './MarketAccess';
import CityPortal from './AdminCityHosp';
import Dealers from './AdminDealers';
import DealerPortal from './AdminViewDealer';
import Products from './AdminProducts';
import ProductPortal from './AdminViewProducts';
import StartupForm from './AdminStartups';
import StartupPortal from './AdminViewStartup';
import CreateProject from './AdminProjects';
import UpdateProject from './AdminUpdateProjects';
//import PrivateRoute from './components/Privateroute';

//Entry Function into the Product
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard"element={<Dashboard />} />
        {/* <Route
          path="/dashboard*"
          element={
            <PrivateRoute
              element={<Dashboard />}
            /> /* Wrap PrivateRoute inside the element prop */
          }
        {/* /> Use PrivateRoute for the dashboard */} 
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
        <Route path="/help" element={<HelpPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path='/termsofuse' element={<Terms />} />
        <Route path='/privacypolicy' element={<Privacy />} />
        <Route path="/dashboard/Market-Access" element={<MarketAccess />} />
      </Routes>
    </Router>
  );
}

//Landing Page
function Home() {
  return (
    <div className="landing-page">
      <div className="content">
        <Content />
      </div>
    </div>
  );
}
