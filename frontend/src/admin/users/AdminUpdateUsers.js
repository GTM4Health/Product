import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from './../../users/home/Dashboard';
import CompetitiveIntelligence from './../services/intel/AdminCompIntel';

const AdminUpdateUserForm = ({ user, onUpdate, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [endDate, setEndDate] = useState(user.endDate || "");

  // Adding state for privileges
  const [privileges, setPrivileges] = useState({
    accessDashboard: user.privileges.accessDashboard || false,
    accessHospitals: user.privileges.accessHospitals || false,
    accessGtmPartners: user.privileges.accessGtmPartners || false,
    accessMarketInsights: user.privileges.accessMarketInsights || false,
    accessCsrsFoundations: user.privileges.accessCsrsFoundations || false,
    accessSales : user.privileges.accessSales || false,
    formPrivilegesHC : user.privileges.formPrivilegesHC || false,
    formPrivilegesDD : user.privileges.formPrivilegesDD || false,
    ciPrivileges : user.privileges.ciPrivileges || false,
    startupPrivileges : user.privileges.startupPrivileges || false,
  });

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setEndDate(user.endDate);

    // Update privileges state when user changes
    setPrivileges({
      accessDashboard: user.privileges.accessDashboard || false,
      accessHospitals: user.privileges.accessHospitals || false,
      accessGtmPartners: user.privileges.accessGtmPartners || false,
      accessMarketInsights: user.privileges.accessMarketInsights || false,
      accessCsrsFoundations: user.privileges.accessCsrsFoundations || false,
      accessSales : user.privileges.accessSales || false,
      formPrivilegesHC : user.privileges.formPrivilegesHC || false,
      formPrivilegesDD : user.privileges.formPrivilegesDD || false,
      ciPrivileges : user.privileges.ciPrivileges || false,
      startupPrivileges : user.privileges.startupPrivileges || false,
    });
  }, [user]);

  const handlePrivilegeChange = (privilege) => {
    setPrivileges((prevPrivileges) => ({
      ...prevPrivileges,
      [privilege]: !prevPrivileges[privilege],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      email,
      endDate,
      // Include privileges in the updated data
      privileges,
    };
    onUpdate(user._id, updatedData);
  };

  return (
    <div className="edit-form">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="User Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
          />
        </div>
        <div className="form-group">
            <label htmlFor="endDate">End Date of Subscription:</label>
            {/* <label htmlFor="endDate">Current : {endDate}</label> */}
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              placeholder="End Date"
              onChange={(e) => setEndDate(e.target.value)}
            />
        </div>

  
        <div className="privileges-section">
              <h3>Access Privileges</h3>
              <table className="privileges-table">
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={privileges.accessDashboard}
                        onChange={() => handlePrivilegeChange("accessDashboard")}
                      />
                    </td>
                    <td>
                      <label>
                        Access Dashboard
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={privileges.accessHospitals}
                        onChange={() => handlePrivilegeChange("accessHospitals")}
                      />
                    </td>
                    <td>
                      <label>
                        Access Hospitals
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={privileges.accessGtmPartners}
                        onChange={() => handlePrivilegeChange("accessGtmPartners")}
                      />
                    </td>
                    <td>
                      <label>
                        Access GTM Partners
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                              type="checkbox"
                              checked={privileges.accessMarketInsights}
                              onChange={() => handlePrivilegeChange("accessMarketInsights")}
                      />
                    </td>
                    <td>
                      <label>
                      Access Market Insights
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                              type="checkbox"
                              checked={privileges.accessCsrsFoundations}
                              onChange={() => handlePrivilegeChange("accessCsrsFoundations")}
                      />
                    </td>
                    <td>
                      <label>
                      Access CSRs/Foundations
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                              type="checkbox"
                              checked={privileges.accessSales}
                              onChange={() => handlePrivilegeChange("accessSales")}
                      />
                    </td>
                    <td>
                      <label>
                      Access Sales Tracker
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                              type="checkbox"
                              checked={privileges.formPrivilegesHC}
                              onChange={() => handlePrivilegeChange("formPrivilegesHC")}
                      />
                    </td>
                    <td>
                      <label>
                      Healthcare Centre Forms
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                              type="checkbox"
                              checked={privileges.formPrivilegesDD}
                              onChange={() => handlePrivilegeChange("formPrivilegesDD")}
                      />
                    </td>
                    <td>
                      <label>
                      Dealers & Distributors Forms
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                              type="checkbox"
                              checked={privileges.ciPrivileges}
                              onChange={() => handlePrivilegeChange("ciPrivileges")}
                      />
                    </td>
                    <td>
                      <label>
                      Access Competitive Intelligence
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                              type="checkbox"
                              checked={privileges.startupPrivileges}
                              onChange={() => handlePrivilegeChange("startupPrivileges")}
                      />
                    </td>
                    <td>
                      <label>
                      Access Startups
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
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

export default AdminUpdateUserForm;
