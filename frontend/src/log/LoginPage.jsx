import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderIn from '../layout/users/HeaderIn';
import Footer from "../layout/pages/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
  const [successMessage, setSuccessMessage] = useState(''); // State to hold success message
  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [successMessage, navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.log('Email and password are required');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/login`, {
        email,
        password,
      });

      // Update local storage with token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Extract and log additional login information
      const { counter, lastLogin } = response.data.loginDetails;
      console.log(`Login successful! Login Counter: ${counter}, Last Login: ${lastLogin}`);

      // Set success message
      setSuccessMessage('Login successful!');
    } catch (error) {
      console.error('Login failed', error);
      setPassword('');

      // Set the error message based on the error response
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  const handleRenew = () => {
    // Define the logic to handle subscription renewal here
    console.log('Renew subscription logic goes here');
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
    } else if (errorMessage.includes('Subscription expired')) {
      return (
        <div className="popup failure">
          Your account has expired. Please renew your subscription to continue using our services.
          <br />
          <button onClick={handleRenew}>Renew Subscription</button>
        </div>
      );
    } else if (errorMessage) {
      return (
        <div className="popup failure">
          {errorMessage}
          <br />
          <button onClick={() => setErrorMessage('')}>Close</button>
        </div>
      );
    } else if (successMessage) {
      return (
        <div className="popup success">
          {successMessage}
          <br />
          <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
        </div>
        
      );
    }
    return null;
  };

  return (
    <div className='page-view'>
      <HeaderIn />
      <div className="login-container">
        <h1 className="signup-title"> User <span className='blue-t'>LogIn</span></h1>
        <form onSubmit={handleLogin}>
          <div className="centrepage">
            <div className="log-field">
              <label htmlFor="email">&nbsp; &nbsp; &nbsp; &nbsp; Email*&nbsp; :</label>
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
              <label htmlFor="password">Password*&nbsp; :</label>
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
            <div className="subm-row">
              <button className="login-btn" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
        {/* Render the popup */}
        {renderPopup()}
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
