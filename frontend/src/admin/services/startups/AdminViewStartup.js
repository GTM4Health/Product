import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer"
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";
import EditStartupForm from "./AdminUpdateStartup";
import axios from "axios";

const StartupPortal = () => {
  const isAuthenticated = useAuth();
  const [startups, setStartups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStartups();
    }
  }, [isAuthenticated, currentPage]);

  const fetchStartups = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Startups/startups-portal?`;
  
    const params = new URLSearchParams();
    params.append('page', currentPage);
    params.append('limit', pageSize);
  
    try {
      const response = await axios.get(url + params.toString());
      setStartups(response.data.startups);
      setTotalRows(response.data.totalRows);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevPage = () => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handleEditStartup = (startup) => {
    setSelectedStartup(startup);
    setEditFormVisible(true);
  };

  const handleUpdateStartup = async (id, updatedData) => {
    try {
      const requestData = {
        data: updatedData,
      };

      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Startups/update-startup/${id}`, requestData);
      setEditFormVisible(false);
      setSelectedStartup(null);
      fetchStartups();
      console.log("Startup updated successfully");
    } catch (error) {
      console.error(error);
      console.log("Error updating startup");
    }
  };

  const handleDeleteStartup = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this startup?");
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Startups/delete-startup/${id}`);
      setStartups(startups.filter((startup) => startup._id !== id));
      console.log("Startup deleted successfully");
    } catch (error) {
      console.error(error);
      console.log("Error deleting startup");
    }
  };

  if (!isAuthenticated) {
    // Optional: Show a loading state or return null while checking authentication
    return null;
  }

  const displayedStartups = startups;

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="page-title">
            <h1 className="page-title-child">Startups</h1>
          </div>
          <div className="page-display">
            <h4 className="total-rows">Total Startups = {totalRows}</h4>
            <h4 className="right">
              <i>
                Displaying Page {currentPage} of {totalPages}
              </i>
            </h4>
          </div>
          <div className="table-content">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Startup Name</th>
                  <th>Website</th>
                  <th>Product Stage</th>
                  <th>Domain</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedStartups.map((startup, index) => (
                  <tr key={startup._id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{startup.startupName}</td>
                    <td>{startup.website}</td>
                    <td>{startup.productStage}</td>
                    <td>{startup.domain}</td>
                    <td>
                      <button className="edit-button" onClick={() => handleEditStartup(startup)}>
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteStartup(startup._id)}>
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
      </div>
      {/* Render the edit form for updating startups */}
      {editFormVisible && (
        <div>
          {/* Pass the startup object and update function to the EditStartupForm component */}
          <EditStartupForm
            startup={selectedStartup}
            onUpdate={(id, updatedData) => handleUpdateStartup(id, updatedData)}
            onCancel={() => setEditFormVisible(false)}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default StartupPortal;
