import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../layout/pages/Footer";
import Header2 from "../../layout/users/Header2";
import useAuth from "../../hooks/useAuth";
import MenuBar from "../../layout/users/MenuBar";


const Dashboard = () => {
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);
  const [totalHospitals, setTotalHospitals] = useState(0);
  const [totalDealers, setTotalDealers] = useState(0);
  const [totalReports, setTotalReports] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchHospitals();
      fetchDealers();
      fetchReports();
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

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/cont/pdfs`);
      setTotalReports(response.data.totalFiles);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
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
                <th className="header-cell" colSpan={3}>Dashboard Analytics</th>
              </tr>
              <tr>
                <td className="category-heading" colSpan="1">
                  Total Healthcare Centres
                </td>
                <td className="category-heading" colSpan="1">
                  Total MedTech-Companies
                </td>
                <td className="category-heading" colSpan="1">
                  Total Market Insights Reports
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
