import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    // Navigate to the home page ("/")
    navigate('/');
  };

  return (
    <button className="home-button" onClick={handleHome}>
      <i className="fas fa-home fa-2x"></i>
    </button>
  );
};

export default HomeButton;
