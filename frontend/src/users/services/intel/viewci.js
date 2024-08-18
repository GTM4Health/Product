import React, { useState, useEffect } from "react";

import axios from 'axios';
import Footer from "../../../layout/pages/Footer"
import useAuth from "../../../hooks/useAuth";
import { stateOptions, getCityOptionsByState } from "../../../assets/cityOptions";
import Header2 from "../../../layout/users/Header2";
import MenuBar from "../../../layout/users/MenuBar";
//import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const UserViewCI = () => {
  const isAuthenticated = useAuth();
  const [competitiveData, setCompetitiveData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedIntel, setSelectedIntel] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);


  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetchCompetitiveIntelligence();
  //   }
  // }, [isAuthenticated, currentPage,user]);

  useEffect(() => {
    if (user && user.ciPrivileges && isAuthenticated) {
      fetchCompetitiveIntelligence();
    } else if (user && !(user.ciPrivileges) && isAuthenticated) {
      navigate("/dashboard/Subscription");
    }
  }, [isAuthenticated]);

  const fetchCompetitiveIntelligence = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/competitive-intelligence-user`, {
        params: {
          page: currentPage,
          limit: pageSize,
        },
      });
      setCompetitiveData(response.data.competitiveData);
      setTotalRows(response.data.totalRows);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

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

  const handleEditIntel = (intel) => {
    setSelectedIntel(intel);
    setEditFormVisible(true);
  };

  const handleUpdateIntel = async (id, updatedData) => {
    try {
      const requestData = {
        data: updatedData,
      };

      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/up-competitive-intelligence/update-intel/${id}`, requestData);
      setEditFormVisible(false);
      setSelectedIntel(null);
      fetchCompetitiveIntelligence();
      console.log("Competitive Intelligence updated successfully");
    } catch (error) {
      console.error(error);
      console.log("Error updating competitive intelligence");
    }
  };

  const handleDeleteIntel = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this competitive intelligence?");
    if (!confirmed) {
      return;
    }

    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/del-competitive-intelligence/delete-intel/${id}`);
      
      if (response.status === 200) {
        setCompetitiveData(competitiveData.filter((intel) => intel._id !== id));
        console.log("Competitive Intelligence deleted successfully");
      } else {
        console.log("Error deleting competitive intelligence");
      }
    } catch (error) {
      console.error(error);
      console.log("Error deleting competitive intelligence");
    }
  };

  return (
    <div className="page-view">
      <Header2 user={user}/>
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag">Competitive Intelligence Portal</h1>
          </div>
          <div className="filter-container">
          </div>
          <div className="page-display">
            <h4 className="total-rows ft5">Total Competitive Intelligence Records = {totalRows}</h4>
            <h4 className="right ft5">
              <i>
                Displaying Page {currentPage} of {totalPages}
              </i>
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
                  <th>Domain/Product</th>
                  <th>Competitor Info</th>
                  {/* Add other fields as needed */}
                </tr>
              </thead>
              <tbody>
                {competitiveData.map((intel, index) => (
                  <tr key={index + 1}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{intel.domain}</td>
                    <td>{intel.competitorInfo}</td>
                    {/* Add other fields as needed */}
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
      </div>
      <Footer />
    </div>
  );
};

export default UserViewCI;
