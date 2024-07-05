
// src/StateDetails.js:

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../../layout/admin/AdminHeader';
import AdminMenuBar from '../../layout/admin/AdminMenubar';
import Footer from '../../layout/pages/Footer';
import { useNavigate, Link } from 'react-router-dom';

const StateDetails = () => {
  const { state } = useParams();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal/state-centers/${state}/cities`);
      setCities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag">{state} Analytics</h1>
          </div>
          <div className="table-content">
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>City</th>
                  <th>Total # of Centres</th>
                  </tr>
              </thead>
              <tbody>
              {cities.map((city, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td><Link to={`/city/${city._id}`}>{city._id}</Link></td>
                    <td>{city.totalCenters}</td>
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

export default StateDetails;
