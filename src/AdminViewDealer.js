import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import AdminHeader from "./components/AdminHeader";
import AdminMenuBar from "./components/AdminMenubar";
import useAuth from "./components/useAuth";
import axios from "axios";
import { stateOptions, getCityOptionsByState } from "./cityOptions";
import EditDealerForm from "./AdminUpdateDealer";

const DealerPortal = () => {
  const isAuthenticated = useAuth();
  const [dealers, setDealers] = useState([]);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");

  useEffect(() => {
    if (isAuthenticated) {
      fetchDealers();
    }
  }, [isAuthenticated, currentPage, selectedState, selectedCity]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedState]);

  const fetchDealers = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Dealers/dealers-portal?`;
  
    const params = new URLSearchParams();
    params.append('page', currentPage);
    params.append('limit', pageSize);
  
    if (selectedState !== 'all') {
      params.append('state', selectedState);
    }
  
    if (selectedCity !== 'all') {
      params.append('city', selectedCity);
    }
  
    try {
      const response = await axios.get(url + params.toString());
      setDealers(response.data.dealer);
      setTotalRows(response.data.totalRows);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  const handleDeleteDealer = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this Dealer/Distributor?");
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Dealers/delete-dealer/${id}`);
      setDealers(dealers.filter((dealer) => dealer._id !== id));
      console.log("Dealer deleted successfully");
    } catch (error) {
      console.error(error);
      console.log("Error deleting hospital");
    }
  };

  const handleEditDealer = (dealer) => {
    setSelectedDealer(dealer);
    setEditFormVisible(true);
  };

  const handleUpdateDealer = async (id, updatedData) => {
    try {
      const requestData = {
        data: updatedData,
      };

      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Dealers/update-dealers/${id}`, requestData);
      setEditFormVisible(false);
      setSelectedDealer(null);
      fetchDealers();
      console.log("Dealer updated successfully");
    } catch (error) {
      console.error(error);
      console.log("Error updating dealer");
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
      setCurrentPage(prevPage => prevPage + 1);
      window.scrollTo(0, 0);
    }
  };
  

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity("all");
    setCurrentPage(1);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setCurrentPage(1);
  };

  if (!isAuthenticated) {
    // Optional: Show a loading state or return null while checking authentication
    return null;
  }

    const displayedDealers = dealers;


  // const displayedHospitals = hospitals.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="page-title">
            <h1 className="page-title-child">MedTech-Companies</h1>
          </div>
          <div className="filter-container">
            <label className="f-label" htmlFor="state-select">State:</label>
            <select id="state-select" value={selectedState} className="form-outline f-select" onChange={handleStateChange}>
              <option value="all">All</option>
              {stateOptions.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
            <label className="f-label" htmlFor="city-select">City:</label>
            <select id="city-select" value={selectedCity} className="form-outline f-select" onChange={handleCityChange}>
              <option value="all">All</option>
              {getCityOptionsByState(selectedState).map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
          <div className="page-display">
            <h4 className="total-rows">Total MedTech-Companies = {totalRows}</h4>
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
                  <th>Name</th>
                  <th>Products Managed</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Website</th>
                  <th>Contact Name</th>
                  <th>Role</th>
                  <th>Contact Email</th>
                  <th>Contact Number</th>
                  <th>GST No.</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedDealers.map((dealer, index) => (
                  <tr key={dealer._id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{dealer.name}</td>
                    <td>{dealer.products}</td>
                    <td>{dealer.state}</td>
                    <td>{dealer.city}</td>
                    <td>{dealer.address}</td>
                    <td>{dealer.web}</td>
                    <td>{dealer.dealerName}</td>
                    <td>{dealer.role}</td>
                    <td>{dealer.mail}</td>
                    <td>{dealer.phone}</td>
                    <td>{dealer.GST}</td>
                    <td>
                      <button className="edit-button" onClick={() => handleEditDealer(dealer)}>
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteDealer(dealer._id)}>
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
      {editFormVisible && (
        <EditDealerForm
          dealer={selectedDealer}
          onUpdate={(id, updatedData) => handleUpdateDealer(id, updatedData)}
          onCancel={() => setEditFormVisible(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default DealerPortal;
