import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer";
import Header2 from "../../../layout/users/Header2";
import Menubar from "../../../layout/users/MenuBar";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const MarketAccessAll = () => {
  const isAuthenticated = useAuth();
  const [hospitals, setHospitals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchHospitals();
    }
  }, [isAuthenticated, currentPage]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);


  useEffect(() => {
    fetchHospitals();
  }, [currentPage]);

  const fetchHospitals = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: pageSize,
      });

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal?${params}`);
      setHospitals(response.data.hospitals);
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
      setCurrentPage(currentPage + 1);
    }
  };

  if (!isAuthenticated) {
    // Optional: Show a loading state or return null while checking authentication
    return null;
  }

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <Menubar />
          <div className="page-title">
          <h1 className="page-title-child hdblue-tag">
              Healthcare Centres List
          </h1>
          </div>
          <a href="mailto:info@gtm4health.com">
            <p className="hdblue-tag">
              <i>
              <center>If you need to connect to any Healthcare Centres in the below list, please drop us a note to "info@gtm4health.com"</center>
              </i>
            </p>
          </a>
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
                  {/* <th>Doctor Name</th> */}
                  <th>Speciality</th>
                  {/* <th>Contact Email</th>
                  <th>Contact Number</th> */}
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
                    {/* <td>{hospital.docName}</td> */}
                    {/* <td>{hospital.docSpez}</td> */}
                    <td>{hospital.speciality}</td>
                    {/* <td>{hospital.mail}</td>
                    <td>{hospital.phone}</td> */}
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

export default MarketAccessAll;