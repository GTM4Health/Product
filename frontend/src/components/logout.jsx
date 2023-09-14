// Logout button
//
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate to the logout page
    // Clear all tokens and data from local storage
    localStorage.clear();
    navigate("/");
  };

  return (
    <button className="user-menu-item" onClick={handleLogout}>
      <i className="fas fa-power-off"></i> Sign Out
      {/*fas fa-sign-out-alt*/}
    </button>
  );
};

export default LogoutButton;
