import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderIn from '../layout/users/HeaderIn';
import Footer from "../layout/pages/Footer";


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      setPassword('');
    }
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
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
