import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../../layout/pages/Footer';
import Header2 from '../../../layout/users/Header2';
import MenuBar from '../../../layout/users/MenuBar';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
// import EditAssetForm from './updateasset';
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
    marginTop: 40,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tableCell: {
    flex: 1,
    padding: 4,
    textAlign: 'center',
    fontSize: 12,
  },
  headerCell: {
    flex: 1,
    padding: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#0077b6',
    color: 'white',
    fontSize: 16,
  },
  logo: {
    width: 200,
    height: 80,
  },
});

const AssetDocument = ({ assetData, compName }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Asset Management Report</Text>
        <Text style={styles.subHeader}>{compName || "Company Name"}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.headerCell}>Asset Number</Text>
            <Text style={styles.headerCell}>Product Name</Text>
            <Text style={styles.headerCell}>Email ID</Text>
            <Text style={styles.headerCell}>Observations</Text>
            <Text style={styles.headerCell}>Timestamp</Text>
          </View>
          {assetData.map((asset) => (
            <View style={styles.tableRow} key={asset._id}>
              <Text style={styles.tableCell}>{asset.assetNumber}</Text>
              <Text style={styles.tableCell}>{asset.productName}</Text>
              <Text style={styles.tableCell}>{asset.emailID}</Text>
              <Text style={styles.tableCell}>{asset.observations}</Text>
              <Text style={styles.tableCell}>{moment(asset.timestamp).format('DD-MMM-YYYY')}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const ViewAssets = () => {
  const [user, setUser] = useState(null);
  const [assetData, setAssetData] = useState([]);
  const isAuthenticated = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [compName, setCompanyName] = useState('');
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    if (user && isAuthenticated !== null) {
      setIsLoading(false);
      if (isAuthenticated) {
        fetchAssetData();
        fetchCompanyName(user.email);
      } else {
        navigate("/login");
      }
    }
  }, [isAuthenticated, user, currentPage,]);

  const fetchAssetData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Assets/assets-portal`, {
        params: {
           email: user.email,
           page: currentPage,
           limit: pageSize, 
          },
      });
      setAssetData(response.data.assets);
      setTotalRows(response.data.totalRows);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching asset data:', error);

    }
  };

  const fetchCompanyName = async (userEmail) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/user/email/${userEmail}`);
      setCompanyName(response.data.companyName || '');
    } catch (error) {
      console.error('Error fetching company name:', error);
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


  return (
    <div className="page-view">
    <Header2 user={user} />
    <div className="d-content">
      <MenuBar />
      <div className="dashboard">
        <div className="page-title">
          <h1 className="page-title-child">Asset Tracker</h1>
        </div>
        <div className="filter-container">
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
        <div className="download-pdf">
          {/* <PDFDownloadLink
            className="clear-btn"
            document={<AssetDocument assetData={assetData} compName={compName} />}
            fileName="assets_report.pdf"
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
          </PDFDownloadLink> */}
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
              <div className="table-content">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Sl No.</th>
                      <th>Asset Number</th>
                      <th>Product Name</th>
                      {/* <th>Email ID</th> */}
                      <th>Observations</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetData.map((asset,index) => (
                      <tr key={asset._id}>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                        <td>{asset.assetNumber}</td>
                        <td>{asset.productName}</td>
                        {/* <td>{asset.emailID}</td> */}
                        <td>{asset.observations}</td>
                        <td>{moment(asset.timestamp).format("hh:mm:ss A, DD-MMM-YYYY")}</td>
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
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default ViewAssets;
