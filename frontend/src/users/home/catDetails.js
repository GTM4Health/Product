// src/CategoryDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../layout/pages/Footer';
import MenuBar from '../../layout/users/MenuBar';
import Header2 from '../../layout/users/Header2';
import useAuth from '../../hooks/useAuth';

const UserCategoryDetails = () => {
  const { categoryName } = useParams();
  const [centers, setCenters] = useState([]);
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(isAuthenticated)
        fetchCategoryCenters();
  }, [isAuthenticated]);

  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
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
      <Header2 user={user}/>
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
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
                </tr>
              </thead>
              <tbody>
                {centers.map((center, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{center.name}</td>
                    <td>{center.city}, {center.state}</td>
                    <td>{center.beds}</td>
                    <td>{center.certification}</td>
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

export default UserCategoryDetails;
