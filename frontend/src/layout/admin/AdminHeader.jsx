import React, { useState } from "react";
import Logo from "../../components/Logo";
import AdminLogoutButton from "../../components/AdminLogout";
import Settings from "../../components/Settings";
import Help from "../../components/Help";

const AdminHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [showName, setShowName] = useState(true); // New state to control name visibility

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

  return (
    <div className={`toolbar ${adminMenuOpen ? "user-menu-open" : ""}`}>
      <Logo />
      <div className="buttons">
        <div className="search-bar">
          <i className="fas fa-search fa-2x search-icon"></i>
        </div>
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
