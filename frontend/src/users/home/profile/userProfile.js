import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../../layout/pages/Footer';
import MenuBar from '../../../layout/users/MenuBar';
import Header2 from '../../../layout/users/Header2';
import useAuth from '../../../hooks/useAuth'; // Custom hook to manage authentication
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [address, setAddress] = useState('');
  const [productOrService, setProductOrService] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchUserData(storedUser.email);
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  useEffect(() => {
    console.log('User:', user);
    console.log('Company Name:', companyName);
    console.log('Company URL:', companyUrl);
    console.log('Address:', address);
    console.log('Product/Service:', productOrService);
  }, [user, companyName, companyUrl, address, productOrService]);
  

  const fetchUserData = async (userEmail) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/user/email/${userEmail}`);
        console.log('Fetched user data:', response.data); // Log the response data
        const { companyName, companyUrl, address, productOrService } = response.data;
        setCompanyName(companyName || '');
        setCompanyUrl(companyUrl || '');
        setAddress(address || '');
        setProductOrService(productOrService || '');
    } catch (error) {
      console.error('Failed to fetch user data', error);
      setErrorMessage('Failed to fetch user data');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/users/update-user/email/${user.email}`, {
        companyName,
        companyUrl,
        address,
        productOrService,
      });

      setSuccessMessage('Profile updated successfully');
      setErrorMessage('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      console.error('Profile update failed', error);
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
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
        <div className="hosp-content">
          <h1>Edit Profile</h1>
          {renderPopup()}
          <form onSubmit={handleProfileUpdate} className="hospital-f">
            <div className="xform-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={user?.name || ''}
                readOnly
                className="form-outline"
              />
            </div>
            <div className="xform-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={user?.email || ''}
                readOnly
                className="form-outline"
              />
            </div>
            <div className="xform-group">
              <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter Company Name"
                className="form-outline"
              />
            </div>
            <div className="xform-group">
              <label htmlFor="companyUrl">Company URL:</label>
              <input
                type="text"
                id="companyUrl"
                value={companyUrl}
                onChange={(e) => setCompanyUrl(e.target.value)}
                placeholder="Enter Company URL"
                className="form-outline"
              />
            </div>
            <div className="xform-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Address"
                className="form-outline"
              />
            </div>
            <div className="xform-group">
              <label htmlFor="productOrService">Your Product/Service:</label>
              <input
                type="text"
                id="productOrService"
                value={productOrService}
                onChange={(e) => setProductOrService(e.target.value)}
                placeholder="Enter Product or Service"
                className="form-outline"
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

export default EditProfile;
