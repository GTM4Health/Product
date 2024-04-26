import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../../layout/admin/AdminHeader';
import AdminMenuBar from '../../layout/admin/AdminMenubar';
import Footer from '../../layout/pages/Footer';
import Table from '../../components/table';

const CityDetails = () => {
  const { city } = useParams();
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal/city/${city}`);
      setHospitals(response.data.hospitals);
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
            <h1 className="page-title-child hdblue-tag">{city} Hospitals</h1>
          </div>
          <div className="table-content">
            <Table data={hospitals} /> {/* Render the table component */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CityDetails;
