import React, { useState, useEffect } from 'react';
import Footer from '../../../layout/pages/Footer';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import Header2 from '../../../layout/users/Header2';
import MenuBar from '../../../layout/users/MenuBar';

const UserViewSpecialist = () => {
  const isAuthenticated = useAuth();
  const [specialists, setSpecialists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSpecialists();
    }
  }, [isAuthenticated, currentPage]);

  const fetchSpecialists = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/specialist/get-all`, {
        params: {
          page: currentPage,
          limit: pageSize,
        },
      });
      setSpecialists(response.data.specialists);
      setTotalRows(response.data.totalRows);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching specialists:", error);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevPage = () => {
    if (!isFirstPage) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="page-view">
      <Header2 />
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag">View Specialist Profiles</h1>
          </div>
          <div className="page-display">
            <h4 className="total-rows ft5">Total Specialists = {totalRows}</h4>
            <h4 className="right ft5">
              <i>
                Displaying Page {currentPage} of {totalPages}
              </i>
            </h4>
          </div>
          <div className="pagination-buttons">
            {!isFirstPage && <button className="prev-button" onClick={handlePrevPage}>&laquo; Prev</button>}
            {!isLastPage && <button className="next-button" onClick={handleNextPage}>Next &raquo;</button>}
          </div>
          <div className="table-content">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Dr Name</th>
                  <th>Speciality</th>
                  {/* <th>Mobile Number</th>
                  <th>Email Id</th>
                  <th>Experience</th> */}
                  <th>Address</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {specialists.map((specialist, index) => (
                  <tr key={index}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{specialist.doctorName }</td>
                    <td>{specialist.specialistIn }</td>
                    {/* <td>{specialist.mobNumber }</td>
                    <td>{specialist.email }</td>
                    <td>{specialist.yearsExperience }</td> */}
                    <td>{specialist.location }</td>
                    <td>
                      <a href={`/dashboard/specialist/${specialist._id}`} className="view-button">
                        View Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserViewSpecialist;