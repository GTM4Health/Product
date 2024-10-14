import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../../layout/pages/Footer';
import Header2 from '../../../layout/users/Header2';
import MenuBar from '../../../layout/users/MenuBar';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import EditSalesForm from './updatesales';
import moment from 'moment';
import logo from "../../../images/newlogo.png"; 
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'; 


// PDF styles 
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
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 40,
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
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
  headerCell: {
    flex: 1,
    padding: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#0077b6',
    color: 'white',
    fontSize: 16,
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
  logoContainer: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  smallHeaderCell: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#0077b6',
    color: 'white',
    fontSize: 14,
    width: 50,
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
  smallCell: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 8,
    width: 50,
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
  gap: {
    height: 40,
  },
  logo: {
    width: 200,
    height: 80,
  },
});

// PDF Document component with borders
// const SalesDocument = ({ salesData }) => (
//   <Document>
//     <Page style={styles.page}>
//       <View style={styles.logoContainer}>
//         <Image src={logo} style={styles.logo} />
//       </View>
//       <Text style={styles.header}>Sales Progress Tracker</Text>
//       <View style={styles.gap} />
//       <View style={styles.table}>
//         <View style={styles.tableRow}>
//           <Text style={styles.smallHeaderCell}>Sl No.</Text>
//           <Text style={styles.headerCell}>Lead Name</Text>
//           <Text style={styles.headerCell}>Report Date</Text>
//           <Text style={styles.headerCell}>Healthcare Centre Name</Text>
//           {/* <Text style={styles.headerCell}>Email</Text> */}
//           {/* <Text style={styles.headerCell}>Mobile No</Text> */}
//           <Text style={styles.headerCell}>Status</Text>
//           <Text style={styles.headerCell}>Reports</Text>
//         </View>
//         {salesData.map((sale, index) => (
//           <View style={styles.tableRow} key={sale._id}>
//             <Text style={styles.smallCell}>{index + 1}</Text>
//             <Text style={styles.tableCell}>{sale.leadName}</Text>
//             <Text style={styles.tableCell}>{sale.reportDate ? moment(sale.reportDate).format('DD-MMM-YYYY') : ""}</Text>
//             <Text style={styles.tableCell}>{sale.healthcareCentreName}</Text>
//             {/* <Text style={styles.tableCell}>{sale.email}</Text>
//             <Text style={styles.tableCell}>{sale.mobileNo}</Text> */}
//             <Text style={styles.tableCell}>{sale.finalStatus}</Text>
//             <Text style={styles.tableCell}>{sale.reportsBetweenDates}</Text>
//           </View>
//         ))}
//       </View>
//     </Page>
//   </Document>
// );
const SalesDocument = ({ salesData }) => {
  const rowsPerPage = 10; // Adjust the number of rows per page
  const totalPages = Math.ceil(salesData.length / rowsPerPage);

  const renderTableRows = (data, pageIndex) => {
    return data.map((sale, index) => (
      <View style={styles.tableRow} key={sale._id}>
        <Text style={[styles.smallCell, styles.borderRight]}>{pageIndex * rowsPerPage + index + 1}</Text>
        <Text style={[styles.tableCell, styles.borderRight]}>{sale.leadName}</Text>
        <Text style={[styles.tableCell, styles.borderRight]}>{sale.reportDate ? moment(sale.reportDate).format('DD-MMM-YYYY') : ""}</Text>
        <Text style={[styles.tableCell, styles.borderRight]}>{sale.healthcareCentreName}</Text>
        <Text style={[styles.tableCell, styles.borderRight]}>{sale.finalStatus}</Text>
        <Text style={[styles.tableCell, styles.borderRight]}>{sale.reportsBetweenDates}</Text>
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
          <Text style={styles.header}>Sales Progress Tracker</Text>
          <View style={styles.gap} />
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.smallHeaderCell, styles.borderRight]}>Sl No.</Text>
              <Text style={[styles.headerCell, styles.borderRight]}>Lead Name</Text>
              <Text style={[styles.headerCell, styles.borderRight]}>Report Date</Text>
              <Text style={[styles.headerCell, styles.borderRight]}>Healthcare Centre Name</Text>
              <Text style={[styles.headerCell, styles.borderRight]}>Status</Text>
              <Text style={[styles.headerCell, styles.borderRight]}>Reports</Text>
            </View>
            {renderTableRows(
              salesData.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage),
              pageIndex
            )}
          </View>
        </Page>
      ))}
    </Document>
  );
};




const ViewSales = () => {
  const [user, setUser] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [allSalesData, setAllSalesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const isAuthenticated = useAuth();
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log('Stored user:', storedUser);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    console.log('Auth status:', isAuthenticated);
    console.log('User object:', user);
    if (user !== null && isAuthenticated !== null) {
      setIsLoading(false);
      if (isAuthenticated) {
        if (user.salesPrivileges) {
          console.log('Fetching sales data...');
          fetchSalesData();
          fetchAllSalesData();
        } else {
          console.log('User does not have sales privileges. Redirecting to Subscription.');
          navigate("/dashboard/Subscription");
        }
      } else {
        console.log('User is not authenticated. Redirecting to login.');
        navigate("/login");
      }
    }
  }, [isAuthenticated, user, currentPage, startDate, endDate]);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Sales/get-sales`,
        {
          params: {
            email: user.email,
            page: currentPage,
            limit: pageSize,
            startDate: startDate,
            endDate: endDate
          },
        }
      );
      setSalesData(response.data.sales);
      setTotalRows(response.data.totalRows);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };
  const fetchAllSalesData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Sales/get-all-sales`,
        {
          params: {
            email: user.email,
            startDate: startDate,
            endDate: endDate
          },
        }
      );
      setAllSalesData(response.data.sales);
    } catch (error) {
      console.error('Error fetching all sales data:', error);
    }
  };
  
  const handleEditSales = (sale) => {
    setSelectedSale(sale);
    setEditFormVisible(true);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchSalesData();
  };

  const handleClearSearch = () => {
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
    fetchSalesData();
  };

  const handleUpdateSales = async (id, updatedData) => {
    const { reportDate, ...restData } = updatedData;
    const formattedReportDate = new Date(reportDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).split(' ').join('-');
    
    try {
      const requestData = {
        data: {
          ...restData,
          reportDate: formattedReportDate
        },
      };
      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Sales/update-sale/${id}`, requestData);
      setEditFormVisible(false);
      setSelectedSale(null);
      fetchSalesData();
      fetchAllSalesData();
      console.log("Sales updated successfully");
    } catch (error) {
      console.error('Error updating sale:', error);
    }
  };

  const handleDeleteSale = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this sale?");
      if (confirmDelete) {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Sales/delete-sale/${id}`);
        fetchSalesData();
        console.log("Sale deleted successfully");
      }
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditFormVisible(false);
    setSelectedSale(null);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <MenuBar />
        <div className="dashboard">
          <div className="page-title">
            <h1 className="page-title-child">View Sales Progress</h1>
          </div>
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
          <div className="page-jump filter-container">
            <div className='f-select'>
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
          <div className='filter-container'>
            <button onClick={handleSearch} className="clear-btn">Search</button>
            <button onClick={handleClearSearch} className="clear-btn">Clear Search</button>
          </div>
          <div className="download-pdf">
                  <PDFDownloadLink
                    className="clear-btn"
                    document={<SalesDocument salesData={salesData} />}
                    fileName="GTMScale_SalesTracker_2024.pdf"
                  >
                    {({ loading }) =>
                      loading ? 'Loading document...' : 'Download PDF'
                    }
                  </PDFDownloadLink>
          </div>
          <div className="hosp-content">
            <div className="sales-data">
              <div className="page-display">
                <h4 className="total-rows ft5">Total Sales Records = {totalRows}</h4>
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
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Lead Name</th>
                    <th className='dat'>Report Date</th>
                    <th>Healthcare Centre Name</th>
                    {/* <th>Email</th>
                    <th>Mobile No</th> */}
                    <th>Status</th>
                    <th>Reports</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((sale, index) => (
                    <tr key={index}>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{sale.leadName}</td>
                      <td className='dat'>{sale.reportDate ? moment(sale.reportDate).format('DD-MMM-YYYY') : ""}</td>
                      <td>{sale.healthcareCentreName}</td>
                      {/* <td>{sale.email}</td>
                      <td>{sale.mobileNo}</td> */}
                      <td>{sale.finalStatus}</td>
                      <td>{sale.reportsBetweenDates}</td>
                      <td>
                        <button onClick={() => handleEditSales(sale)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button onClick={() => handleDeleteSale(sale._id)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {editFormVisible && (
                <EditSalesForm
                  sale={selectedSale}
                  onUpdate={(id, updatedData) => handleUpdateSales(id, updatedData)}
                  onCancel={handleCancelEdit}
                />
              )}
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewSales;
