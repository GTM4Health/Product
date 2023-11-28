// AdminUpdateIntel.js

import React, { useState, useEffect } from 'react';

const AdminUpdateIntel = ({ competitiveIntel, onUpdate, onCancel }) => {
  const [domain, setDomain] = useState(competitiveIntel.domain);
  const [competitorInfo, setCompetitorInfo] = useState(competitiveIntel.competitorInfo);

  useEffect(() => {
    setDomain(competitiveIntel.domain);
    setCompetitorInfo(competitiveIntel.competitorInfo);
  }, [competitiveIntel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      domain,
      competitorInfo,
      // Add other fields as needed
    };
    onUpdate(competitiveIntel._id, updatedData);
  };

  return (
    <div className="edit-form">
      <h2>Edit Competitive Intelligence</h2>
      <form onSubmit={handleSubmit}>
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
        {/* Add other form fields as needed */}
        <div className="button-group">
          <button type="submit" className="btn-primary">
            Update
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUpdateIntel;
