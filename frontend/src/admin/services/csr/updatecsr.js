import React, { useState, useEffect } from "react";
import axios from "axios";
import startupOptions from "../../../assets/startupOptions";

const EditCSRForm = ({ csr, onUpdate, onCancel }) => {
  const [csrName, setCSRName] = useState(csr.csrName);
  const [website, setWebsite] = useState(csr.website);
  const [domain, setDomain] = useState(csr.domain);
  const [progress, setProgress] = useState(csr.progress);
  const [ser, setSer] = useState(csr.ser);

  useEffect(() => {
    setCSRName(csr.csrName);
    setWebsite(csr.website);
    setDomain(csr.domain);
    setProgress(csr.progress);
    setSer(csr.ser)
  }, [csr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      csrName,
      website,
      domain,
      progress,
      ser,
    };
    onUpdate(csr._id, updatedData);
  };

  return (
    <div className="edit-form">
      <h2>Edit CSR/Foundation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="csrName">CSR/Foundation Name</label>
          <input
            type="text"
            id="csrName"
            value={csrName}
            onChange={(e) => setCSRName(e.target.value)}
            placeholder="CSR/Foundation Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Website"
          />
        </div>
        <div className="form-group">
              <label htmlFor="domain">Domain:</label>
              <select
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  
                >
                  {startupOptions.domainOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
        </div>
        <div className="form-group">
          <label htmlFor="progress">CSR/Foundation Progress :</label>
          <textarea
            id="progress"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            placeholder="CSR/Foundation Progress"
            className="form-outline textarea"
          ></textarea>
        </div>
        <div className="form-group">
                <label htmlFor="infraSer">Services :</label>
                <textarea
                  id="infraSer"
                  value={ser}
                  onChange={(e) => setSer(e.target.value)}
                  placeholder="CSR/Foundation Services "
                  className="form-outline textarea"
                ></textarea>
        </div>
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

export default EditCSRForm;
