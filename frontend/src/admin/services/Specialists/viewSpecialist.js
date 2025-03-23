import React, { useState, useEffect } from 'react';
import Footer from '../../../layout/pages/Footer';
import AdminMenuBar from '../../../layout/admin/AdminMenubar';
import useAuth from '../../../hooks/useAuth';
import AdminHeader from '../../../layout/admin/AdminHeader';
import axios from 'axios';
import updateSpecialist from './updateSpecialist';

const AdminViewSpecialist = () => {
  const isAuthenticated = useAuth();
  const [specialists, setSpecialists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);

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
      console.error(error);
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
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleEditSpecialist = (specialist) => {
    setSelectedSpecialist(specialist);
    setEditFormVisible(true);
  };

  const handleUpdateSpecialist = async (id, updatedData) => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/specialist/update-specialist/${id}`, { data: updatedData });
      setEditFormVisible(false);
      setSelectedSpecialist(null);
      fetchSpecialists();
      console.log("Specialist updated successfully");
    } catch (error) {
      console.error(error);
      console.log("Error updating specialist");
    }
  };

  const handleDeleteSpecialist = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this specialist?");
    if (!confirmed) return;

    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/specialist/delete-specialist/${id}`);
      
      if (response.status === 200) {
        setSpecialists(specialists.filter((specialist) => specialist._id !== id));
        console.log("Specialist deleted successfully");
      } else {
        console.log("Error deleting specialist");
      }
    } catch (error) {
      console.error(error);
      console.log("Error deleting specialist");
    }
  };

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag">Specialist Management Portal</h1>
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
                  <th>Doctor Name</th>
                  <th>Specialist In</th>
                  <th>Qualifications</th>
                  <th>Experience (Years)</th>
                  <th>Work Experience</th>
                  <th>Address</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {specialists.map((specialist, index) => (
                  <tr key={index + 1}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{specialist.doctorName}</td>
                    <td>{specialist.specialistIn}</td>
                    <td>{specialist.qualifications}</td>
                    <td>{specialist.yearsOfExperience}</td>
                    <td>{specialist.workExperience}</td>
                    <td>{specialist.location}</td>
                    <td>{specialist.state}</td>
                    <td>{specialist.city}</td>
                    <td>{specialist.email}</td>
                    <td>{specialist.mobNumber}</td>
                    <td>
                      <button className="edit-button" onClick={() => handleEditSpecialist(specialist)}>
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteSpecialist(specialist._id)}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {editFormVisible && (
            <updateSpecialist
              specialist={selectedSpecialist}
              onUpdate={(id, updatedData) => handleUpdateSpecialist(id, updatedData)}
              onCancel={() => setEditFormVisible(false)}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminViewSpecialist;
