// Login Button. 
// 
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigate to the login page
    navigate('/login');
  };

  return <button className="loginn" onClick={handleLogin}>Login</button>;
};

export default LoginButton;
