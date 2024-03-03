import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer";
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";
import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import axios from "axios";
import { Button } from "bootstrap";
import logo from "../../../images/newlogo.png";
import EditCSRForm from "./updatecsr";

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

const MyDocument = ({ csrData }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>CSR/Foundation List</Text>
      <View style={styles.logoContainer}>
        <Image src={logo} style={styles.logo} />
      </View>
      <View style={styles.gap} />
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.smallHeaderCell, styles.borderRight]}>#</Text>
          <Text style={[styles.headerCell, styles.borderRight]}>CSR/Foundation Name</Text>
          <Text style={[styles.headerCell, styles.borderRight]}>Website</Text>
          <Text style={[styles.headerCell, styles.borderRight]}>Domain</Text>
        </View>
        {csrData.map((csr, index) => (
          <View style={styles.tableRow} key={csr.slNo}>
            <Text style={[styles.smallCell, styles.borderRight]}>{index + 1}</Text>
            <Text style={[styles.tableCell, styles.borderRight]}>{csr.csrName}</Text>
            <Text style={[styles.tableCell, styles.borderRight]}>{csr.website}</Text>
            <Text style={[styles.tableCell, styles.borderRight]}>{csr.domain}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const CSRPortal = () => {
  const isAuthenticated = useAuth();
  const [csrs, setCsrs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNoRecordsPopup, setShowNoRecordsPopup] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("csrName");
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedCSR, setSelectedCSR] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCsrs();
      setShowNoRecordsPopup(filteredCsrs.length === 0);
    }
  }, [isAuthenticated, currentPage, pageSize, searchQuery, filteredCsrs]);

  const handleSearchInputChange = (event) => {
    setCurrentPage(1);
    setSearchQuery(event.target.value);
  };

  const filteredCsrs = csrs.filter((csr) => {
    const fieldValue = csr[searchCriteria];
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
  };

  const fetchCsrs = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/CSR/csrs-portal?`;

    const params = new URLSearchParams();
    params.append('page', currentPage);
    params.append('limit', pageSize);

    if (searchQuery) {
      params.append('searchCriteria', searchCriteria);
      params.append('searchQuery', searchQuery);
    }

    try {
      const response = await axios.get(url + params.toString());
      setCsrs(response.data.csrs);
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

  const handleEditCSR = (csr) => {
    setSelectedCSR(csr);
    setEditFormVisible(true);
  };

  const handleUpdateCSR = async (id, updatedData) => {
    try {
      const requestData = {
        data: updatedData,
      };

      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/CSR/update-csr/${id}`, requestData);
      setEditFormVisible(false);
      setSelectedCSR(null);
      fetchCsrs();
      console.log("CSR/Foundation updated successfully");
    } catch (error) {
      console.error(error);
      console.log("Error updating CSR/Foundation");
    }
  };

  const handleDeleteCSR = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this CSR/Foundation?");
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/CSR/delete-csr/${id}`);
      setCsrs(csrs.filter((csr) => csr._id !== id));
      console.log("CSR/Foundation deleted successfully");
    } catch (error) {
      console.error(error);
      console.log("Error deleting CSR/Foundation");
    }
  };


  const generatePDF = () => {
    console.log("Generating PDF...");
    const csrData = csrs.map((csr, index) => ({
      slNo: (currentPage - 1) * pageSize + index + 1,
      csrName: csr.csrName,
      website: csr.website,
      domain: csr.domain,
    }));

    console.log("PDF generated successfully.");

    // Use the PDFDownloadLink to generate and download the PDF
    return (
      <Button variant="primary" className="search-button">
        <PDFDownloadLink document={<MyDocument csrData={csrData} />} fileName="csr-list.pdf">
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

  const displayedCsrs = searchQuery ? filteredCsrs : csrs;

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="page-title">
            <h1 className="page-title-child">CSR/Foundations</h1>
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
          <div className="page-display">
            <h4 className="total-rows">Total CSR/Foundations = {totalRows}</h4>
            <h4 className="right">
              <i>
                Displaying Page {currentPage} of {totalPages}
              </i>
            </h4>
          </div>
          {/* <button variant="primary" className="search-button" block>
            <PDFDownloadLink document={<MyDocument csrData={csrs} />} fileName="csr-list.pdf" className="search-button">
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
              <option value="csrName">CSR/Foundation Name</option>
              <option value="website">Website</option>
              <option value="domain">Domain</option>
            </select>
            <input
              id="search-input"
              type="text"
              placeholder={`Enter ${capitalizeFirstLetter(searchCriteria).split(/(?=[A-Z])/).join(' ')}`}
              value={searchQuery}
              className="search-input w30"
              onChange={handleSearchInputChange}
            />
            <button className="search-button" onClick={fetchCsrs}>
              <i className="fas fa-search"></i>
            </button>
          </div> */}

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
                  <th>CSR/Foundation Name</th>
                  <th>Website</th>
                  <th>Domain</th>
                  <th>Services</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedCsrs.map((csr, index) => (
                  <tr key={csr._id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{csr.csrName}</td>
                    <td>{csr.website}</td>
                    <td>{csr.domain}</td>
                    <td>{csr.ser}</td>
                    <td>
                      <button onClick={() => handleEditCSR(csr)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDeleteCSR(csr._id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editFormVisible && (
            <EditCSRForm
              csr={selectedCSR}
              onCancel={() => setEditFormVisible(false)}
              onUpdate={(id, updatedData) =>
                handleUpdateCSR(id, updatedData)
              }
            />
          )}
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

export default CSRPortal;
