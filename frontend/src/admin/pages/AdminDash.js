import React, { useState, useEffect } from "react";
import Footer from "../../layout/pages/Footer";
import AdminMenuBar from "../../layout/admin/AdminMenubar";
import useAuth from "../../hooks/useAuth";
import AdminHeader from "../../layout/admin/AdminHeader";
import { Pie } from "react-chartjs-2";

function AdminDashboard() {
  const isAuthenticated = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);
  let myPieChart; // Declare Chart.js instance reference

  useEffect(() => {
    // Fetch the total number of users from the API
    fetch("/api/users") // You may need to adjust the API endpoint
      .then((response) => response.json())
      .then((data) => {
        // Destroy the previous chart if it exists
        if (myPieChart) {
          myPieChart.destroy();
        }
        setTotalUsers(response.data.totalRows);
        // Create a new chart
        const ctx = document.getElementById("myPieChart").getContext("2d");
        myPieChart = new Chart(ctx, {
          type: "pie",
          data: pieChartData,
        });
      })
      .catch((error) => {
        console.error("Failed to fetch total users", error);
      });
  }, []);

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

    // Debugging: Log the value of totalUsers and pieChartData
    console.log("totalUsers:", totalUsers);
    console.log("pieChartData:", pieChartData);

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
