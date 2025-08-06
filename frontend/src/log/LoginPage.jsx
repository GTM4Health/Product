import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderIn from '../layout/users/HeaderIn';
import Footer from '../layout/pages/Footer';

const API_BASE = process.env.REACT_APP_BASE_URL || 'https://your-fallback-api.com';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [successMessage, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/api/login`, { email, password });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      const { counter, lastLogin } = response.data.loginDetails || {};
      const welcomeMessage = counter === 0
        ? 'Welcome to GTMScale! This is your first login.'
        : `Login successful! Last login: ${new Date(lastLogin).toLocaleString()}`;

      setSuccessMessage(welcomeMessage);
    } catch (error) {
      console.error('Login failed:', error);
      setPassword('');
      setErrorMessage(
        error.response?.data?.error || 'An unexpected error occurred during login.'
      );
    }
  };

  const handleSendResetEmail = async () => {
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    try {
      const { data: user } = await axios.get(
        `${API_BASE}/api/user/email/${encodeURIComponent(email)}`
      );

      const name = user.name || 'User';
      const resetLink = `${window.location.origin}/reset-password?email=${encodeURIComponent(email)}`;

      await axios.post(`${API_BASE}/api/reset-password`, {
        email,
        name,
        resetLink,
      });

      setSuccessMessage('Reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Error sending reset email:', error);
      setErrorMessage(
        error.response?.data?.error || 'Failed to send password reset email.'
      );
    }
  };

  const handleRenew = () => {
    console.log('Renew subscription logic goes here');
    navigate('/');
  };

  const renderPopup = () => {
    if (errorMessage.includes('Invalid email or password')) {
      return (
        <div className="popup failure">
          Incorrect email or password. Please check your credentials and try again.
          <br />
          <button onClick={() => setErrorMessage('')}>Try Again</button>
        </div>
      );
    }

    if (errorMessage.includes('Subscription expired')) {
      return (
        <div className="popup failure">
          Your account has expired. Please renew your subscription to continue using our services.
          <br />
          <button onClick={handleRenew}>Renew Subscription</button>
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="popup failure">
          {errorMessage}
          <br />
          <button onClick={() => setErrorMessage('')}>Close</button>
        </div>
      );
    }

    if (successMessage) {
      return (
        <div className="popup success">
          {successMessage}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="page-view">
      <HeaderIn />
      <div className="login-container">
        <h1 className="signup-title">
          User <span className="blue-t">LogIn</span>
        </h1>
        <form onSubmit={handleLogin}>
          <div className="centrepage">
            <div className="log-field">
              <label htmlFor="email">Email* :</label>
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
              <label htmlFor="password">Password* :</label>
              <input
                type="password"
                placeholder="Enter Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <br />
            <div className="forgot-password">
              <button
                type="button"
                onClick={handleSendResetEmail}
                className="forgot-password-btn"
              >
                Forgot Password?
              </button>
            </div>
            <div className="subm-row">
              <button className="login-btn" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
        {renderPopup()}
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
