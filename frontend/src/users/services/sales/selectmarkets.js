// MarketAccess.js

import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'; // Import PDF generation dependencies
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../../../assets/healthcareCategories.json";
import specialitiesData from "../../../assets/specialities.json";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../images/newlogo.png"; // Import logo for PDF
import Footer from "../../../layout/pages/Footer";
import Header2 from "../../../layout/users/Header2";
import Menubar from "../../../layout/users/MenuBar";


// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 12,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 110,
    textAlign: 'center',
  },
  smallHeader: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightColor: 'black',
    borderBottomColor: 'black',
    marginTop: 40, // Add margin to create a gap
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  tableCell: {
    flex: 1,
    padding: 4,
    textAlign: 'center',
    fontSize: 16,
  },
  headerCell: {
    flex: 1,
    padding: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#0077b6',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  smallHeaderCell: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#0077b6',
    color: 'white',
    fontSize: 14,
    width: 50,
  },
  smallCell: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 8,
    width: 50,
  },
  borderRight: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
  },
  logoContainer: {
    position: 'absolute',
    top: 30, // Adjust the top value to create space between the logo and the table
    right: 30,
  },
  gap: {
    height: 40, // Adjust the height to create a gap below the logo
  },
  section: {
    margin: 4,
    padding: 2,
    flexGrow: 1,
  },
  logo: {
    width: 200,
    height: 80,
  },
});

//<Text style={[styles.headerCell, styles.borderRight]}>Contact Number</Text>
//<Text style={[styles.tableCell, styles.borderRight]}>{hospital.phone}</Text>

const MyDocument = ({ hospitalData, State, City }) => {
  const rowsPerPage = 10; // Adjust the number of rows per page
  const totalPages = Math.ceil(hospitalData.length / rowsPerPage);

  const renderTableRows = (data, pageIndex) => {
    return data.map((hospital, index) => (
      <View style={styles.tableRow} key={hospital._id}>
        <Text style={[styles.smallCell, styles.borderRight]}>{pageIndex * rowsPerPage + index + 1}</Text>
        <Text style={[styles.tableCell, styles.borderRight]}>{hospital.name}</Text>
        <Text style={[styles.tableCell, styles.borderRight]}>{hospital.docName}</Text>
        <Text style={[styles.tableCell, styles.borderRight]}>{hospital.mail}</Text>
      </View>
    ));
  };
  return (
    <Document>
      {Array.from({ length: totalPages }, (_, pageIndex) => (
        <Page style={styles.page} key={pageIndex}>
          <View style={styles.logoContainer}>
            <Image src={logo} style={styles.logo} />
          </View>
          <Text style={styles.header}>Healthcare Centre List</Text>
          <View style={styles.gap} />
          <Text style={styles.smallHeader}>State: {State === 'all' ? 'All' : State} City: {City === 'all' ? 'All' : City}</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.smallHeaderCell, styles.borderRight]}>Sl No.</Text>
              <Text style={[styles.headerCell, styles.borderRight]}>Healthcare Centre Name</Text>
              <Text style={[styles.headerCell, styles.borderRight]}>Contact Name</Text>
              <Text style={[styles.headerCell, styles.borderRight]}>Email</Text>
            </View>
            {renderTableRows(
              hospitalData.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage),
              pageIndex
            )}
          </View>
        </Page>
      ))}
    </Document>
  );
};

const SelectMarket = () => {
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
  const [allHospitals, setAllHospitals] = useState([]);
  const allHospitalData = allHospitals.map((hospital, index) => ({
    ...hospital,
  }));
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (user && user.privileges && isAuthenticated) {
      fetchHospitals();
      fetchAllHospitals();
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
    params.append('search', searchQuery);
    params.append('addedBy', user.name); // Add this line
    params.append('startDate', startDate);
    params.append('endDate', endDate);
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal/select?${params.toString()}`);
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
    setSelectedCategory("all");
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

  const fetchAllHospitals = async () => {
    const params = new URLSearchParams();
    params.append('state', selectedState);
    params.append('city', selectedCity);
    params.append('speciality', selectedSpeciality);
    params.append('category', selectedCategory);
    params.append('search', searchQuery);
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal/all?${params.toString()}`);
      setAllHospitals(response.data.hospitals);
      setAllTotalRows(response.data.totalRows);
    } catch (error) {
      console.error(error);
    }
  };
  
  const displayedHospitals = hospitals;


  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <Menubar />
          <div className="page-title">
            <h1 className="page-title-child">Market Access Tracker</h1>
          </div>
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag">
                Healthcare Centres Added List
            </h1>
          </div>
          {/* <PDFDownloadLink className="clear-btn" document={<MyDocument hospitalData={allHospitalData} State={selectedState} City={selectedCity} />} fileName="GTMScale_Healthcare_Centres-list.pdf">
      {({ blob, url, loading, error }) => {
        if (loading) {
          return 'Loading document...';
        }
        if (error) {
          return 'Error generating PDF';
        }
        return 'Download PDF';
      }}
    </PDFDownloadLink> */}
          {/* {console.log(user)} */}
          {/* Create a clickable link that redirects to an email */}
          {/* <a href="mailto:info@gtm4health.com">
            <p className="hdblue-tag">
              <i>
              <center>If you need to connect to any Healthcare Centres in the below list, please drop us a note to "info@gtm4health.com"</center>
              </i>
            </p>
          </a> */}
          <div className="filter-container">
          {/* <label className="f-label"  htmlFor="state-select">State:</label>
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
            <button onClick={handleClearFilters} className="clear-btn">Clear Filters</button> 
          
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
          /> */}
          {/* <button onClick={handleSearch}>Search</button> *          <label className="f-label" htmlFor="speciality-select">
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
              </select> */}
          {/* <div className="filter-container">

            <button onClick={clearSearchResults} className="clear-btn">Clear Search</button>    
          </div> */}
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
                  {/* <th>Infrastructure & Services</th> */}
                  <th>Added On</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Category</th>
                  <th>Doctor Name</th>
                  {/* <th>Speciality</th> */}
                  <th>Contact Email</th>
                  {/* <th>Contact Number</th> */}
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital, index) => (
                  <tr key={hospital._id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{hospital.name}</td>
                    {/* <td>{hospital.infraSer}</td> */}
                    <td>{hospital.addedOnTime}</td>
                    <td>{hospital.state}</td>
                    <td>{hospital.city}</td>
                    <td>{hospital.category}</td>
                    <td>{hospital.docName}</td> 
                    {/* <td>{hospital.docSpez}</td>
                    <td>{hospital.phone}</td> */}
                    {/* <td>{hospital.speciality}</td> */}
                    <td>{hospital.mail}</td>
                     
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

export default SelectMarket;
