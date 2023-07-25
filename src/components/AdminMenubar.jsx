import React, { useState, useRef, useEffect } from "react";

const AdminMenuBar = () => {
  const [isHealthcareMenuOpen, setIsHealthcareMenuOpen] = useState(false);
  const [isMedTechMenuOpen, setIsMedTechMenuOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isStartupsMenuOpen, setIsStartupsMenuOpen] = useState(false);
  const [isGTMMenuOpen, setIsGTMMenuOpen] = useState(false);

  const healthcareMenuRef = useRef(null);
  const medTechMenuRef = useRef(null);
  const productMenuRef = useRef(null);
  const startupsMenuRef = useRef(null);
  const gtmMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (healthcareMenuRef.current && !healthcareMenuRef.current.contains(event.target)) {
        setIsHealthcareMenuOpen(false);
      }
      if (medTechMenuRef.current && !medTechMenuRef.current.contains(event.target)) {
        setIsMedTechMenuOpen(false);
      }
      if (productMenuRef.current && !productMenuRef.current.contains(event.target)) {
        setIsProductMenuOpen(false);
      }
      if (startupsMenuRef.current && !startupsMenuRef.current.contains(event.target)) {
        setIsStartupsMenuOpen(false);
      }
      if (gtmMenuRef.current && !gtmMenuRef.current.contains(event.target)) {
        setIsGTMMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleHealthcareMenuClick = () => {
    setIsHealthcareMenuOpen(!isHealthcareMenuOpen);
  };

  const handleMedTechMenuClick = () => {
    setIsMedTechMenuOpen(!isMedTechMenuOpen);
  };

  const handleProductMenuClick = () => {
    setIsProductMenuOpen(!isProductMenuOpen);
  };

  const handleStartupsMenuClick = () => {
    setIsStartupsMenuOpen(!isStartupsMenuOpen);
  };

  const handleGTMMenuClick = () => {
    setIsGTMMenuOpen(!isGTMMenuOpen);
  };

  return (
    <div className="adbar">
      <a href="/admin/dashboard/User-Dashboard" className="menu-link">
        <div className="menu-item">
          <i className="fas fa-users-cog menu-icon"></i>
          <span className="menu-text">User Dashboard</span>
        </div>
      </a>
      <div
        className={`menu-item ad-menu-item ${
          isHealthcareMenuOpen ? "active" : ""
        }`}
        onClick={handleHealthcareMenuClick}
        ref={healthcareMenuRef}
      >
        <i className="fas fa-hospital menu-icon"></i>
        <span className="menu-text">Manage Healthcare Centres</span>
        {isHealthcareMenuOpen && (
          <div className="sub-menu healthcare-menu">
            <a href="/admin/dashboard/Add-Hospital" className="sub-menu-item menu-link">
              <i className="fas fa-building sub-menu-icon"></i>
              <span className="menu-text">Add Healthcare Centres</span>
            </a>
            <a href="/admin/dashboard/View-Hospital" className="sub-menu-item menu-link">
              <i className="fas fa-eye sub-menu-icon"></i>
              <span className="menu-text">
                View & Update All Healthcare Centres
              </span>
            </a>
            <a href="/admin/dashboard/City-Hospital" className="sub-menu-item menu-link">
              <i className="fas fa-map-marked-alt sub-menu-icon"></i>
              <span className="menu-text">
                View & Update Healthcare Centres - City Wise
              </span>
            </a>
          </div>
        )}
      </div>
      <div
        className={`menu-item ad-menu-item ${
          isMedTechMenuOpen ? "active" : ""
        }`}
        onClick={handleMedTechMenuClick}
        ref={medTechMenuRef}
      >
        <i className="fas fa-microscope menu-icon"></i>
        <span className="menu-text">Manage MedTech Companies</span>
        {isMedTechMenuOpen && (
          <div className="sub-menu medtech-menu">
            <a href="/admin/dashboard/Add-MedTech-Companies" className="sub-menu-item menu-link">
              <i className="fas fa-plus sub-menu-icon"></i>
              <span className="menu-text">Add MedTech Companies</span>
            </a>
            <a href="/admin/dashboard/View-MedTech-Companies" className="sub-menu-item menu-link">
              <i className="fas fa-chart-line sub-menu-icon"></i>
              <span className="menu-text">
                View & Update MedTech Companies
              </span>
            </a>
          </div>
        )}
      </div>
      <div
        className={`menu-item ad-menu-item ${
          isProductMenuOpen ? "active" : ""
        }`}
        onClick={handleProductMenuClick}
        ref={productMenuRef}
      >
        <i className="fas fa-tags menu-icon"></i>
        <span className="menu-text">Manage Products</span>
        {isProductMenuOpen && (
          <div className="sub-menu product-menu">
            <a href="/admin/dashboard/Add-Products" className="sub-menu-item menu-link">
              <i className="fas fa-box-open menu-icon"></i>
              <span className="menu-text">Add Products</span>
            </a>
            <a href="/admin/dashboard/View-Products" className="sub-menu-item menu-link">
              <i className="fas fa-edit sub-menu-icon"></i>
              <span className="menu-text">View & Update Products</span>
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
        <span className="menu-text">Manage Startups</span>
        {isStartupsMenuOpen && (
          <div className="sub-menu startups-menu">
            <a href="/admin/dashboard/Add-Startups" className="sub-menu-item menu-link">
              <i className="fas fa-plus-circle sub-menu-icon"></i>
              <span className="menu-text">Add Startup</span>
            </a>
            <a href="/admin/dashboard/View-Startups" className="sub-menu-item menu-link">
              <i className="fas fa-clipboard-list sub-menu-icon"></i>
              <span className="menu-text">View & Update Startups</span>
            </a>
          </div>
        )}
      </div>
      {/* GTM Services Menu */}
      <div
        className={`menu-item ad-menu-item ${isGTMMenuOpen ? "active" : ""}`}
        onClick={handleGTMMenuClick}
        ref={gtmMenuRef}
      >
        <i className="fas fa-tools menu-icon"></i>
        <span className="menu-text">GTM Services</span>
        {isGTMMenuOpen && (
          <div className="sub-menu gtm-menu">
            <a href="/admin/dashboard/Create-Project" className="sub-menu-item menu-link">
              <i className="fas fa-plus sub-menu-icon"></i>
              <span className="menu-text">Create Project</span>
            </a>
            <a href="/admin/dashboard/Update-Project" className="sub-menu-item menu-link">
              <i className="fas fa-edit sub-menu-icon"></i>
              <span className="menu-text">Update Project</span>
            </a>
            <a href="/admin/dashboard/Save-Project" className="sub-menu-item menu-link">
              <i className="fas fa-envelope sub-menu-icon"></i>
              <span className="menu-text">Mail & Print Project</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMenuBar;





// import React from "react";

// const AdminMenuBar = () => {
//   return (
//     <div className="menu-bar adbar">
//       <a href="/admin/dashboard/User-Dashboard" className="menu-link">
//         <div className="menu-item">
//           <i className="fas fa-users-cog menu-icon"></i>
//           <span className="menu-text">User Dashboard</span>
//         </div>
//       </a>
//       <a href="/admin/dashboard/Features" className="menu-link">
//         <div className="menu-item">
//           <i className="fas fa-puzzle-piece menu-icon"></i>
//           <span className="menu-text">Features</span>
//         </div>
//       </a>
//       <a href="/admin/dashboard/Add-Hospital" className="menu-link">
//         <div className="menu-item">
//           <i className="fas fa-hospital-alt menu-icon"></i>
//           <span className="menu-text">Add Healthcare Centres</span>
//         </div>
//       </a>
//       <a href="/admin/dashboard/View-Hospital" className="menu-link">
//         <div className="menu-item">
//           <i className="fas fa-search-location menu-icon"></i>
//           <span className="menu-text">View & Update All Healthcare Centres</span>
//         </div>
//       </a>
//       <a href="/admin/dashboard/City-Hospital" className="menu-link">
//         <div className="menu-item">
//           <i className="fas fa-search-location menu-icon"></i>
//           <span className="menu-text">View & Update Healthcare Centres - City Wise</span>
//         </div>
//       </a>
//       <a href="/admin/dashboard/Add-MedTech-Companies" className="menu-link">
//         <div className="menu-item">
//           <i className="fas fa-industry menu-icon"></i>
//           <span className="menu-text">Add MedTech Companies</span>
//         </div>
//       </a>
//       <a href="/admin/dashboard/View-MedTech-Companies" className="menu-link">
//         <div className="menu-item">
//           <i className="fas fa-address-book menu-icon"></i>
//           <span className="menu-text">View & Update MedTech Companies</span>
//         </div>
//       </a>
//       <a href="/admin/dashboard/Add-Products" className="menu-link">
//         <div className="menu-item">
//           <i className="fas fa-boxes menu-icon"></i>
//           <span className="menu-text">Products</span>
//         </div>
//       </a>
//       <a href="/admin/dashboard/View-Products" className="menu-link">
//         <div className="menu-item">
//           <i className="fas fa-edit menu-icon"></i>
//           <span className="menu-text">View & Update Products</span>
//         </div>
//       </a>
//     </div>
//   );
// };

// export default AdminMenuBar;
