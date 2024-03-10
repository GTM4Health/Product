// Setting button.
// Currently empty.
// Need to populate.

import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleSettings = () => {
    // Navigate to the settings page
    // navigate("/settings");
  };

  return (
    <button className="user-menu-item" onClick={handleSettings}>
      <i className="fas fa-cog"></i>Settings
    </button>
  );
};

export default Settings;

