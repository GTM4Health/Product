// User menu bar here.
//
import React, { useState, useRef, useEffect } from "react";

import Dashboard from './../../users/home/Dashboard';
import { useNavigate } from "react-router-dom";
import CompetitiveIntelligence from './../../admin/services/intel/AdminCompIntel';

const MenuBar = () => {
  const [isHealthcareCentresMenuOpen, setIsHealthcareCentresMenuOpen] = useState(false);
  const [isDashBoardMenuOpen,setIsDashBoardMenuOpen] = useState(false);
  const [isSalesMenuOpen, setIsSalesMenuOpen] = useState(false);
  const [isCompetitiveIntelMenuOpen, setIsCompetitiveIntelMenuOpen] = useState(false);
  const [isMedTechMenuOpen, setIsMedTechMenuOpen] = useState(false);
  const [isStartupsMenuOpen, setIsStartupsMenuOpen] = useState(false);

  const medTechMenuRef = useRef(null);
  const healthcareCentresMenuRef = useRef(null);
  const dashBoardMenuRef=useRef(null);
  const salesMenuRef = useRef(null);
  const competitiveIntelMenuRef = useRef(null);
  const startupsMenuRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (healthcareCentresMenuRef.current && !healthcareCentresMenuRef.current.contains(event.target)) {
        setIsHealthcareCentresMenuOpen(false);
      }
      if (dashBoardMenuRef.current && !dashBoardMenuRef.current.contains(event.target)) {
        setIsDashBoardMenuOpen(false);
      }
      if(salesMenuRef.current && !salesMenuRef.current.contains(event.target)){
        setIsSalesMenuOpen(false);
      }
      if (competitiveIntelMenuRef.current && !competitiveIntelMenuRef.current.contains(event.target)) {
        setIsCompetitiveIntelMenuOpen(false);
      }
      if (medTechMenuRef.current && !medTechMenuRef.current.contains(event.target)) {
        setIsMedTechMenuOpen(false);
      }
      if (startupsMenuRef.current && !startupsMenuRef.current.contains(event.target)) {
        setIsStartupsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleHealthcareCentresMenuClick = () => {
    setIsHealthcareCentresMenuOpen(!isHealthcareCentresMenuOpen);
  };

  const handleDashboardMenuClick = () => {
    setIsDashBoardMenuOpen(!isDashBoardMenuOpen);

    if (!isDashBoardMenuOpen) {
      navigate('/dashboard');
    }
  };

  const handleSalesMenuClick = () => {
    setIsSalesMenuOpen(!isSalesMenuOpen);
  };

  const handleMedTechMenuClick = () => {
    setIsMedTechMenuOpen(!isMedTechMenuOpen);
  };

  const handleCompetitiveIntelMenuClick = () => {
    setIsCompetitiveIntelMenuOpen(!isCompetitiveIntelMenuOpen);
    // navigate('/admin/competitive-intelligence');
  };
  const handleStartupsMenuClick = () => {
    setIsStartupsMenuOpen(!isStartupsMenuOpen);
  };
  return (
    <div className="adbar usrbar"> 
      <div
        className={`menu-item ${
          isDashBoardMenuOpen ? "active" : ""
        }`}
        onClick={handleDashboardMenuClick}
        ref={dashBoardMenuRef}
      >
          <i className="fas fa-chart-bar menu-icon"></i>
          <span className="menu-text">Dashboard</span>
          {isDashBoardMenuOpen && (
          <div className="sub-menu healthcare-centres-menu">
            <a href="/dashboard/Pan-India-Analysis" className="sub-menu-item menu-link">
              <i className="fas fa-map-marked-alt sub-menu-icon"></i>
              <span className="menu-text">Pan India Dashboard</span>
            </a>
          </div>
          )}
      </div>
      
      <div
        className={`menu-item ${
          isHealthcareCentresMenuOpen ? "active" : ""
        }`}
        onClick={handleHealthcareCentresMenuClick}
        ref={healthcareCentresMenuRef}
      >
        <i className="fas fa-chart-line menu-icon"></i>
        <span className="menu-text">Access Healthcare Centres</span>
        {isHealthcareCentresMenuOpen && (
          <div className="sub-menu healthcare-centres-menu">
            {/* <a href="/dashboard/View-Healthcare-Centres-All" className="sub-menu-item menu-link">
              <i className="fas fa-hospital sub-menu-icon"></i>
              <span className="menu-text">View All Healthcare Centres</span>
            </a> */}
            <a href="/dashboard/form-healthcare" className="sub-menu-item menu-link og-tag">
              <i className="fas fa-building sub-menu-icon"></i>
              <span className="menu-text">Add Healthcare Centres</span>
            </a>
            <a href="/dashboard/Market-Access" className="sub-menu-item menu-link">
              <i className="fas fa-map-marked-alt sub-menu-icon"></i>
              <span className="menu-text">View Healthcare Centres - City Wise</span>
            </a>
          </div>
        )}
      </div>
      {/* <a href="/dashboard/Access-GTM-Partners" className="menu-link">
        <div className="menu-item">
          <i className="fas fa-check-circle menu-icon"></i>
          <span className="menu-text">Access GTM Partners</span>
        </div>
      </a> */}
      <div
        className={`menu-item ad-menu-item ${
          isMedTechMenuOpen ? "active" : ""
        }`}
        onClick={handleMedTechMenuClick}
        ref={medTechMenuRef}
      >
        <i className="fas fa-microscope menu-icon"></i>
        <span className="menu-text">Access Dealers & Distributors</span>
        {isMedTechMenuOpen && (
          <div className="sub-menu medtech-menu">
            <a href="/dashboard/Add-MedTech-Companies" className="sub-menu-item menu-link">
              <i className="fas fa-plus sub-menu-icon"></i>
              <span className="menu-text">Add Dealers & Distributors</span>
            </a>
            <a href="/dashboard/Access-GTM-Partners" className="sub-menu-item menu-link">
              <i className="fas fa-chart-line sub-menu-icon"></i>
              <span className="menu-text">
                View Dealers & Distributors
              </span>
            </a>
          </div>
        )}
      </div>
      <div
        className={`menu-item ad-menu-item ${
          isStartupsMenuOpen ? "active" : ""
        }`}
        onClick={handleStartupsMenuClick}
        ref={startupsMenuRef}
      >
        <i className="fas fa-rocket menu-icon"></i>
        <span className="menu-text">Access Startups</span>
        {isStartupsMenuOpen && (
          <div className="sub-menu startups-menu">
            {/* <a href="/dashboard/Add-Startups" className="sub-menu-item menu-link">
              <i className="fas fa-plus-circle sub-menu-icon"></i>
              <span className="menu-text">Add Startup</span>
            </a> */}
            <a href="/dashboard/View-Startups" className="sub-menu-item menu-link">
              <i className="fas fa-clipboard-list sub-menu-icon"></i>
              <span className="menu-text">View Startups</span>
            </a>
          </div>
        )}
      </div>
      <a href="/dashboard/Market-Insights" className="menu-link">
        <div className="menu-item">
          <i className="fas fa-lightbulb menu-icon"></i>
          <span className="menu-text">Market Insights Reports</span>
        </div>
      </a>
       <a href="/dashboard/CSRs-Foundations" className="menu-link">
        <div className="menu-item">
          <i className="fas fa-clipboard-list menu-icon"></i>
          <span className="menu-text">CSRs & Foundations</span>
        </div>
      </a> 
      <div
        className={`menu-item ${
          isSalesMenuOpen ? "active" : ""
        }`}
        onClick={handleSalesMenuClick}
        ref={salesMenuRef}
      >
        <i className="fas fa-chart-line menu-icon"></i>
        <span className="menu-text">Sales Tracker</span>
        {isSalesMenuOpen && (
          <div className="sub-menu healthcare-centres-menu">
            <a href="/dashboard/Sales-Tracker" className="sub-menu-item menu-link">
                <i className="fas fa-clipboard-list menu-icon"></i>
                <span className="menu-text">Sales Tracker Form</span>
            </a> 
            <a href="/dashboard/View-Sales-Progress" className="sub-menu-item menu-link">
                <i className="fas fa-hospital sub-menu-icon"></i>
                <span className="menu-text">View Sales Progress</span>
            </a>
            <a href="/dashboard/added-healthcare-centres" className="sub-menu-item menu-link">
                <i className="fas fa-clipboard-list sub-menu-icon"></i>
                <span className="menu-text">Added Healthcare Centres</span>
            </a>
        </div>
        )}
      </div>
      <div
        className={`menu-item ad-menu-item ${isCompetitiveIntelMenuOpen ? "active" : ""}`}
        onClick={handleCompetitiveIntelMenuClick}
        ref={competitiveIntelMenuRef}
      >
        <i className="fas fa-chart-bar menu-icon"></i> {/* Changed icon to a bar chart */}
        <span className="menu-text">Competitive Intelligence</span>
        {isCompetitiveIntelMenuOpen && (
          <div className="sub-menu competitive-intel-menu">
            {/* <a href="/admin/competitive-intelligence" className="sub-menu-item menu-link">
              <i className="fas fa-plus sub-menu-icon"></i> 
              <span className="menu-text">Add Competitive Intelligence</span>
            </a> */}
            <a href="/view-competitive-intelligence" className="sub-menu-item menu-link">
              <i className="fas fa-search sub-menu-icon"></i> 
              <span className="menu-text">View Competitive Intelligence</span>
            </a>
          </div>
        )}
      </div>

      {/* <a href="/dashboard/gtm-readiness-assessment" className="menu-link">
        <div className="menu-item">
          <i className="fas fa-clipboard-list menu-icon"></i>
          <span className="menu-text">GTM Readiness Assessment</span>
        </div>
      </a> */}
      {/* <a href="/dashboard/GTM-Readiness" className="menu-link">
        <div className="menu-item">
          <i className="fas fa-check-circle menu-icon"></i>
          <span className="menu-text">GTM Readiness</span>
        </div>
      </a>
      <a href="/dashboard/Bootcamp" className="menu-link">
        <div className="menu-item">
          <i className="fas fa-graduation-cap menu-icon"></i>
          <span className="menu-text">Bootcamp</span>
        </div>
      </a> */}
      {/* <a href="/dashboard/Healthcare-Domains" className="menu-link">
        <div className="menu-item">
          <i className="fas fa-medkit menu-icon"></i>
          <span className="menu-text">Purchase Products</span>
        </div>
      </a>
      <a href="/dashboard/Review-Products" className="menu-link">
        <div className="menu-item"> {/*-btm*
          <i className="fas fa-star menu-icon"></i>
          <span className="menu-text">Review Products</span>
        </div>
      </a> */}
    </div>
  );
};

export default MenuBar;
