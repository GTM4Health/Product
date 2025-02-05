// src/CategoryDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from '../../layout/admin/AdminHeader';
import AdminMenuBar from '../../layout/admin/AdminMenubar';
import Footer from '../../layout/pages/Footer';

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    fetchCategoryCenters();
  }, []);
  const fetchCategoryCenters = async () => {
    try {
      if (!categoryName) {
        throw new Error('Category name is undefined');
      }
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/hospital-portal/categories/${encodeURIComponent(categoryName)}`
      );
      setCenters(response.data);
    } catch (error) {
      console.error('Error fetching category centers:', error);
      //setError('Error fetching category centers');
    }
  };



  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag">Healthcare Centers - {categoryName}</h1>
          </div>
          <div className="table-content">
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Center Name</th>
                  <th>Location</th>
                  <th>Total Beds</th>
                  <th>Certification</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {centers.map((center, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <Link to={`/city/centre/${item._id}`} className="details-link">
                      <td>{center.name}</td>
                    </Link>
                    <td>{center.city}, {center.state}</td>
                    <td>{center.beds}</td>
                    <td>{center.certification}</td>
                    <td>
                    <Link to={`/city/centre/${item._id}`} className="details-link">
                      View Details
                    </Link>
                    </td>
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

export default CategoryDetails;
