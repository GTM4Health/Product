import React, { useState, useEffect } from "react";
import Footer from "../../layout/pages/Footer";
import AdminMenuBar from "../../layout/admin/AdminMenubar";
import useAuth from "../../hooks/useAuth";
import AdminHeader from "../../layout/admin/AdminHeader";
import { Pie } from "react-chartjs-2";
import axios from "axios";

function AdminDashboard() {
  const isAuthenticated = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // You can set your default values
  const [pageSize, setPageSize] = useState(10); // You can set your default values
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

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="dashboard-content">
            <h1>
              <center>Welcome Admin!</center>
            </h1>
          </div>
          <div className="pie-chart-container">
            <canvas id="myPieChart"></canvas> {/* Canvas element for the chart */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
