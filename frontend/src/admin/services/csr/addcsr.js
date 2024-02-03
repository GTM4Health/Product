import React, { useState } from "react";
import axios from "axios";
import Footer from "../../../layout/pages/Footer";
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";
import startupOptions from "../../../assets/startupOptions";

const NewCSRForm = () => {
  const [csrName, setCSRName] = useState("");
  const [website, setWebsite] = useState("");
  const [domain, setDomain] = useState("");
  const [csrStatus, setCSRStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/CSR`, {
        csrName,
        website,
        domain,
      });
      setCSRName("");
      setWebsite("");
      setDomain("");
      setCSRStatus("success");

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setCSRStatus(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      setCSRStatus("failure");
      // show an error message or perform any other error handling
    }
  };

  const renderCSRStatusMessage = () => {
    if (csrStatus === "success") {
      return <div className="popup success">CSR/Foundation successfully added!</div>;
    } else if (csrStatus === "failure") {
      const errorMessage = "Failed to add CSR/Foundation. Please try again.";
      return (
        <div className="popup failure">
          {errorMessage}
          <br />
          <button onClick={() => setCSRStatus(null)}>Try Again</button>
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
            <h1>Add CSR/Foundation</h1>
            {renderCSRStatusMessage()}
            <form onSubmit={handleSubmit} className="hospital-f">
              {/* CSR/Foundation Name */}
              <div className="form-group">
                <label htmlFor="csrName">CSR/Foundation Name*:</label>
                <input
                  type="text"
                  id="csrName"
                  required
                  value={csrName}
                  onChange={(e) => setCSRName(e.target.value)}
                  placeholder="CSR/Foundation Name"
                  className="form-outline"
                />
              </div>
              {/* Website URL */}
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
              {/* Domain */}
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

export default NewCSRForm;
