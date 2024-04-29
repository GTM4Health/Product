import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../../layout/pages/Footer';
import Header2 from '../../../layout/users/Header2';
import MenuBar from '../../../layout/users/MenuBar';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import EditSalesForm from './updatesales';

const ViewSales = () => {
  const [user, setUser] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const isAuthenticated = useAuth();
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const moment = require("moment");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.salesPriveleges && isAuthenticated) {
      // setLeadName(user.name);
      fetchSalesData();
    } else if (user && !(user.salesPriveleges) && isAuthenticated) {
      navigate("/dashboard/Subscription");
    }
  }, [isAuthenticated, currentPage]);

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
            startDate: startDate,
            endDate: endDate
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

  const handleEditSales = (sale) => {
    setSelectedSale(sale); // Set selected sale for editing
    setEditFormVisible(true); // Show edit form
  };

  const handleSearch = () => {
    fetchSalesData();
  };

  const handleClearSearch = () => {
    setStartDate('');
    setEndDate('');
    fetchSalesData();
  };

  const handleUpdateSales = async (id, updatedData) => {
    const { reportDate, ...restData } = updatedData;
    // Format the reportDate
    const formattedReportDate = new Date(reportDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).split(' ').join('-').toUpperCase();
    
    try {
      // Include the formatted reportDate in the requestData
      const requestData = {
        data: {
          ...restData,
          reportDate: formattedReportDate
        },
      };
      // alert(requestData.data);
      // console.log(requestData);
      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Sales/update-sale/${id}`, requestData);
      setEditFormVisible(false); // Hide edit form after successful update
      setSelectedSale(null); // Clear selected sale
      fetchSalesData(); // Fetch updated sales data
      console.log("Sales updated successfully");
    } catch (error) {
      console.error('Error updating sale:', error);
    }
  };

  const handleDeleteSale = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this sale?");
      if (confirmDelete) {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Sales/delete-sale/${id}`);
        setSalesData(salesData.filter((sale) => sale._id !== id));
        console.log("Sale deleted successfully");
      }
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };
  

  const handleCancelEdit = () => {
    setEditFormVisible(false); // Hide edit form
    setSelectedSale(null); // Clear selected sale
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
      <MenuBar />
        <div className="dashboard">
        <div className="page-title">
            <h1 className="page-title-child">View Sales Progress</h1>
          </div>
            <div className="filter-container">
              <label htmlFor="start-date" className='f-label'>Start Date:</label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='form-outline f-select'
              />
              <label htmlFor="end-date" className='f-label'>End Date:</label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='form-outline f-select'
              />
            </div>
            <div className="page-jump filter-container">
              <div className='f-select'>
              <label htmlFor="page-selector" className="f-label">Go to Page:</label>
              <select
                id="page-selector"
                value={currentPage}
                className="f-select"
                onChange={(e) => setCurrentPage(parseInt(e.target.value))}
              >
                {Array.from({ length: totalPages }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              </div> 
              <button onClick={handleSearch} className="clear-btn">Search</button>
              <button onClick={handleClearSearch} className="clear-btn">Clear Search</button>
              </div>
          <div className="hosp-content">
            <div className="sales-data">
              <div className="page-display">
                <h4 className="total-rows ft5">Total Sales Records = {totalRows}</h4>
                <h4 className="right ft5">
                  <i>Displaying Page {currentPage} of {totalPages}</i>
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
              {/* <div className="page-info">
                <p>
                  Page {currentPage} of {totalPages}
                </p>
              </div> */}
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Lead Name</th>
                    <th>Report Date</th>
                    <th>Healthcare Centre Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Status</th>
                    
                    <th>Final Status</th>
                    <th>Reports</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((sale, index) => (
                    <tr key={index}>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{sale.leadName}</td>
                      <td>{sale.reportDate ? moment(sale.reportDate).format('DD-MMM-YYYY').toUpperCase() : ""}</td>
                      <td>{sale.healthcareCentreName}</td>
                      <td>{sale.email}</td>
                      <td>{sale.mobileNo}</td>
                      <td>{sale.status}</td>
                      
                      <td>{sale.finalStatus}</td>
                      <td>{sale.reportsBetweenDates}</td>
                      <td>
                      <button onClick={() => handleEditSales(sale)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDeleteSale(sale._id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {editFormVisible && (
              <EditSalesForm 
              sale={selectedSale} 
              onUpdate={(id, updatedData) =>
                handleUpdateSales(id, updatedData)
              } 
              onCancel={handleCancelEdit}
               />
            )}
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
