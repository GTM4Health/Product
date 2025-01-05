// Signup button here.
//

import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/admin/dashboard/signup');
  };

  return (
    <div className='button-container'>
        <button className="sinup" onClick={handleClick}>
          Add User
        </button>
    </div>
  );
};

export default SignUpButton;


