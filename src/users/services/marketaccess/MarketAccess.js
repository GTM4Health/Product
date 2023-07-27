// MarketAccess.js

import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer";
import Header2 from "../../../layout/users/Header2";
import Menubar from "../../../layout/users/MenuBar";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { stateOptions, getCityOptionsByState } from "../../../assets/cityOptions"; // Importing getCityOptionsByState from cityOptions

const MarketAccess = () => {
  const [hospitals, setHospitals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [user, setUser] = useState(null);
  const [selectedState, setSelectedState] = useState("All"); // Include "All" option for the state filter
  const [selectedCity, setSelectedCity] = useState("All"); // Include "All" option for the city filter
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    fetchHospitals();
  }, [currentPage, selectedState, selectedCity]);

  useEffect(() => {
    // Load initial city options based on the first state option
    if (stateOptions.length > 0) {
      setCityOptions(getCityOptionsByState(stateOptions[0].value));
    }
  }, []);

  const fetchHospitals = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: pageSize,
        state: selectedState === "All" ? "" : selectedState,
        city: selectedCity === "All" ? "" : selectedCity,
      });

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal?${params}`);
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

  const handleStateChange = (e) => {
    const selectedStateValue = e.target.value;
    setSelectedState(selectedStateValue);

    // Update city options based on the selected state
    setCityOptions(getCityOptionsByState(selectedStateValue));

    // Reset selected city when changing state
    setSelectedCity("All");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleClearFilters = () => {
    setSelectedState("All");
    setSelectedCity("All");
  };

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
              {cityOptions.map((city) => (
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
