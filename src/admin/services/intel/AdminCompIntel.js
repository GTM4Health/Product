import React, { useState } from 'react';
import axios from 'axios';
import Footer from "../../../layout/pages/Footer";
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from '../../../hooks/useAuth';
import AdminHeader from "../../../layout/admin/AdminHeader";

const CompetitiveIntelligence = () => {
  const [domain, setDomain] = useState('');
  const [competitorInfo, setCompetitorInfo] = useState('');
  const [competitiveStatus, setCompetitiveStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Add-Competitive-Intelligence`, {
        domain,
        competitorInfo,
      });
      setDomain('');
      setCompetitorInfo('');
      setCompetitiveStatus('success');
      // Clear the success message after 2 seconds
      setTimeout(() => {
        setCompetitiveStatus(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      console.log('Error response:', error.response);
      setCompetitiveStatus('failure');
      // show an error message or perform any other error handling
    }
  };

  const renderCompetitiveStatusMessage = () => {
    if (competitiveStatus === 'success') {
      return <div className="popup success">Competitive Intelligence added successfully!</div>;
    } else if (competitiveStatus === 'failure') {
      const errorMessage = 'Competitive Intelligence addition failed. Please try again.';
      return (
        <div className="popup failure">
          {errorMessage}
          <br />
          <button onClick={() => setCompetitiveStatus(null)}>Try Again</button>
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
            <h1>Add Competitive Intelligence</h1>
            {renderCompetitiveStatusMessage()}
            <form onSubmit={handleSubmit} className="hospital-f">
              
                <div className="form-group">
                  <label className='f-label' htmlFor="domain">Domain/Product:</label>
                  <textarea
                    type="text"
                    id="domain"
                    required
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Domain/Product"
                    className="form-outline textarea addrx"
                  />
                </div>
                <div className="form-group">
                  <label className='f-label' htmlFor="competitorInfo">Competitor Info:</label>
                  <textarea
                    id="competitorInfo"
                    required
                    value={competitorInfo}
                    onChange={(e) => setCompetitorInfo(e.target.value)}
                    placeholder="Competitor Info"
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

export default CompetitiveIntelligence;
