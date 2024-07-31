import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../../layout/admin/AdminHeader';
import AdminMenuBar from '../../layout/admin/AdminMenubar';
import Footer from '../../layout/pages/Footer';

const AddedDashboard = () => {
  const [userCenters, setUserCenters] = useState([]);

  useEffect(() => {
    fetchUserCenters();
  }, []);

  const fetchUserCenters = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal/added-dashboard`);
      const sortedUserCenters = response.data.sort((a, b) => b.totalCenters - a.totalCenters);
      setUserCenters(sortedUserCenters);
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
            <h1 className="page-title-child hdblue-tag">Added Dashboard Analytics</h1>
          </div>
          <div className="table-content">
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Total # of Centers Added</th>
                </tr>
              </thead>
              <tbody>
                {userCenters.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>{index + 1}</td>
                    <td>{entry.user}</td>
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

export default AddedDashboard;
