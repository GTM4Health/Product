// Help Page.  Inside the Product
// To be Populated in coming days.
//
import React from "react";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();

  const handleHelp = () => {
    // Navigate to the help page
    // navigate("/help");
  };

  return (
    <button className="user-menu-item" onClick={handleHelp}>
      <i className="fas fa-question-circle"></i> Help
    </button>
  );
};

export default Help;

