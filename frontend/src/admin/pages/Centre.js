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
    return <div>Loading...</div>;
  }

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="centre-details">
            <img src={gtm} alt="GTM Logo" className="gtm-logo" />
            <h1>{centre.name}</h1>
            <p><strong>About:</strong> {centre.about}</p>
            <p><strong>Infrastructure:</strong> {centre.infrastructure}</p>
            <p><strong>No of Beds:</strong> {centre.beds}</p>
            <p><strong>Certifications:</strong> {centre.certification}</p>
            <p><strong>Actionable Insights:</strong> {centre.insights}</p>
            <h3>Contact Details</h3>
            <p>Email: {centre.email}</p>
            <p>Phone: {centre.phone}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminCentreDetails;
