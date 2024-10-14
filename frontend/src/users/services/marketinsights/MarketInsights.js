import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer";
import Header2 from "../../../layout/users/Header2";
import useAuth from "../../../hooks/useAuth";
import Menubar from "../../../layout/users/MenuBar";
import { pdfjs, Document, Page } from "react-pdf";
import axios from "axios";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ currentPage, onLoadSuccess }) => {
  return (
    <div className="pdf-container">
      <Document
        file="/Market_Insights_Report.pdf"
        onLoadSuccess={onLoadSuccess} 
      >
        <Page pageNumber={currentPage} noData renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
    </div>
  );
};


const MarketInsights = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [editFileName, setEditFileName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [user, setUser] = useState("");
  const isAuthenticated = useAuth("");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (!user.marketPrivileges) {
        navigate("/dashboard/Subscription");
      } else {
        fetchPdfFiles();
      }
    }
  }, [isAuthenticated,currentPage, pageSize, searchQuery, navigate]);



  const fetchPdfFiles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/cont/pdfs?page=${currentPage}&limit=${pageSize}&search=${searchQuery}`
      );
      setPdfFiles(response.data.files);
      setTotalFiles(response.data.totalFiles);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
    }
  };

  const handleSearch = (query) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };


  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
      <Menubar />
        <div className="dashboard">
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag reports">View Market Insight Reports</h1>
          </div>
          <div className="page-jump w10">
          <div className="filter-container">
          <button className="search-button">
              <i className="fas fa-search"></i>
          </button>
            <div>
            <input
              type="text"
              className="search-bar"
              placeholder="Search Market Insights Reports..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            </div>
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
            <h4 className="total-rows ft5">Total Market Insights Reports = {totalFiles}</h4>
            <h4 className="total-rows right ft5">
              <i>Displaying Page {currentPage} of {totalPages}</i>
            </h4>
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th className="sl">Sl No.</th>
                <th>Market Insights Reports</th>
                {/* <th>Category</th> */}
              </tr>
            </thead>
            <tbody>
              {pdfFiles.map((pdfFile, index) => (
                <tr key={index}>
                  <td>{`${(currentPage - 1) * pageSize + index + 1}`}</td>
                  <td>
                    <a
                      href={`${process.env.REACT_APP_BASE_URL}/api/cont/pdfs/${encodeURIComponent(pdfFile)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pdf-link"
                    >
                      {pdfFile}
                    </a>
                  </td>
                  {/* <td>{pdfFile.category}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-buttons">
            {currentPage > 1 && (
              <button className="prev-button" onClick={() => setCurrentPage(currentPage - 1)}>
                &laquo; Prev
              </button>
            )}
            {currentPage < totalPages && (
              <button className="next-button" onClick={() => setCurrentPage(currentPage + 1)}>
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

export default MarketInsights;

