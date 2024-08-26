import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../../layout/pages/Footer';
import MenuBar from '../../../layout/users/MenuBar';
import Header2 from '../../../layout/users/Header2';
import useAuth from '../../../hooks/useAuth'; // Custom hook to manage authentication
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/password/change`, {
        email: user.email,
        currentPassword,
        newPassword,
      });

      setSuccessMessage('Password changed successfully');
      setErrorMessage('');
      // Navigate to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Password change failed', error);
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setErrorMessage('An error occurred. Please try again.');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    }
  };

  const renderPopup = () => {
    if (errorMessage) {
      return (
        <div className="popup failure">
          {errorMessage}
        </div>
      );
    } else if (successMessage) {
      return (
        <div className="popup success">
          {successMessage}
        </div>
      );
    }
    return null;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <MenuBar />
        <div className="hosp-content"> {/* Replaced form-content with hosp-content */}
          <h1>Change Password</h1>
          {renderPopup()}
          <form onSubmit={handlePasswordChange} className="hospital-f"> {/* Replaced change-password-form with hospital-f */}
            <div className="xform-group">
              <label htmlFor="currentPassword">Current Password* :</label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter Current Password"
                className="form-outline"
                required
              />
            </div>
            <div className="xform-group">
              <label htmlFor="newPassword">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New Password*  :</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
                className="form-outline"
                required
              />
            </div>
            <div className="xform-group">
              <label htmlFor="confirmPassword">Confirm Password* :</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="form-outline"
                required
              />
            </div>
              <button type="submit" className="hsubtn login-btn">
                Submit
              </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChangePassword;
