import React, { useState, useEffect } from 'react';
import Footer from '../../../layout/pages/Footer';
import AdminMenuBar from '../../../layout/admin/AdminMenubar';
import useAuth from '../../../hooks/useAuth';
import AdminHeader from '../../../layout/admin/AdminHeader';
import axios from 'axios';

const CompetitiveIntelligencePortal = () => {
  const isAuthenticated = useAuth();
  const [competitiveData, setCompetitiveData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCompetitiveIntelligence();
    }
  }, [isAuthenticated, currentPage]);

  const fetchCompetitiveIntelligence = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/competitive-intelligence`, {
        params: {
          page: currentPage,
          limit: pageSize,
          // Add other parameters if needed
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


  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag">Competitive Intelligence Portal</h1>
          </div>
          {/* Add your filter and display components here */}
          <div className="filter-container">
            {/* Add filters as needed */}
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

export default CompetitiveIntelligencePortal;
