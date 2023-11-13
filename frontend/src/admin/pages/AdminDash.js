import React, { useState, useEffect, useRef } from "react";
import Footer from "../../layout/pages/Footer";
import AdminMenuBar from "../../layout/admin/AdminMenubar";
import useAuth from "../../hooks/useAuth";
import AdminHeader from "../../layout/admin/AdminHeader";
import { Pie } from "react-chartjs-2";
import {Chart, ArcElement } from "chart.js";
import axios from "axios";



function AdminDashboard() {
  const isAuthenticated = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalHospitals, setTotalHospitals] = useState(0);
  const [totalDealers, setTotalDealers] = useState(0);
  const [totalStartups, setTotalStartups] = useState(0);
  const [chartData, setChartData] = useState(null);
  // Chart.register(PieElement);
// Register the ArcElement
Chart.register(ArcElement);
  useEffect(() => {
    if (!isAuthenticated) {
      // Handle authentication issues here
      return;
    }
  
    // Fetch the total number of users and other data
    fetchUsers();
    fetchHospitals();
    fetchDealers();
    fetchStartups();
  }, [isAuthenticated]);
  
  useEffect(() => {
    if (totalUsers > 0 && totalHospitals > 0 && totalDealers > 0 && totalStartups > 0) {
      // Create the new chart
      setChartData({
        labels: ["Total Hospitals", "Total Dealers", "Total Startups", "Total Users"],
        datasets: [
          {
            data: [totalHospitals, totalDealers, totalStartups, totalUsers],
            backgroundColor: ["#FF5733", "#3366FF", "#33FF33", "#FF9900"],
          },
        ],
      });
    }
  }, [totalUsers, totalHospitals, totalDealers, totalStartups]);
  
  

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/users`
      );
      setTotalUsers(response.data.totalRows);
    } catch (error) {
      console.error(error);
    }
  }

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

  const fetchStartups = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Startups/startups-portal`
      );
      setTotalStartups(response.data.totalRows);
    } catch (error) {
      console.error(error);
    }
  };
  const updatedChartData = {
    labels: ["Total Hospitals", "Total Dealers", "Total Startups", "Total Users"],
    datasets: [
      {
        data: [totalHospitals, totalDealers, totalStartups, totalUsers],
        backgroundColor: ["#FF5733", "#3366FF", "#33FF33", "#FF9900"],
      },
    ],
  };

   
// Define data for the pie chart
const pieChartData = {
  labels: ["Total Hospitals", "Total Dealers", "Total Startups", "Total Users"],
  datasets: [
    {
      data: [totalHospitals, totalDealers, totalStartups, totalUsers],
      backgroundColor: ["#FF5733", "#3366FF", "#33FF33", "#FF9900"], // Customize colors as needed
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
            {/* <h1>
              <center>Welcome Admin!</center>
            </h1> */}

            <table className="stats-table">
              <tr>
                <th className="header-cell" colSpan={4}>Dashboard Analytics</th>
              </tr>
              <tr><th> </th></tr>
              <tr><th> </th></tr>
              <tr><th> </th></tr>
              <tr><th> </th></tr>
              <tr><th> </th></tr>
              <tr><th> </th></tr>
              <tr><th> </th></tr>
              <tr><th> </th></tr>
              <tr><th> </th></tr>
              <tr><th> </th></tr>
              <tr><th> </th></tr>
              <tr>
                <td className="category-heading" colSpan="1">
                  Total Users
                </td>
                <td className="category-heading" colSpan="1">
                  Total Healthcare Centres
                </td>
                <td className="category-heading" colSpan="1">
                  Total MedTech-Companies
                </td>
                <td className="category-heading" colSpan="1">
                  Total Startups
                </td>
              </tr>
              <tr>
                <td className="data-cell" colSpan="1">
                  {totalUsers}
                </td>
                <td className="data-cell" colSpan="1">
                  {totalHospitals}
                </td>
                <td className="data-cell" colSpan="1">
                  {totalDealers}                 
                </td>
                <td className="data-cell" colSpan="1">
                  {totalStartups}                 
                </td>
              </tr>
              {/* <tr>
                <td className="category-heading" colSpan="1">
                  Total MedTech-Companies
                </td>
              </tr>
              <tr>
                <td className="data-cell" colSpan="1">
                  {totalDealers}                 
                </td>
              </tr> */}
            </table>
            </div>
            {chartData && (
                <div className="pie-chart-container">
                  <Pie data={chartData} />
                </div>
              )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
