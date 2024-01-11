import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer";
import Header2 from "../../../layout/users/Header2";
import useAuth from "../../../hooks/useAuth";
import Menubar from "../../../layout/users/MenuBar";
import { pdfjs, Document, Page } from "react-pdf";
import axios from "axios";
import "react-pdf/dist/esm/Page/TextLayer.css";

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
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfFiles, setPdfFiles] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const fetchPdfFiles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/cont/pdfs`);
        setPdfFiles(response.data);
      } catch (error) {
        console.error("Error fetching PDF files:", error);
      }
    };

    fetchPdfFiles();
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
      <Menubar />
        <div className="dashboard">
          <h2 className="page-title">View Market Insight Reports</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Market Insight Report</th>
              </tr>
            </thead>
            <tbody>
              {pdfFiles.map((pdfFile, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MarketInsights;
