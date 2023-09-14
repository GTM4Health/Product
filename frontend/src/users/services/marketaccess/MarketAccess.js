// MarketAccess.js

import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer";
import Header2 from "../../../layout/users/Header2";
import useAuth from "../../../hooks/useAuth";
import Menubar from "../../../layout/users/MenuBar";
import axios from "axios";
import { stateOptions, getCityOptionsByState } from "../../../assets/cityOptions"; // Importing getCityOptionsByState from cityOptions

const MarketAccess = () => {
  const isAuthenticated = useAuth();
  const [hospitals, setHospitals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [user, setUser] = useState(null);
  const [selectedState, setSelectedState] = useState("all"); // Include "All" option for the state filter
  const [selectedCity, setSelectedCity] = useState("all"); // Include "All" option for the city filter
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchHospitals();
    }
  }, [isAuthenticated, currentPage, selectedState, selectedCity]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedState]);


  const fetchHospitals = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}/api/hospital-portal?`;
  
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
      setHospitals(response.data.hospitals);
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
      setCurrentPage(currentPage + 1);
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

  const handleClearFilters = () => {
    setSelectedState("All");
    setSelectedCity("All");
  };

  if (!isAuthenticated) {
    // Optional: Show a loading state or return null while checking authentication
    return null;
  }

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <Menubar />
          <div className="page-title">
            <h1 className="page-title-child">Market Access</h1>
          </div>
          <div className="page-title">
            <h1 className="page-title-child">Healthcare Centers - City Wise</h1>
          </div>
          <div className="filter-container">
            <label className="f-label" htmlFor="stateFilter">State:</label>
            <select
              id="stateFilter"
              value={selectedState}
              className="f-select"
              onChange={handleStateChange}
            >
              <option value="All">All</option>
              {stateOptions.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
            <label className="f-label" htmlFor="cityFilter">City:</label>
            <select
              id="cityFilter"
              value={selectedCity}
              className="f-select"
              onChange={handleCityChange}
            >
              <option value="All">All</option>
              {getCityOptionsByState(selectedState).map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
            <button onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
          <div className="page-display">
            <h4 className="total-rows">Total Healthcare Centers = {totalRows}</h4>
            <h4 className="right">
              <i>Displaying Page {currentPage} of {totalPages}</i>
            </h4>
          </div>
          <div className="table-content">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Name</th>
                  <th>Infrastructure & Services</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Doctor Name</th>
                  <th>Specialization</th>
                  <th>Contact Email</th>
                  <th>Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital, index) => (
                  <tr key={hospital._id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{hospital.name}</td>
                    <td>{hospital.infraSer}</td>
                    <td>{hospital.state}</td>
                    <td>{hospital.city}</td>
                    <td>{hospital.docName}</td>
                    <td>{hospital.docSpez}</td>
                    <td>{hospital.mail}</td>
                    <td>{hospital.phone}</td>
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

export default MarketAccess;
