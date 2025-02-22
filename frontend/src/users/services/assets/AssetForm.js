import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../../layout/pages/Footer';
import MenuBar from '../../../layout/users/MenuBar';
import Header2 from '../../../layout/users/Header2';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AssetForm = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);
  const [productName, setProductName] = useState('');
  const [assetNumber, setAssetNumber] = useState('');
  const [emailID, setEmailID] = useState('');
  const [observations, setObservations] = useState('');
  const [assetStatus, setAssetStatus] = useState(null);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setEmailID(storedUser.email);
    }
  }, []);

  useEffect(() => {
    if (user && user.assetPrivileges && isAuthenticated) {
      fetchAssets();
    } else if (user && !(user.assetPrivileges) && isAuthenticated) {
      navigate("/dashboard/Subscription");
    }
  }, [isAuthenticated]);

  const fetchAssets = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Assets/assets-portal`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedTimestamp = now.toISOString();

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Assets`, {
        productName,
        assetNumber,
        emailID,
        observations,
        timestamp: formattedTimestamp,
      });
      setProductName('');
      setAssetNumber('');
      setObservations('');
      setAssetStatus('success');
      setTimestamp('');
      setTimeout(() => {
        setAssetStatus(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      setAssetStatus('failure');
    }
  };

  const renderAssetStatusMessage = () => {
    if (assetStatus === 'success') {
      return <div className="popup success">Asset successfully added!</div>;
    }
    if (assetStatus === 'failure') {
      return (
        <div className="popup failure">
          Failed to add Asset. Please try again.
          <br />
          <button onClick={() => setAssetStatus(null)}>Try Again</button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="hosp-content">
            <h1>Asset Onboarding</h1>
            {renderAssetStatusMessage()}
            <form onSubmit={handleSubmit} className="hospital-f">
              <div className="form-group">
                <label htmlFor="productName">Product Name*:</label>
                <input
                  type="text"
                  id="productName"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Product Name"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="assetNumber">Asset Number*:</label>
                <input
                  type="text"
                  id="assetNumber"
                  required
                  value={assetNumber}
                  onChange={(e) => setAssetNumber(e.target.value)}
                  placeholder="Asset Number"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="emailID">Email ID:</label>
                <input
                  type="email"
                  id="emailID"
                  value={emailID}
                  readOnly
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="observations">Observations:</label>
                <textarea
                  id="observations"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Observations"
                  className="form-outline textarea"
                ></textarea>
              </div>
              <button type="submit" className="hsubtn login-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AssetForm;
