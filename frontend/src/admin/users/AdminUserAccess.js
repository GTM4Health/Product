import React, { useState, useEffect } from "react";
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
  const [currentPage, setCurrentPage] = useState(1); // You can set your default values
  const [pageSize, setPageSize] = useState(10); // You can set your default values
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  let myPieChart; // Declare Chart.js instance reference

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/users?page=${currentPage}&limit=${pageSize}`
        );
        setTotalUsers(response.data.totalRows);

        // Destroy the previous chart if it exists
        if (myPieChart) {
          myPieChart.destroy();
        }

        // Create a new chart
        const ctx = document.getElementById("myPieChart").getContext("2d");
        myPieChart = new Chart(ctx, {
          type: "pie",
          data: pieChartData,
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated, currentPage, pageSize]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/users?page=${currentPage}&limit=${pageSize}`
        );
        setUsers(response.data.users);
        setTotalRows(response.data.totalRows)
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated, currentPage, pageSize]);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  if (!isAuthenticated) {
    // Optional: Show a loading state or return null while checking authentication
    return null;
  }

  // Define data for the pie chart
  const pieChartData = {
    labels: ["Total Users"],
    datasets: [
      {
        data: [totalUsers],
        backgroundColor: ["#FF5733"], // You can customize the colors
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

//   <div className="dashboard-content">
//   <h1>
//     <center>Welcome Admin!</center>
//   </h1>
// </div>
// <div className="pie-chart-container">
//   <canvas id="myPieChart"></canvas> {/* Canvas element for the chart */}
// </div>

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
            <h4 className="right"><i>Displaying Page {currentPage} of {totalPages}</i></h4>
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
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Activated Time</th>
                  {/* Add more table headers if needed */}
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>{user.activationTime}</td>
                    {/* Add more table cells for additional features */}
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
