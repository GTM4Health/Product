import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer";
import Header2 from "../../../layout/users/Header2";
import Menubar from "../../../layout/users/MenuBar";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLearningModules = () => {
  const [learningModules, setLearningModules] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const isAuthenticated = useAuth("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (!user.academyPrivileges) {
        navigate("/dashboard/Subscription");
      } else {
        fetchLearningModules();
      }
    }
  }, [isAuthenticated, user, currentPage, pageSize, searchQuery]);

  const fetchLearningModules = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/learning/pdfs?page=${currentPage}&limit=${pageSize}&search=${searchQuery}`
      );
      setLearningModules(response.data.files);
      setTotalFiles(response.data.totalFiles);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching learning modules:", error);
    }
  };

  const handleSearch = (query) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const handleDownload = async (fileName) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/learning/download/${fileName}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error downloading file ${fileName}:`, error);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <Menubar />
        <div className="dashboard">
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag">View Learning Modules</h1>
          </div>

          <div className="page-jump w10">
            <div className="filter-container">
              <button className="search-button">
                <i className="fas fa-search"></i>
              </button>
              <input
                type="text"
                className="search-bar"
                placeholder="Search Learning Modules..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
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
            <h4 className="total-rows ft5">Total Learning Modules = {totalFiles}</h4>
            <h4 className="total-rows right ft5">
              <i>Displaying Page {currentPage} of {totalPages}</i>
            </h4>
          </div>

          <table className="user-table">
            <thead>
              <tr>
                <th className="sl">Sl No.</th>
                <th>Learning Module</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {learningModules.map((file, index) => (
                <tr key={index}>
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
                  <td>
                    <a
                      href={`${process.env.REACT_APP_BASE_URL}/api/learning/pdfs/${encodeURIComponent(file)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pdf-link"
                    >
                      {file}
                    </a>
                  </td>
                  <td>
                    <button onClick={() => handleDownload(file)}>
                      <i className="fas fa-download"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-buttons">
            {currentPage > 1 && (
              <button
                className="prev-button"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &laquo; Prev
              </button>
            )}
            {currentPage < totalPages && (
              <button
                className="next-button"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
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

export default UserLearningModules;
