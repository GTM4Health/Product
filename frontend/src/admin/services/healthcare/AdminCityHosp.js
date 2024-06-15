import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer"
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";
import specialitiesData from "../../../assets/specialities.json";
import axios from "axios";
import EditHospitalForm from "./AdminUpdateHosp"
import { stateOptions, getCityOptionsByState } from "../../../assets/cityOptions";
import { Button } from "bootstrap"; // Assuming you're using Bootstrap for buttons
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'; // Import PDF generation dependencies
import logo from "../../../images/newlogo.png"; // Import logo for PDF
import Categories from "../../../assets/healthcareCategories.json";

// "Military Hospital",
// "Optical Store",
// "Veterinary Clinic",
// "Eye Care Center",
// Styles for the PDF

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
    padding: 6,
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

const MyDocument = ({ hospitalData, State, City }) => {
  const rowsPerPage = 10; // Adjust the number of rows per page
  const totalPages = Math.ceil(hospitalData.length / rowsPerPage);

  const renderTableRows = (data, pageIndex) => {
    return data.map((hospital, index) => (
      <View style={styles.tableRow} key={hospital._id}>
        <Text style={[styles.smallCell, styles.borderRight]}>{pageIndex * rowsPerPage + index + 1}</Text>
        <Text style={[styles.tableCell, styles.borderRight]}>{hospital.name}</Text>
        <Text style={[styles.tableCell, styles.borderRight]}>{hospital.docName}</Text>
        <Text style={[styles.tableCell, styles.borderRight]}>{hospital.phone}</Text>
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
              <Text style={[styles.headerCell, styles.borderRight]}>Contact Number</Text>
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
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     padding: 12,
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//     marginTop: 110,
//     textAlign: 'center',
//   },
//   smallHeader: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   table: {
//     display: 'table',
//     width: '100%',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderRightColor: 'black',
//     borderBottomColor: 'black',
//     marginTop: 40, // Add margin to create a gap
//   },
//   tableRow: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: 'black',
//   },
//   tableCell: {
//     flex: 1,
//     padding: 4,
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   headerCell: {
//     flex: 1,
//     padding: 4,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     backgroundColor: '#0077b6',
//     color: 'white',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   smallHeaderCell:{
//     textAlign: 'center',
//     fontWeight: 'bold',
//     backgroundColor: '#0077b6',
//     color: 'white',
//     fontSize: 14,
//     width: 30,
//   },
//   smallCell:{
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 14,
//     padding: 6,
//     width: 30,
//   },
//   borderRight: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: 'black',
//   },
//   logoContainer: {
//     position: 'absolute',
//     top: 30, // Adjust the top value to create space between the logo and the table
//     right: 30,
//   },
//   gap: {
//     height: 40, // Adjust the height to create a gap below the logo
//   },
//   section: {
//     margin: 4,
//     padding: 2,
//     flexGrow: 1,
//   },
//   logo: {
//     width: 200,
//     height: 80,
//   },
// });

// const MyDocument = ({ hospitalData, State, City }) => (
//   <Document>
//     <Page style={styles.page}>
//       <View style={styles.logoContainer}>
//           <Image src={logo} style={styles.logo} />
//       </View>
//       <Text style={styles.header}>Healthcare Centre List</Text>
//       <View style={styles.gap} />
//       <Text style={styles.smallHeader}>State : {State === 'all' && 'All'} {State !== 'all' && State}                City : {City === 'all' && 'All'} {City !== 'all' && City}</Text>

//       <View style={styles.table}>
//         <View style={styles.tableRow}>
//           <Text style={[styles.smallHeaderCell, styles.borderRight]}>Sl No.</Text>
//           <Text style={[styles.headerCell, styles.borderRight]}>Healthcare Centre Name</Text>
//           {/* <Text style={[styles.headerCell, styles.borderRight]}>Infrastructure & Services</Text>
//           <Text style={[styles.headerCell, styles.borderRight]}>State</Text>
//           <Text style={[styles.headerCell, styles.borderRight]}>City</Text>
//           <Text style={[styles.headerCell, styles.borderRight]}>Address</Text>
//           <Text style={[styles.headerCell, styles.borderRight]}>Pincode</Text> */}
//           <Text style={[styles.headerCell, styles.borderRight]}>Contact Name</Text>
//           {/* <Text style={[styles.headerCell, styles.borderRight]}>Role</Text>
//           <Text style={[styles.headerCell, styles.borderRight]}>Contact Email</Text> */}
//           <Text style={[styles.headerCell, styles.borderRight]}>Contact Number</Text>
//           {/* <Text style={[styles.headerCell, styles.borderRight]}>Specialization</Text>
//           <Text style={[styles.headerCell, styles.borderRight]}>Last-Connected</Text> */}
//         </View>
//         {hospitalData.map((hospital, index) => (
//           <View style={styles.tableRow} key={hospital._id}>
//             <Text style={[styles.smallCell, styles.borderRight]}>{index + 1}</Text>
//             <Text style={[styles.tableCell, styles.borderRight]}>{hospital.name}</Text>
//             {/* <Text style={[styles.tableCell, styles.borderRight]}>{hospital.infraSer}</Text>
//             <Text style={[styles.tableCell, styles.borderRight]}>{hospital.state}</Text>
//             <Text style={[styles.tableCell, styles.borderRight]}>{hospital.city}</Text>
//             <Text style={[styles.tableCell, styles.borderRight]}>{hospital.address}</Text>
//             <Text style={[styles.tableCell, styles.borderRight]}>{hospital.pincode}</Text> */}
//             <Text style={[styles.tableCell, styles.borderRight]}>{hospital.docName}</Text>
//             {/* <Text style={[styles.tableCell, styles.borderRight]}>{hospital.docSpez}</Text>
//             <Text style={[styles.tableCell, styles.borderRight]}>{hospital.mail}</Text> */}
//             <Text style={[styles.tableCell, styles.borderRight]}>{hospital.phone}</Text>
//             {/* <Text style={[styles.tableCell, styles.borderRight]}>{hospital.speciality}</Text>
//             <Text style={[styles.tableCell, styles.borderRight]}>{hospital.lastConnected}</Text> */}
//           </View>
//         ))}
//       </View>
//     </Page>
//   </Document>
// );






const CityPortal = () => {
  const isAuthenticated = useAuth();
  const [hospitals, setHospitals] = useState([]);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [allTotalRows, setAllTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedHospital, setDisplayedHospital] = useState(hospitals);
  const [selectedSpeciality, setSelectedSpeciality] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [totalHosp, setTotalHosp] = useState('');
  const hospitalData = hospitals.map((hospital, index) => ({
    ...hospital,
  }));
  const [allHospitals, setAllHospitals] = useState([]);
  const allHospitalData = allHospitals.map((hospital, index) => ({
    ...hospital,
  }));





  useEffect(() => {
    if (isAuthenticated) {
      fetchHospitals();
      fetchAllHospitals();
    }
  }, [isAuthenticated, currentPage, selectedState, selectedCity, selectedSpeciality, searchQuery, selectedCategory]);
  
  useEffect(() => {
    setDisplayedHospital(hospitals); // Update displayed hospitals when hospitals change
  }, [hospitals]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedState, selectedCity, selectedCategory, selectedSpeciality, searchQuery]);


  
  

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
    params.append('category', selectedCategory);
    params.append('search', searchQuery); // Add this line to include the search parameter
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal/classic?${params.toString()}`);
      setHospitals(response.data.hospitals);
      setTotalRows(response.data.totalRows);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
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
    setSelectedCategory("all")
    setCurrentPage(1);
    fetchHospitals(); // Reload hospitals with cleared filters
  };
  

  const specialityOptions = specialitiesData.specialities.map((speciality, index) => (
    <option key={index} value={speciality}>
      {speciality}
    </option>
  ));

  const catOptions = Categories.map((speciality, index) => (
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
      params.append('category', selectedCategory);
      params.append('search', searchQuery); 
    
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

    const handleCategoryChange = (event) => {
      setCurrentPage(1); // Assuming you want to reset the page when the speciality changes
      setSelectedCategory(event.target.value);
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
          
          <PDFDownloadLink className="clear-btn" document={<MyDocument hospitalData={allHospitalData} State={selectedState} City={selectedCity} />} fileName="GTMScale_Healthcare_Centres-list.pdf">
      {({ blob, url, loading, error }) => {
        if (loading) {
          return 'Loading document...';
        }
        if (error) {
          return 'Error generating PDF';
        }
        return 'Download PDF';
      }}
    </PDFDownloadLink>
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
            {/* <button onClick={handleClearFilters} className="clear-btn f-btn">Clear Filters</button>    */}
          </div>
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
                  <th>Category</th>
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
                    <td>{hospital.category}</td>
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
