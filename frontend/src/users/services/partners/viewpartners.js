import React, { useState, useEffect } from "react";

import axios from 'axios';
import Footer from "../../../layout/pages/Footer"
import useAuth from "../../../hooks/useAuth";
import { stateOptions, getCityOptionsByState } from "../../../assets/cityOptions";
import Header2 from "../../../layout/users/Header2";
import MenuBar from "../../../layout/users/MenuBar";


const PartnersPage = () => {
  const isAuthenticated = useAuth();
  const [dealers, setDealers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [user, setUser] = useState(null);
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
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

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
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="page-title">
            <h1 className="page-title-child">MedTech and Distribution Companies</h1>
          </div>
          <a href="mailto:info@gtm4health.com">
            <p className="hdblue-tag">
              <i>
              <center>If you need to connect to any GTM Partners in the below list, please drop us a note to "info@gtm4health.com"</center>
              </i>
            </p>
          </a>
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
          <div className="page-jump w10">
              <label htmlFor="page-selector">Go to Page:</label>
              <select
                id="page-selector"
                value={currentPage}
                onChange={(e) => setCurrentPage(parseInt(e.target.value))}
              >
                {Array.from({ length: totalPages }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
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
                  <th>Name</th>
                  <th>Products Managed</th>
                  <th>State</th>
                  <th>City</th>
                  {/* <th>Address</th>
                  <th>Pincode</th>
                  <th>Website</th>
                  <th>Contact Name</th>
                  <th>Role</th> */}
                  {/* <th>Contact Email</th>
                  <th>Contact Number</th> */}
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
                    {/* <td>{dealer.address}</td>
                    <td>{dealer.pincode}</td>
                    <td>{dealer.web}</td>
                    <td>{dealer.dealerName}</td>
                    <td>{dealer.role}</td> */}
                    {/* <td>{dealer.mail}</td>
                    <td>{dealer.phone}</td> */}
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

export default PartnersPage;
