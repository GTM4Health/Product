// Entire Signup Page
// React js is posting to backend.
// Important module.
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderIn from '../layout/users/HeaderIn';
import Footer from "../layout/pages/Footer";
import rolesData from '../assets/roles.json';
import PrivacyPDF from "../assets/GTMScale_Privacy_Policy.pdf";
import TnC from "../assets/GTMScale_Terms_&_Conditions.pdf"


const Signup = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [agreed, setAgreed] = useState(false); // state for the checkbox
  const [signupStatus, setSignupStatus] = useState(null); // state for signup status
  const [errorMessage, setErrorMessage] = useState(''); //Err message



  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!agreed) {
      console.error('Please agree to the terms and conditions.');
      return;
    }

    try {
      // Make a POST request to the server to create a new user
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/signup`, {
        name,
        phone,
        email,
        password,
        role,
      });

    // Send welcome email after successful signup
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/send-welcome-email`, {
      email,
      name,
    });

      // Show the success popup
      // After successful signup, navigate to another page and show success popup
      setSignupStatus('success');
    } catch (error) {

      console.error('Signup failed', error);
      setSignupStatus('failure');
      const errorMessage = error.response && error.response.data ? error.response.data.error : 'An unexpected error occurred';
      setErrorMessage(errorMessage);
    }
  };

  useEffect(() => {
    if (signupStatus === 'success') {
      const timer = setTimeout(() => {
        navigate('/');
      }, 2800); // Redirect to the dashboard after a 2.8-second delay
      return () => clearTimeout(timer);
    }
  }, [signupStatus, navigate]);

  const handleRetry = () => {
    setSignupStatus(null); // Reset signup status
  };

  const renderPopup = () => {
    if (signupStatus === 'success') {
      return <div className="popup success">Successfully signed up!</div>;
    } else if (signupStatus === 'failure') {
      return (
        <div className="popup failure">
          Signup failed. Please try again.
          <br />
          {errorMessage}
          <br />
          <button onClick={handleRetry}>Try Again</button>
        </div>
      );
    }
    return null;
  };
  

  return (
  <div className='page-view'>
    <HeaderIn />
    <div className="signupPage">
      <div className="login-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div className="centrepage">
            <div className="log-field">
              <label htmlFor="name">Name* :</label>
              <input
                type="name"
                placeholder="Enter your Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="log-field">
              <label htmlFor="email">Email ID* :</label>
              <input
                type="email"
                placeholder="Enter Mail ID"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* <div className="log-field">
              <label htmlFor="phone">Phone Number* :</label>
              <input
                type="text"
                placeholder="Enter phone number"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div> */}
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
            <div className="log-field">
              <label htmlFor="confirmPassword">Confirm Password* :</label>
              <input
                type="password"
                placeholder="Enter Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {/* <div className="form-field">
            <label htmlFor="role">Your Role* :</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option disabled hidden value="">
                    Choose your Role
                  </option>
                  {rolesData.map((roleOption, index) => (
                    <option key={index} value={roleOption}>
                      {roleOption}
                    </option>
                  ))}
                </select>
            </div> */}
          <br />
          <div className="subm-row">
            <div className="tnc">
              <input
                type="checkbox"
                id="termsAndConditions"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              <label htmlFor="termsAndConditions">
                I agree to the {' '}
                {/* <a href="/termsofuse" className="highlight-link"> */}
                <a href={PrivacyPDF} className="highlight-link" target="_blank">
                  Terms of Use
                </a>
                {' '}and{' '} 
                {/* <a href="/privacypolicy" className="highlight-link"> */}
                <a href={TnC} className="highlight-link" target="_blank">
                  Privacy Policy
                </a>
                {' '}of GTM4Health Platform*
              </label>
            </div>
            <button type="submit" className='btn-signup sbutton' disabled={!agreed}>
              Submit
            </button>
          </div>
          </div>
        </form>
      </div>
      </div>
      {renderPopup()} {/* Render the popup conditionally */}
        < Footer />
      </div>
  );
};

export default Signup;
