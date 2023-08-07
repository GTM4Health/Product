// Setting button.
// Currently empty.
// Need to populate.

import React from "react";
import { useNavigate } from "react-router-dom";

const AdminSettings = () => {
  const navigate = useNavigate();

  const handleSettings = () => {
    // Navigate to the settings page
    navigate("/admin/settings");
  };

  return (
    <button className="user-menu-item" onClick={handleSettings}>
      <i className="fas fa-cog"></i>Settings
    </button>
  );
};

export default AdminSettings;