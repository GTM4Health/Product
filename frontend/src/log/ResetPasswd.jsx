import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderIn from '../layout/users/HeaderIn';
import Footer from "../layout/pages/Footer";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/password/reset`, {
        email,
        newPassword,
      });

      setMessage(response.data.message);

      // Navigate back to the homepage after successful reset
      setTimeout(() => {
        navigate('/');
      }, 1500); // Delay to show success message before redirecting
    } catch (error) {
      console.error('Password reset failed', error);
      setMessage('Password reset failed. Please try again.');
      setTimeout(() => {
        navigate('/');
      }, 1500); 
    }
  };

  return (
    <div className='page-view'>
      <HeaderIn />
      <div className="signupPage">
      <div className="login-container">
        <h1 className="signup-title"> <span className='blue-t'>Reset</span> Password</h1>
        <form onSubmit={handleResetPassword}>
          <div className="centrepage">
            <div className="log-field">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Enter Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="log-field">
              <label htmlFor="new-password">New Password:</label>
              <input
                type="password"
                placeholder="Enter New Password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="log-field">
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input
                type="password"
                placeholder="Confirm New Password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <br />
            <div className="subm-row">
              <button className="login-btn" type="submit">
                Reset Password
              </button>
            </div>
          </div>
        </form>
        {message && <div className="popup message">{message}</div>}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
