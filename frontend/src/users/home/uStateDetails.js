
// src/StateDetails.js:

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../layout/pages/Footer';
import Header2 from '../../layout/users/Header2';
import MenuBar from '../../layout/users/MenuBar';
import useAuth from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const UserStateDetails = () => {
  const { state } = useParams();
  const [cities, setCities] = useState([]);
  const [user, setUser] = useState(null);
  const isAuthenticated = useAuth();


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    console.log(user)
    // if(![user.privileges.accessDashboard]){
    //   return <Subscription />;
    // }
  }, []);

  useEffect(() => {
    if(isAuthenticated)
    fetchCities();
  }, [isAuthenticated]);

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
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
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
                    <td><Link to={`/dashboard/city-analysis/${city._id}`}>{city._id}</Link></td>
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

export default UserStateDetails;
