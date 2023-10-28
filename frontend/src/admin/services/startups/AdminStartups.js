import React, { useState } from "react";
import axios from "axios";
import Footer from "../../../layout/pages/Footer"
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";
import startupOptions from "../../../assets/startupOptions"; // Import the options

const StartupForm = () => {
  const [startupName, setStartupName] = useState("");
  const [website, setWebsite] = useState("");
  const [productStage, setProductStage] = useState("");
  const [domain, setDomain] = useState("");
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
      setStartupName("");
      setWebsite("");
      setProductStage("");
      setDomain("");
      setStartupStatus("success");

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setStartupStatus(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      console.log("Error response:", error.response);
      setStartupStatus("failure");
      // show an error message or perform any other error handling
    }
  };

  const renderStartupStatusMessage = () => {
    if (startupStatus === "success") {
      return <div className="popup success">Startup successfully added!</div>;
    } else if (startupStatus === "failure") {
      const errorMessage = "Failed to add startup. Please try again.";
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
                  {startupOptions.productStageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
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
                  {startupOptions.domainOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
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
