import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer"
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";

import axios from "axios";
import EditHospitalForm from "./AdminUpdateHosp"
import { stateOptions, getCityOptionsByState } from "../../../assets/cityOptions";

// require('dotenv').config();
// import dotenv from 'dotenv';
// dotenv.config();
// const baseUrl = process.env.REACT_APP_BASE_URL|| 'default-value';
// console.log(baseUrl);

// console.log(baseUrl)

const CityPortal = () => {
  const isAuthenticated = useAuth();
  const [hospitals, setHospitals] = useState([]);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");

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
  
  
  
  const handleDeleteHospital = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this hospital?");
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Add-Hospital/delete-hospital/${id}`);
      setHospitals(hospitals.filter((hospital) => hospital._id !== id));
      console.log("Hospital deleted successfully");
    } catch (error) {
      console.error(error);
      console.log("Error deleting hospital");
    }
  };

  const handleEditHospital = (hospital) => {
    setSelectedHospital(hospital);
    setEditFormVisible(true);
  };

  const handleUpdateHospital = async (id, updatedData) => {
    try {
      const requestData = {
        data: updatedData,
      };

      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Add-Hospital/hospitals/${id}`, requestData);
      setEditFormVisible(false);
      setSelectedHospital(null);
      fetchHospitals();
      console.log("Hospital updated successfully");
    } catch (error) {
      console.error(error);
      console.log("Error updating hospital");
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

  const handleClearFilters = () => {
    setSelectedState("all");
    setSelectedCity("all");
    setCurrentPage(1);
  };

  if (!isAuthenticated) {
    // Optional: Show a loading state or return null while checking authentication
    return null;
  }

    const displayedHospitals = hospitals;


  // const displayedHospitals = hospitals.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="page-title">
            <h1 className="page-title-child">Healthcare Centres</h1>
          </div>
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
            <button onClick={handleClearFilters}>Clear Filters</button>
          </div>
          <div className="page-display">
            <h4 className="total-rows">Total Healthcare Centers = {totalRows}</h4>
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
                  <th>Infrastructure & Services</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Contact Name</th>
                  <th>Role</th>
                  <th>Contact Email</th>
                  <th>Contact Number</th>
                  <th>Specialization</th>
                  <th>Last-Connected</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedHospitals.map((hospital, index) => (
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
                    <td>{hospital.speciality}</td>
                    <td>{hospital.lastConnected}</td>
                    <td>
                      <button className="edit-button" onClick={() => handleEditHospital(hospital)}>
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteHospital(hospital._id)}>
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
        <EditHospitalForm
          hospital={selectedHospital}
          onUpdate={(id, updatedData) => handleUpdateHospital(id, updatedData)}
          onCancel={() => setEditFormVisible(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default CityPortal;
