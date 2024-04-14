// src/PanIndiaDash.js:

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import AdminHeader from '../../layout/admin/AdminHeader';
// import AdminMenuBar from '../../layout/admin/AdminMenubar';
import Footer from '../../layout/pages/Footer';
import { useNavigate, Link } from 'react-router-dom';
import Header2 from '../../layout/users/Header2';
import MenuBar from '../../layout/users/MenuBar';
import useAuth from '../../hooks/useAuth';

const PanIndiaDash = () => {
  const isAuthenticated = useAuth();
  const [stateCenters, setStateCenters] = useState([]);
  const [cities, setCities] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    fetchStateCenters();
  }, [isAuthenticated]);

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
      navigate(`/dashboard/state-details/${state}`); // Navigate to the StateDetails component with the selected state
    }
  };

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
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
                      <Link to={`/dashboard/state-details/${entry.state}`}>
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


