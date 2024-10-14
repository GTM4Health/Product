import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="settings-container">
      <button className="user-menu-item" onClick={handleSettingsClick}>
        <i className="fas fa-cog"></i> Settings
      </button>
      {isOpen && (
        <div className="settings-dropdown">
          <button className="settings-option" onClick={() => handleOptionClick("/my-profile")}>Update Profile</button>
          <button className="settings-option" onClick={() => handleOptionClick("/account")}>Account Settings</button>
          <button className="settings-option" onClick={() => handleOptionClick("/privacy")}>Privacy Settings</button>
          <button className="settings-option" onClick={() => handleOptionClick("/change-password")}>Change Password</button>
        </div>
      )}
    </div>
  );
};

export default Settings;
