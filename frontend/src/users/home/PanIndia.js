// PanIndia.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../layout/pages/Footer";
import Header2 from "../../layout/users/Header2";
import useAuth from "../../hooks/useAuth";
import MenuBar from "../../layout/users/MenuBar";

const PanIndia = () => {
  const [stateCenters, setStateCenters] = useState([]);
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(isAuthenticated)
        fetchStateCenters();
  }, [isAuthenticated]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const fetchStateCenters = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal/state-centers`);
      // Sort the stateCenters array based on the totalCenters value in descending order
      const sortedStateCenters = response.data.sort((a, b) => b.totalCenters - a.totalCenters);
      setStateCenters(sortedStateCenters);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="page-view">
      <Header2 user={user}/>
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
                {stateCenters.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.id}</td>
                    <td>{entry.state}</td>
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

export default PanIndia;


