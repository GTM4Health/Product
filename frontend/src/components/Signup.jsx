// Signup button here.
//

import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  };

  return (
    <div className='button-container'>
        <button className="sinup" onClick={handleClick}>
          Sign Up
        </button>
    </div>
  );
};

export default SignUpButton;


