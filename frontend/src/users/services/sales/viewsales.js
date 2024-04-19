import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../../layout/pages/Footer';
import Header2 from '../../../layout/users/Header2';
import MenuBar from '../../../layout/users/MenuBar';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const ViewSales = () => {
  const [user, setUser] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.salesPriveleges && isAuthenticated) {
      // setLeadName(user.name);
      fetchSalesData();
    } else if (user && !(user.salesPriveleges) && isAuthenticated) {
      navigate("/dashboard/Subscription");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);


  const fetchSalesData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Sales/get-sales`,
        {
          params: {
            page: currentPage,
            limit: pageSize,
          },
        }
      );
      setSalesData(response.data.sales);
      setTotalRows(response.data.totalRows);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching sales data:', error);
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
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="hosp-content">
            <h1>View Sales</h1>
            <div className="sales-data">
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
              <div className="page-info">
                <p>
                  Page {currentPage} of {totalPages}
                </p>
              </div>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Lead Name</th>
                    <th>Healthcare Centre Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Status</th>
                    <th>Report Date</th>
                    <th>Final Status</th>
                    <th>Reports</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((sale, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{sale.leadName}</td>
                      <td>{sale.healthcareCentreName}</td>
                      <td>{sale.email}</td>
                      <td>{sale.mobileNo}</td>
                      <td>{sale.status}</td>
                      <td>{sale.reportDate}</td>
                      <td>{sale.finalStatus}</td>
                      <td>{sale.reportsBetweenDates}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewSales;
