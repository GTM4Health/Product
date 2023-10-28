import React, { useState, useEffect, useRef } from "react";
import Footer from "../../layout/pages/Footer";
import AdminMenuBar from "../../layout/admin/AdminMenubar";
import useAuth from "../../hooks/useAuth";
import AdminHeader from "../../layout/admin/AdminHeader";
import { Pie } from "react-chartjs-2";
import axios from "axios";

function AdminDashboard() {
  const isAuthenticated = useAuth();
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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
                <th>Activated Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {/* <td>{user.phone}</td>
                  <td>{user.role}</td> */}
                  <td>{user.activationTime}</td>
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
      <Footer />
    </div>
  );
}

export default AdminDashboard;
