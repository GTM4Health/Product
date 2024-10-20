import React, { useState, useEffect } from "react";
import axios from "axios";
import startupOptions from "../../../assets/startupOptions"; // Import the options

const EditStartupForm = ({ startup, onUpdate, onCancel }) => {
  const [startupName, setStartupName] = useState(startup.startupName);
  const [website, setWebsite] = useState(startup.website);
  const [productStage, setProductStage] = useState(startup.productStage);
  const [domain, setDomain] = useState(startup.domain);
  const [progress, setProgress] = useState(startup.progress);
  const [work, setWork] = useState(startup.work);

  useEffect(() => {
    setStartupName(startup.startupName);
    setWebsite(startup.website);
    setProductStage(startup.productStage);
    setDomain(startup.domain);
    setProgress(startup.progress);
    setWork(startup.work);
  }, [startup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      startupName,
      website,
      productStage,
      domain,
      progress,
      work,
    };
    onUpdate(startup._id, updatedData);
  };

  return (
    <div className="edit-form">
      <h2>Edit Startup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="startupName">Startup Name</label>
          <input
            type="text"
            id="startupName"
            value={startupName}
            onChange={(e) => setStartupName(e.target.value)}
            placeholder="Startup Name"
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
          <label htmlFor="productStage">Product Stage</label>
          <select
            id="productStage"
            value={productStage}
            onChange={(e) => setProductStage(e.target.value)}
          >
            {/* Use the imported options array */}
            {startupOptions.productStageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="domain">Domain</label>
          <select
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          >
            {/* Use the imported options array */}
            {startupOptions.domainOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
                <label htmlFor="infraSer">Startup Founder :</label>
                <textarea
                  id="infraSer"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  placeholder="Startup Founder"
                  className="form-outline textarea"
                ></textarea>
        </div>
        <div className="form-group">
                <label htmlFor="infraSer">Progress :</label>
                <textarea
                  id="infraSer"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  placeholder="Progress"
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

export default EditStartupForm;
