// User menu bar here.
//
import React, { useState, useRef, useEffect } from "react";

const MenuBar = () => {
  const [isHealthcareCentresMenuOpen, setIsHealthcareCentresMenuOpen] = useState(false);
  const healthcareCentresMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (healthcareCentresMenuRef.current && !healthcareCentresMenuRef.current.contains(event.target)) {
        setIsHealthcareCentresMenuOpen(false);
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

  return (
    <div className="adbar">
      <div
        className={`menu-item ${
          isHealthcareCentresMenuOpen ? "active" : ""
        }`}
        onClick={handleHealthcareCentresMenuClick}
        ref={healthcareCentresMenuRef}
      >
        <i className="fas fa-chart-line menu-icon"></i>
        <span className="menu-text">Market Access</span>
        {isHealthcareCentresMenuOpen && (
          <div className="sub-menu healthcare-centres-menu">
            <a href="/dashboard/View-Healthcare-Centres-All" className="sub-menu-item menu-link">
              <i className="fas fa-hospital sub-menu-icon"></i>
              <span className="menu-text">View All Healthcare Centres</span>
            </a>
            <a href="/dashboard/Market-Access" className="sub-menu-item menu-link">
              <i className="fas fa-map-marked-alt sub-menu-icon"></i>
              <span className="menu-text">View Healthcare Centres - City Wise</span>
            </a>
          </div>
        )}
      </div>
      <a href="/dashboard/Market-Insights" className="menu-link">
        <div className="menu-item">
          <i className="fas fa-lightbulb menu-icon"></i>
          <span className="menu-text">Market Insights</span>
        </div>
      </a>
      <a href="/dashboard/GTM-Readiness" className="menu-link">
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
      </a>
      <a href="/dashboard/Healthcare-Domains" className="menu-link">
        <div className="menu-item">
          <i className="fas fa-medkit menu-icon"></i>
          <span className="menu-text">Healthcare Domains</span>
        </div>
      </a>
      <a href="/dashboard/Review-Products" className="menu-link">
        <div className="menu-item-btm">
          <i className="fas fa-star menu-icon"></i>
          <span className="menu-text">Review Products</span>
        </div>
      </a>
    </div>
  );
};

export default MenuBar;
