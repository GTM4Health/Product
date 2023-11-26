import React from "react";

const RequestDemoButton = () => {
  const handleRequestDemo = () => {
    window.location.href = "mailto:info@gtm4health.com";
  };

  return (
    <button className="request-demo-button" onClick={handleRequestDemo}>
      Request Demo
    </button>
  );
};

export default RequestDemoButton;
