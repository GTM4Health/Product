import React, { useState, useEffect, useRef } from "react";
import Footer from "../../layout/pages/Footer";
import AdminMenuBar from "../../layout/admin/AdminMenubar";
import useAuth from "../../hooks/useAuth";
import AdminHeader from "../../layout/admin/AdminHeader";
import AdminUpdateUserForm from "./AdminUpdateUsers";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import CompetitiveIntelligence from './../services/intel/AdminCompIntel';
const moment = require('moment');


function AdminDashboard() {
  const isAuthenticated = useAuth();
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);

  const myPieChartRef = useRef(); // Use a ref for Chart.js instance

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated, currentPage, pageSize]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchHospitals();
      fetchDealers();
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   if (myPieChartRef.current) {
  //     myPieChartRef.current.destroy(); // Destroy the previous chart if it exists
  //   }

  //   // Create a new chart
  //   const ctx = document.getElementById("myPieChart").getContext("2d");
  //   const myPieChart = new Chart(ctx, {
  //     type: "pie",
  //     data: pieChartData,
  //   });
  //   myPieChartRef.current = myPieChart; // Store the reference in the ref
  // }, [currentPage, pageSize]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/users?page=${currentPage}&limit=${pageSize}`
      );
      setUsers(response.data.users);
      setTotalUsers(response.data.totalRows);
      setTotalRows(response.data.totalRows);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/hospital-portal`
      );
      setTotalHospitals(response.data.totalRows);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDealers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Dealers/dealers-portal`
      );
      setTotalDealers(response.data.totalRows);
    } catch (error) {
      console.error(error);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  if (!isAuthenticated) {
    return null;
  }
  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/users/delete-user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      console.log("User deleted successfully");
    } catch (error) {
      console.error(error);
      console.log("Error deleting user");
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditFormVisible(true);
  };

  const handleUpdateUser = async (id, updatedData) => {
    try {
      const requestData = {
        data: updatedData,
      };

      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/users/update-user/${id}`, requestData);
      setEditFormVisible(false);
      setSelectedUser(null);
      fetchUsers();
      console.log("User updated successfully");
    } catch (error) {
      console.error(error);
      console.log("Error updating user");
    }
  };

  const pieChartData = {
    labels: ["Total Users"],
    datasets: [
      {
        data: [totalUsers],
        backgroundColor: ["#FF5733"],
      },
    ],
  };

  const handlePrevPage = () => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
        </div>
        <div className="page-title">
          <h1 className="page-title-child">User Dashboard</h1>
        </div>
        <div className="page-display">
          <h4 className="total-rows">Total Users = {totalRows}</h4>
          <h4 className="right">
            <i>Displaying Page {currentPage} of {totalPages}</i>
          </h4>
        </div>
        <div className="page-jump f-select">
              <label htmlFor="page-selector" className="f-label">Go to Page:</label>
              <select
                id="page-selector"
                value={currentPage}
                className="f-select"
                onChange={(e) => setCurrentPage(parseInt(e.target.value))}
              >
                {Array.from({ length: totalPages }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
        </div>
        <div className="pagination-buttons">
          {!isFirstPage && (
            <button className="prev-button" onClick={handlePrevPage}>
              &laquo; Prev
            </button>
          )}
          {!isLastPage && (
            <button className="next-button" onClick={handleNextPage}>
              Next &raquo;
            </button>
          )}
        </div>
        <div className="table-content">
          <table className="user-table">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Name</th>
                <th>Email</th>
                {/* <th>Phone</th>
                <th>Role</th> */}
                <th>Dashboard Privileges</th> 
                <th>Healthcare Centre Privileges</th>
                <th>Dealers & Distributors Privileges</th>
                <th>Reports Privileges</th>
                <th>Foundations Privileges</th>
                <th>Sales Tracker Privileges</th>
                <th>Healthcare Centre Forms Privileges</th>
                <th>Dealers & Distributors Forms Privileges</th>
                <th>Competitive Intelligence Privileges</th>
                <th>Startup Privileges</th>
                <th>Login Counter</th>
                <th>Last Login</th>
                <th>Activated Date & Time</th>
                <th>End of Subscription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                   {/* <td>{user.privileges.accessDashboard}</td> 
                  <td>{user.privileges.accessHospitals}</td>
                  <td>{user.privileges.accessGtmPartners}</td>
                  <td>{user.privileges.accessMarketInsights}</td>
                  <td>{user.privileges.accessCsrsFoundations}</td> */}
                  <td>{user.privileges.accessDashboard ?   'Granted'  : 'Restricted'}</td> 
                  <td>{user.privileges.accessHospitals ?   'Granted'  : 'Restricted'}</td>
                  <td>{user.privileges.accessGtmPartners ? 'Granted' : 'Restricted'}</td>
                  <td>{user.privileges.accessMarketInsights ? 'Granted' : 'Restricted'}</td>
                  <td>{user.privileges.accessCsrsFoundations ? 'Granted' : 'Restricted'}</td>
                  <td>{user.privileges.accessSales ? 'Granted' : 'Restricted'}</td>
                  <td>{user.privileges.formPrivilegesHC ?  'Granted' : 'Restricted'}</td>
                  <td>{user.privileges.formPrivilegesDD ?  'Granted' : 'Restricted'}</td>
                  <td>{user.privileges.ciPrivileges ?  'Granted' : 'Restricted'}</td>
                  <td>{user.privileges.startupPrivileges ?  'Granted' : 'Restricted'}</td>
                  {/* <td>{user.phone}</td>
                  <td>{user.role}</td> */}
                  <td>{user.counter}</td>
                  <td>{user.lastLogin ? (user.lastLogin) : '' }</td>
                  <td>{user.activationTime ? (user.activationTime) : ''}</td>
                  <td>{user.endDate ? moment(user.endDate).format('DD-MMM-YYYY'): ''}</td>

                  <td>
                      <button className="edit-button" onClick={() => handleEditUser(user)}>
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-buttons">
          {!isFirstPage && (
            <button className="prev-button" onClick={handlePrevPage}>
              &laquo; Prev
            </button>
          )}
          {!isLastPage && (
            <button className="next-button" onClick={handleNextPage}>
              Next &raquo;
            </button>
          )}
        </div>
      </div>
      {editFormVisible && (
        <AdminUpdateUserForm
          user={selectedUser}
          onUpdate={(id, updatedData) => handleUpdateUser(id, updatedData)}
          onCancel={() => setEditFormVisible(false)}
        />
      )}
      <Footer />
    </div>
  );
}

export default AdminDashboard;
