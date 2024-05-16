import React, { useState, useEffect, useRef } from "react";
import Footer from "../../layout/pages/Footer";
import AdminMenuBar from "../../layout/admin/AdminMenubar";
import useAuth from "../../hooks/useAuth";
import AdminHeader from "../../layout/admin/AdminHeader";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale);



function AdminDashboard() {
  const isAuthenticated = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalHospitals, setTotalHospitals] = useState(0);
  const [totalDealers, setTotalDealers] = useState(0);
  const [totalStartups, setTotalStartups] = useState(0);
  const [totalReports, setTotalReports] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [totalCSRs, setTotalCSRs] = useState(0);
  const [topCities, setTopCities] = useState([]);
  // Chart.register(PieElement);
// Register the ArcElement
useEffect(() => {
  if (!isAuthenticated) {
    return;
  }
  fetchUsers();
  fetchHospitals();
  fetchDealers();
  fetchStartups();
  fetchReports();
  fetchCSRs();
  fetchTopCities();
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

  const fetchCSRs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/CSR/csrs-portal`
      );
      setTotalCSRs(response.data.totalRows);
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

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/cont/pdfs`);
      setTotalReports(response.data.totalFiles);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
    }
  };

  // const barChartData = {
  //   labels: ["Total Hospitals", "Total Dealers", "Total Startups", "Total Users"],
  //   datasets: [
  //     {
  //       data: [totalHospitals, totalDealers, totalStartups, totalUsers],
  //       backgroundColor: ["#3366FF", "#3366FF", "#3366FF", "#3366FF"],
  //     },
  //   ],
  // };

  const barChartData = {
    labels: topCities.map(city => city._id),
    datasets: [
      {
        label: 'Total Centres',
        data: topCities.map(city => city.totalCenters),
        backgroundColor: ["#3366FF", "#3366FF", "#3366FF", "#3366FF", "#3366FF"],
      },
    ],
  };

  const citiesChartData = {
    labels: topCities.map(city => city._id),
    datasets: [
      {
        label: 'Total Centres',
        data: topCities.map(city => city.totalCenters),
        backgroundColor: ["#FF5733", "#3366FF", "#33FF33", "#FF9900", "#FF33FF"],
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw;
            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            return `${label}: ${value} (${percentage})`;
          }
        }
      },
      legend: {
        display: true,
        position: 'right',
      },
    }
  };

  



  const fetchTopCities = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/hospital-portal/state-centers/Karnataka/cities`
      );
      const sortedCities = response.data.sort((a, b) => b.totalCenters - a.totalCenters).slice(0, 5);
      setTopCities(sortedCities);
    } catch (error) {
      console.error(error);
    }
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
    // console.log("totalUsers:", totalUsers);
    // console.log("pieChartData:", pieChartData);



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
                <th className="header-cell" colSpan={6}>Dashboard Analytics</th>
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
                  Total Distribution Companies
                </td>
                <td className="category-heading" colSpan="1">
                  Total Startups
                </td>
                <td className="category-heading" colSpan="1">
                  Total Market Insights Reports
                </td>
                <td className="category-heading" colSpan="1">
                  Total CSRs & Foundations
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
                <td className="data-cell" colSpan="1">
                  {totalReports}                 
                </td>
                <td className="data-cell" colSpan="1">
                  {totalCSRs}
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
            
            {/* {chartData && (
                <div className="pie-chart-container">
                  <Pie data={chartData} />
                </div>
              )} */}
              <div className="top-cities-charts chart-box">
              <h3>Top 5 Cities in Karnataka - Total Centres</h3>
              <Bar data={barChartData} />
              <div className="pie-chart-container">
              <Pie data={citiesChartData} options={pieChartOptions}/>
              </div>
              
            </div>
            
              {/* <div className="top-cities-charts">
              {topCities.map((city, index) => (
                <div key={index} className="city-chart">
                  <h3>{city._id}</h3>
                  <Bar data={{
                    labels: ["Total Centres"],
                    datasets: [{
                      label: city._id,
                      data: [city.totalCenters],
                      backgroundColor: ["#FF5733"],
                    }],
                  }} />
                  <Pie data={{
                    labels: ["Total Centres"],
                    datasets: [{
                      data: [city.totalCenters],
                      backgroundColor: ["#FF5733"],
                    }],
                  }} />
                </div>
              ))}
            </div> */}
            {/* <div className="charts-container">
            <div className="chart-box">
              <h3>Distribution Overview</h3>
              <Pie data={citiesChartData} />
            </div>
            <div className="chart-box">
              <h3>Top 5 Cities in Karnataka - Total Centres</h3>
              <Bar data={citiesChartData} />
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
