// src/PanIndiaDash.js:

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../../layout/admin/AdminHeader';
import AdminMenuBar from '../../layout/admin/AdminMenubar';
import Footer from '../../layout/pages/Footer';
import { useNavigate, Link } from 'react-router-dom';
import StateDetails from './StateDetails';

const PanIndiaDash = () => {
  const [stateCenters, setStateCenters] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchStateCenters();
  }, []);

  const fetchStateCenters = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal/state-centers`);
      const sortedStateCenters = response.data.sort((a, b) => b.totalCenters - a.totalCenters);
      setStateCenters(sortedStateCenters);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStateClick = (state) => {
    const selectedState = stateCenters.find((entry) => entry.state === state);
    if (selectedState) {
      navigate(`/state-details/${state}`); // Navigate to the StateDetails component with the selected state
    }
  };

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag">Pan India Dashboard Analytics</h1>
          </div>
          <div className="table-content">
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>States & Union Territories</th>
                  <th>Total # of Centres</th>
                </tr>
              </thead>
              <tbody>
              {stateCenters.map((entry, index) => (
                  <tr key={entry.id} onClick={() => handleStateClick(entry.state)}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/state-details/${entry.state}`}>
                        {entry.state}
                      </Link>
                    </td>
                    <td>{entry.totalCenters}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PanIndiaDash;


