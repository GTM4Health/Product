import React, { useState } from 'react';
import axios from 'axios';
import Footer from './components/Footer';
import AdminHeader from './components/AdminHeader';
import AdminMenuBar from './components/AdminMenubar';

const StartupForm = () => {
  const [startupName, setStartupName] = useState('');
  const [website, setWebsite] = useState('');
  const [productStage, setProductStage] = useState('');
  const [domain, setDomain] = useState('');
  const [startupStatus, setStartupStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Startups`, {
        startupName,
        website,
        productStage,
        domain,
      });
      setStartupName('');
      setWebsite('');
      setProductStage('');
      setDomain('');
      setStartupStatus('success');

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setStartupStatus(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      console.log('Error response:', error.response);
      setStartupStatus('failure');
      // show an error message or perform any other error handling
    }
  };

  const renderStartupStatusMessage = () => {
    if (startupStatus === 'success') {
      return <div className="popup success">Startup successfully added!</div>;
    } else if (startupStatus === 'failure') {
      const errorMessage = 'Failed to add startup. Please try again.';
      return (
        <div className="popup failure">
          {errorMessage}
          <br />
          <button onClick={() => setStartupStatus(null)}>Try Again</button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="hosp-content">
            <h1>Add Startup</h1>
            {renderStartupStatusMessage()}
            <form onSubmit={handleSubmit} className="hospital-f">
              <div className="form-group">
                <label htmlFor="startupName">Startup Name*:</label>
                <input
                  type="text"
                  id="startupName"
                  required
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  placeholder="Startup Name"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="website">Website URL:</label>
                <input
                  type="text"
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Website URL"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="productStage">Product Stage:</label>
                <select
                  id="productStage"
                  value={productStage}
                  onChange={(e) => setProductStage(e.target.value)}
                  className="form-outline"
                >
                  <option value="" disabled>
                    Select Product Stage
                  </option>
                  <option value="MVP">MVP</option>
                  <option value="Early Adopters">Early Adopters</option>
                  <option value="Commercialised">Commercialised</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="domain">Domain:</label>
                <select
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="form-outline"
                >
                  <option value="" disabled>
                    Select Domain
                  </option>
                  <option value="Maternal Child Healthcare (MCH)">
                    Maternal Child Healthcare (MCH)
                  </option>
                  <option value="Non Communicable Diseases (NCD)">
                    Non Communicable Diseases (NCD)
                  </option>
                  <option value="Assistive Healthcare Technologies">
                    Assistive Healthcare Technologies
                  </option>
                  <option value="Chronic Care">Chronic Care</option>
                  <option value="Hearing Diagnostics">Hearing Diagnostics</option>
                  <option value="IVF">IVF</option>
                  <option value="Colostomy">Colostomy</option>
                  <option value="Rehabilitation Solutions">
                    Rehabilitation Solutions
                  </option>
                  <option value="Cancer Care">Cancer Care</option>
                  <option value="Kidney Care">Kidney Care</option>
                  <option value="Radiology">Radiology Products</option>
                  <option value="Surgery">Surgery Products</option>
                </select>
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

export default StartupForm;
