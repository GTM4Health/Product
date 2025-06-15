import React, { useState, useRef, useEffect } from "react";
import Logo from "../../components/Logo";
import AdminLogoutButton from "../../components/AdminLogout";
import Settings from "../../components/Settings";
import Help from "../../components/Help";
import AdminDashHomeButton from "../../components/AdminDashHome";
import SignUpButton from "../../components/Signup";
// import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AdminHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [showName, setShowName] = useState(true); // New state to control name visibility
  // const isAuthenticated = useAuth();
  const [lastLogin, setLastLogin] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchLastLogin = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/last-login`);
        if (response.status === 200) {
          setLastLogin(response.data.lastLogin);
        }
      } catch (error) {
        console.error("Error fetching last login:", error);
      }
    };

    fetchLastLogin();
  }, []);

  const toggleAdminMenu = () => {
    setAdminMenuOpen(!adminMenuOpen);
    setShowName(true); // Show the name when the admin menu is closed
  };

  const handleProfileClick = () => {
    setShowName(!showName); // Toggle the name visibility when the profile icon is clicked
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // if (!isAuthenticated) {
  //   navigate('/login');
  // }

  

  return (
    <div className={`toolbar ${adminMenuOpen ? "user-menu-open" : ""}`}>
      <Logo />
      <div className="toolbar_left">
        Welcome, Admin
        <br />
        {lastLogin ? `Last Login: ${lastLogin}` : " "}
      </div>
      <div className="buttons">
        <div className="search-bar">
          {/* <i className="fas fa-search fa-2x search-icon"></i> */}
        </div>
        <AdminDashHomeButton />
        <SignUpButton />
        <div className="user-menu">
          <div className="profile" onClick={toggleAdminMenu}>
            <i
              className={`fas fa-user-circle fa-4x profile-icon ${
                adminMenuOpen ? "user-menu-open" : ""
              }`}
              onClick={handleProfileClick} // Clicking the profile icon toggles the name visibility
            ></i>
            <span
              className={`highlight-name ${showName && !adminMenuOpen ? "visible" : "hidden"}`}
            >
              Admin
            </span>
            <div
              className={`user-menu-items ${adminMenuOpen ? "open" : "closed"}`}
            >
              {/* Admin-specific menu items go here */}
              <Help />
              <Settings />
              <AdminLogoutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
