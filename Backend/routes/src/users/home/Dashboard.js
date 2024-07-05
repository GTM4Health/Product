import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../layout/pages/Footer";
import Header2 from "../../layout/users/Header2";
import useAuth from "../../hooks/useAuth";
import MenuBar from "../../layout/users/MenuBar";
import Subscription from "../../common/Subscribe";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";


Chart.register(ArcElement, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);
  const [totalHospitals, setTotalHospitals] = useState(0);
  const [totalDealers, setTotalDealers] = useState(0);
  const [totalReports, setTotalReports] = useState(0);
  const [totalCSRs, setTotalCSRs] = useState(0);
  const [topCities, setTopCities] = useState([]);


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
    if (isAuthenticated) {
      fetchHospitals();
      fetchDealers();
      fetchReports();
      fetchCSRs();
      fetchTopCities();
    }

  }, [isAuthenticated]);

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

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/cont/pdfs`);
      setTotalReports(response.data.totalFiles);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
    }
  };

  const barChartData = {
    labels: topCities.map(city => city._id.substring(0, 4)+"."),
    datasets: [
      {
        label: 'Total Centres',
        data: topCities.map(city => city.totalCenters),
        backgroundColor: ["#0077b6"],
      },
    ],
  };

  // const barChartData = {
  //   labels: topCities.map(city => city._id.substring(0, 4)),
  //   datasets: [
  //     {
  //       label: 'Total Centres',
  //       data: topCities.map(city => city.totalCenters),
  //       backgroundColor: ["#3366FF"],
  //     },
  //   ],
  // };

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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <Header2 user={user} />
      <div className="d-content page-view">
        <div className="dashboard">
          <MenuBar />
          
          <div className="dashboard-content">
          <table className="stats-table">
              <tr>
                <th className="header-cell" colSpan={4}>Dashboard Analytics</th>
              </tr>
              <tr>
                <td className="category-heading" colSpan="1">
                  Total Healthcare Centres
                </td>
                <td className="category-heading" colSpan="1">
                  Total Distribution-Companies
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
                  {totalHospitals}
                </td>
                <td className="data-cell" colSpan="1">
                  {totalDealers}                 
                </td>
                <td className="data-cell" colSpan="1">
                  {totalReports}                 
                </td>
                <td className="data-cell" colSpan="1">
                  {totalCSRs}                 
                </td>
              </tr>
              {console.log(user)}
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
            <div className="top-cities-charts chart-box stats-table">
              <h3>Top 5 Cities in Karnataka - Total Centres</h3>
              <Bar data={barChartData} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
