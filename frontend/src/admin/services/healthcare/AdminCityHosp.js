import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer"
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";
import specialitiesData from "../../../assets/specialities.json";
import axios from "axios";
import EditHospitalForm from "./AdminUpdateHosp"
import { stateOptions, getCityOptionsByState } from "../../../assets/cityOptions";
import { Document, Page, pdfjs } from "react-pdf";


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
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedHospital, setDisplayedHospital] = useState(hospitals);
  const [selectedSpeciality, setSelectedSpeciality] = useState("all");






  useEffect(() => {
    if (isAuthenticated) {
      fetchHospitals();
    }
  }, [isAuthenticated, currentPage, selectedState, selectedCity, selectedSpeciality, searchQuery]);
  
  useEffect(() => {
    setDisplayedHospital(hospitals); // Update displayed hospitals when hospitals change
  }, [hospitals]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedState]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSpeciality]);

  
  

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
  
  //   // Add the speciality parameter
  //   if (selectedSpeciality !== 'all') {
  //     params.append('speciality', selectedSpeciality);
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
  
  const fetchHospitals = async () => {
    const params = new URLSearchParams();
    params.append('page', currentPage);
    params.append('limit', pageSize);
    params.append('state', selectedState);
    params.append('city', selectedCity);
    params.append('speciality', selectedSpeciality);
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
      fetchHospitals();
    }
  };
  
  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
      fetchHospitals();
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
  

  const specialityOptions = specialitiesData.specialities.map((speciality, index) => (
    <option key={index} value={speciality}>
      {speciality}
    </option>
  ));
  
  if (!isAuthenticated) {
    // Optional: Show a loading state or return null while checking authentication
    return null;
  }

    const displayedHospitals = hospitals;

    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleSearch = async () => {
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', pageSize);
      params.append('state', selectedState);
      params.append('city', selectedCity);
      params.append('speciality', selectedSpeciality);
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
  
    const handleSpecialityChange = (event) => {
      setCurrentPage(1); // Assuming you want to reset the page when the speciality changes
      setSelectedSpeciality(event.target.value);
      
    };
    
    const clearSearchResults = () => {
      setSearchQuery("");
      setDisplayedHospital(hospitals);
    };
  
    const handlePageJump = () => {
      // Ensure that currentPage is always a positive integer, defaulting to 1 if empty
      setCurrentPage(currentPage <= 0 ? 1 : currentPage);
      window.scrollTo(0, 0);
      fetchHospitals();
    };
  // const displayedHospitals = hospitals.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="page-title">
            
            <h1 className="page-title-child hdblue-tag">
                Healthcare Centres List - City Wise
            </h1>
          </div>
          <div className="filter-container">
              {/* <div className="search-container">
                <input
                  type="text"
                  placeholder="Search hospitals..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={clearSearchResults}>Clear Search</button>
              </div> */}
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
          <button onClick={clearSearchResults} className="clear-btn">Clear Search</button>
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
                  <th>Infrastructure & Services</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Pincode</th>
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
                    <td>{hospital.address}</td>
                    <td>{hospital.pincode}</td>
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
