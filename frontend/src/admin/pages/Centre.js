// AdminCentreDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../../layout/admin/AdminHeader';
import AdminMenuBar from '../../layout/admin/AdminMenubar';
import Footer from '../../layout/pages/Footer';
import gtm from '../../images/newlogo.png';

const AdminCentreDetails = () => {
  const { id } = useParams();
  const [centre, setCentre] = useState(null);

  useEffect(() => {
    const fetchCentreDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal/centre/${id}`);
        setCentre(response.data);
      } catch (error) {
        console.error('Error fetching centre details:', error);
      }
    };

    fetchCentreDetails();
  }, [id]);

  if (!centre) {
    return <div className="centre-loading">Loading...</div>;
  }

  return (
    <div className="admin-page">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
        <AdminMenuBar />
        <div className="centre-details-container">
          <div className="centre-header">
            {/* <img src={gtm} alt="GTM Logo" className="centre-logo" /> */}
            <h1 className="centre-name">{centre.name}</h1>
            {/* <hr className="divider" /> */}
            <h3>{centre.city}, {centre.state}</h3>
          </div>

          <div className="centre-info">
            <h2 className="centre-section-title">Infrastructure and Services</h2>
            <ul className="centre-info-list">
              <li className="centre-info-item"><h3><strong>Category:</strong> {centre.category}</h3></li>
              <li className="centre-info-item"><h3><strong>No of Beds:</strong> {centre.beds}</h3></li>
              <li className="centre-info-item"><h3><strong>Certifications:</strong> {centre.certification}</h3></li>
            </ul>
          </div>
          <div className="centre-insights">
            <h2 className="centre-section-title">Actionable Insights</h2>
            <div className="centre-insights-item"><h4>{centre.infraSer}</h4></div>
          </div>
          <div className="centre-contact">
            <h2 className="centre-section-title">Contact Details</h2>
            <ul className="centre-contact-list">
              <li className="centre-contact-item"><h3><strong>Name:</strong> {centre.details}</h3></li>
              <li className="centre-contact-item"><h3><strong>Email:</strong> {centre.mail}</h3></li>
              <li className="centre-contact-item"><h3><strong>Phone:</strong> {centre.phone}</h3></li>
            </ul>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminCentreDetails;
