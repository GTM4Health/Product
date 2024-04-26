import React from "react";

const RequestDemoButton = () => {
  const handleRequestDemo = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLScUvwzGRNEAtj4MaXMUFwXjP3D1T6VuLaQYNmKskXwl_imXmQ/viewform");
  };

  return (
    <button className="request-demo-button" onClick={handleRequestDemo} target="_">
      Request Demo
    </button>
  );
};

export default RequestDemoButton;
