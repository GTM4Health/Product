// src/UserCategoriesDash.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../layout/pages/Footer';
import Header2 from '../../layout/users/Header2';
import MenuBar from '../../layout/users/MenuBar';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const UserCategoriesDash = () => {
  const isAuthenticated = useAuth();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCategories();
    }
  }, [isAuthenticated]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal/categories`);
      const sortedCategories = response.data.sort((a, b) => b.totalCenters - a.totalCenters);
      setCategories(sortedCategories);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag">Healthcare Categories Dashboard</h1>
          </div>
          <div className="table-content">
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category</th>
                  <th>Total # of Healthcare Centres</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>
                    <Link to={`/dashboard/categories/${category._id}`}>{category.name}</Link>
                    </td>
                    <td>{category.totalCenters}</td>
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

export default UserCategoriesDash;
