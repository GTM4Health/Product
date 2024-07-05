import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer"
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";
import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import EditStartupForm from "./AdminUpdateStartup";
import axios from "axios";
import { Button } from "bootstrap";
import logo from "../../../images/newlogo.png";


// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 12,
  },
  header: {
    fontSize: 14,
    marginBottom: 10,
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
    fontSize: 10,
  },
  headerCell: {
    flex: 1,
    padding: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#0077b6',
    color: 'white',
    fontSize: 10,
  },
  smallHeaderCell:{
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#0077b6',
    color: 'white',
    fontSize: 8,
  },
  smallCell:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 8,
    padding: 2,
  },
  borderRight: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  logoContainer: {
    position: 'absolute',
    top: 30, // Adjust the top value to create space between the logo and the table
    right: 30,
  },
  gap: {
    height: 20, // Adjust the height to create a gap below the logo
  },
  section: {
    margin: 2,
    padding: 1,
    flexGrow: 1,
  },
  logo: {
    width: 150,
    height: 50,
  },
});


const MyDocument = ({ startupData }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Startup List</Text>
      <View style={styles.logoContainer}>
          <Image src={logo} style={styles.logo} />
      </View>
      <View style={styles.gap} />
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.smallHeaderCell, styles.borderRight]}>Sl No.</Text>
          <Text style={[styles.headerCell, styles.borderRight]}>Startup Name</Text>
          <Text style={[styles.headerCell, styles.borderRight]}>Website</Text>
          <Text style={[styles.headerCell, styles.borderRight]}>Product Stage</Text>
          <Text style={[styles.headerCell, styles.borderRight]}>Domain</Text>
          <Text style={[styles.headerCell, styles.borderRight]}>Progress</Text>
        </View>
        {startupData.map((startup, index) => (
          <View style={styles.tableRow} key={startup.slNo}>
            <Text style={[styles.smallCell, styles.borderRight]}>{index + 1}</Text>
            <Text style={[styles.tableCell, styles.borderRight]}>{startup.startupName}</Text>
            <Text style={[styles.tableCell, styles.borderRight]}>{startup.website}</Text>
            <Text style={[styles.tableCell, styles.borderRight]}>{startup.productStage}</Text>
            <Text style={[styles.tableCell, styles.borderRight]}>{startup.domain}</Text>
            <Text style={[styles.tableCell, styles.borderRight]}>{startup.progress}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);






const StartupPortal = () => {
  const isAuthenticated = useAuth();
  const [startups, setStartups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("startupName"); // Default criteria is "Startup Name"
  const [showNoRecordsPopup, setShowNoRecordsPopup] = useState(false);



  useEffect(() => {
    if (isAuthenticated) {
      fetchStartups();
      setShowNoRecordsPopup(filteredStartups.length === 0);
    }
  }, [isAuthenticated, currentPage, pageSize, searchQuery, searchCriteria, filteredStartups]);
  

  const handleSearchInputChange = (event) => {
    setCurrentPage(1)
    setSearchQuery(event.target.value);
  };



  const filteredStartups = startups.filter((startup) => {
    const fieldValue = startup[searchCriteria];
    return (
      fieldValue &&
      fieldValue.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  


  const NoRecordsPopup = () => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowNoRecordsPopup(false);
      }, 3000);
  
      return () => clearTimeout(timer); // Clear the timer on component unmount
    }, []);
  }
  
  

// Modify the filteredStartups to filter based on the searchQuery in all fields

// const filteredStartups = startups.filter((startup) => {
//   const startupData = [
//     startup.startupName,
//     startup.website,
//     startup.productStage,
//     startup.domain,
//     startup.progress,
//   ];

//   // We use optional chaining (?.) to prevent errors if a field is undefined
//   return startupData
//     .some((field) =>
//       field?.toLowerCase()?.includes(searchQuery.toLowerCase())
//     );
// });


// Modify the fetchStartups function
const fetchStartups = async () => {
  let url = `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Startups/startups-portal?`;

  const params = new URLSearchParams();
  params.append('page', currentPage);
  params.append('limit', pageSize);

  if (searchQuery) {
    params.append('searchCriteria', searchCriteria);
    params.append('searchQuery', searchQuery);
  }

  try {
    const response = await axios.get(url + params.toString());
    setStartups(response.data.startups);
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
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handleEditStartup = (startup) => {
    setSelectedStartup(startup);
    setEditFormVisible(true);
  };

  const handleUpdateStartup = async (id, updatedData) => {
    try {
      const requestData = {
        data: updatedData,
      };

      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Startups/update-startup/${id}`, requestData);
      setEditFormVisible(false);
      setSelectedStartup(null);
      fetchStartups();
      console.log("Startup updated successfully");
    } catch (error) {
      console.error(error);
      console.log("Error updating startup");
    }
  };

  const handleDeleteStartup = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this startup?");
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Startups/delete-startup/${id}`);
      setStartups(startups.filter((startup) => startup._id !== id));
      console.log("Startup deleted successfully");
    } catch (error) {
      console.error(error);
      console.log("Error deleting startup");
    }
  };

  if (!isAuthenticated) {
    // Optional: Show a loading state or return null while checking authentication
    return null;

  }


  const generatePDF = () => {
    console.log("Generating PDF...");
    const startupData = startups.map((startup, index) => ({
      slNo: (currentPage - 1) * pageSize + index + 1,
      startupName: startup.startupName,
      website: startup.website,
      productStage: startup.productStage,
      domain: startup.domain,
    }));
  
    console.log("PDF generated successfully.");
  
    // Use the PDFDownloadLink to generate and download the PDF
    return (
      <Button variant="primary" className="search-button">
      <PDFDownloadLink document={<MyDocument startupData={startupData} />} fileName="startup-list.pdf">
        {({ blob, url, loading, error }) => {
          if (loading) {
            return 'Loading document...';
          }
          if (error) {
            return 'Error generating PDF'; // Add this line to handle errors
          }
          return 'Download PDF';
        }}
      </PDFDownloadLink>
      </Button>
    );
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  


  // Update displayedStartups based on the search query
  const displayedStartups = searchQuery ? filteredStartups : startups;

  
  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="page-title">
            <h1 className="page-title-child">Startups</h1>
          </div>
          {/* <button className="print-pdf-button" onClick={generatePDF}>
            Generate PDF
          </button> */}
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
          <div className="page-display">
            <h4 className="total-rows">Total Startups = {totalRows}</h4>
            <h4 className="right">
              <i>
                Displaying Page {currentPage} of {totalPages}
              </i>
            </h4>
          </div>
          <button variant="primary"className="search-button"  block>
          <PDFDownloadLink document={<MyDocument startupData={startups} />} fileName="startup-list.pdf" className="search-button" >
            {({ blob, url, loading, error }) => {
              if (loading) {
                return 'Loading document...';
              }
              if (error) {
                return 'Error generating PDF'; // Add this line to handle errors
              }
              return 'Generate PDF';
            }}
          </PDFDownloadLink>
          
          </button>

          <div className="search-container">
            <label htmlFor="search-criteria">Search :</label>
            <select
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
              className="search-criteria w30"
            >
              <option value="startupName">Startup Name</option>
              <option value="website">Website</option>
              <option value="productStage">Product Stage</option>
              <option value="domain">Domain</option>
              <option value="progress">Progress</option>
            </select>
            <input
              id="search-input"
              type="text"
              placeholder={`Enter ${capitalizeFirstLetter(searchCriteria).split(/(?=[A-Z])/).join(' ')}`}
              value={searchQuery}
              className="search-input w30"
              onChange={handleSearchInputChange}
            />
            <button className="search-button" onClick={fetchStartups}>
              <i className="fas fa-search"></i>
            </button>
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
          {showNoRecordsPopup && <NoRecordsPopup />}
          <div className="table-content">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Startup Name</th>
                  <th>Website</th>
                  <th>Product Stage</th>
                  <th>Domain</th>
                  <th>Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedStartups.map((startup, index) => (
                  <tr key={startup._id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{startup.startupName}</td>
                    <td>{startup.website}</td>
                    <td>{startup.productStage}</td>
                    <td>{startup.domain}</td>
                    <td>{startup.progress}</td>
                    <td>
                      <button className="edit-button" onClick={() => handleEditStartup(startup)}>
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteStartup(startup._id)}>
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
      {/* Render the edit form for updating startups */}
      {editFormVisible && (
        <div>
          {/* Pass the startup object and update function to the EditStartupForm component */}
          <EditStartupForm
            startup={selectedStartup}
            onUpdate={(id, updatedData) => handleUpdateStartup(id, updatedData)}
            onCancel={() => setEditFormVisible(false)}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default StartupPortal;
