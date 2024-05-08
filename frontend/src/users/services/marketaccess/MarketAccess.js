// MarketAccess.js

import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer";
import Header2 from "../../../layout/users/Header2";
import useAuth from "../../../hooks/useAuth";
import Menubar from "../../../layout/users/MenuBar";
import axios from "axios";
import { stateOptions, getCityOptionsByState } from "../../../assets/cityOptions"; // Importing getCityOptionsByState from cityOptions
import specialitiesData from "../../../assets/specialities.json"
import { useNavigate } from "react-router-dom";
import Categories from "../../../assets/healthcareCategories.json";

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
  const [displayedHospital, setDisplayedHospital] = useState(hospitals);
  const [selectedSpeciality, setSelectedSpeciality] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.privileges && isAuthenticated) {
      fetchHospitals();
    } else if (user && !(user.privileges) && isAuthenticated) {
      navigate("/dashboard/Subscription");
    }
  }, [isAuthenticated, currentPage, selectedState, selectedCity, selectedSpeciality, searchQuery, selectedCategory]);
  
  // useEffect(() => {
  //   if (isAuthenticated) 
  //       fetchHospitals();
  // }, [isAuthenticated, currentPage, selectedState, selectedCity, selectedSpeciality, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedState]);

  const fetchHospitals = async () => {
    const params = new URLSearchParams();
    params.append('page', currentPage);
    params.append('limit', pageSize);
    params.append('state', selectedState);
    params.append('city', selectedCity);
    params.append('speciality', selectedSpeciality);
    params.append('category', selectedCategory);
    params.append('search', searchQuery); // Add this line to include the search parameter
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal?${params.toString()}`);
      setHospitals(response.data.hospitals);
      setTotalRows(response.data.totalRows);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  // const fetchHospitals = async () => {
  //   let url = `${process.env.REACT_APP_BASE_URL}/api/hospital-portal?`;
  
  //   const params = new URLSearchParams();
  //   params.append('page', currentPage);
  //   params.append('limit', pageSize);
  
  //   if (selectedState !== 'all') {
  //     params.append('state', selectedState);
  //   }
  
  //   if (selectedCity !== 'all') {
  //     params.append('city', selectedCity);
  //   }
  
  //   try {
  //     const response = await axios.get(url + params.toString());
  //     setHospitals(response.data.hospitals);
  //     setTotalRows(response.data.totalRows);
  //     setTotalPages(response.data.totalPages);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const specialityOptions = specialitiesData.specialities.map((speciality, index) => (
    <option key={index} value={speciality}>
      {speciality}
    </option>
  ));
  

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []); 

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
    setSelectedState("all");
    setSelectedCity("all");
    setSelectedSpeciality("all"); // Reset speciality to "all"
    setCurrentPage(1);
    fetchHospitals(); // Reload hospitals with cleared filters
  };

  if (!isAuthenticated) {
    // Optional: Show a loading state or return null while checking authentication
    return null;
  }

  const handleSpecialityChange = (event) => {
    setCurrentPage(1); // Assuming you want to reset the page when the speciality changes
    setSelectedSpeciality(event.target.value);
    
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCurrentPage(1); // Assuming you want to reset the page when the speciality changes
    setSelectedCategory(event.target.value);
  };

  const handleSearch = async () => {
    const params = new URLSearchParams();
    params.append('page', currentPage);
    params.append('limit', pageSize);
    params.append('state', selectedState);
    params.append('city', selectedCity);
    params.append('speciality', selectedSpeciality);
    params.append('category', selectedCategory);
    params.append('search', searchQuery); // Add this line to include the search parameter
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal?${params.toString()}`);
      setHospitals(response.data.hospitals);
      setTotalRows(response.data.totalRows);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const catOptions = Categories.map((speciality, index) => (
    <option key={index} value={speciality}>
      {speciality}
    </option>
  ));

  
  const clearSearchResults = () => {
    setSearchQuery("");
    setDisplayedHospital(hospitals);
  };

  
  const displayedHospitals = hospitals;


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
            <h1 className="page-title-child hdblue-tag">
                Healthcare Centres List - City Wise
            </h1>
          </div>
          {/* {console.log(user)} */}
          {/* Create a clickable link that redirects to an email */}
          <a href="mailto:info@gtm4health.com">
            <p className="hdblue-tag">
              <i>
              <center>If you need to connect to any Healthcare Centres in the below list, please drop us a note to "info@gtm4health.com"</center>
              </i>
            </p>
          </a>
          <div className="filter-container">
          <label className="f-label"  htmlFor="state-select">State:</label>
            <select className="f-select" id="state-select" value={selectedState} onChange={handleStateChange}>
              <option value="all">All</option>
              {stateOptions.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
            <label className="f-label"  htmlFor="city-select">City:</label>
            <select className="f-select"  id="city-select" value={selectedCity} onChange={handleCityChange}>
              <option value="all">All</option>
              {getCityOptionsByState(selectedState).map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
            <label className="f-label" htmlFor="speciality-select">
                Speciality:
              </label>
                <select
                  className="f-select"
                  id="speciality-select"
                  value={selectedSpeciality}
                  onChange={handleSpecialityChange}
                >
                  <option value="all">All</option>
                  {specialityOptions}
              </select>
            <button onClick={handleClearFilters} className="clear-btn f-btn">Clear Filters</button>
          
          </div>
          <div className="filter-container">
          <button className="search-button">
              <i className="fas fa-search"></i>
          </button>
          <input
            type="text"
            className="f-select"
            placeholder="Search hospitals..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          {/* <button onClick={handleSearch}>Search</button> */}
          <div className="filter-container">
          <label className="f-label" htmlFor="speciality-select">
              Category:
              </label>
                <select
                  className="f-select"
                  id="speciality-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="all">All</option>
                  {catOptions}
              </select>
            <button onClick={clearSearchResults} className="clear-btn">Clear Search</button>    
          </div>
          <div className="page-jump f-select">
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
        </div>
          <div className="page-display">
            <h4 className="total-rows ft5">Total Healthcare Centers = {totalRows}</h4>
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
          <div className="table-content">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Name</th>
                  <th>Infrastructure & Services</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Category</th>
                  <th>Doctor Name</th>
                  <th>Speciality</th>
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
                    <td>{hospital.category}</td>
                    <td>{hospital.docName}</td> 
                    {/* <td>{hospital.docSpez}</td> */}
                    <td>{hospital.speciality}</td>
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
