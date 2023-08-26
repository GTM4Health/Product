import React, { useState, useEffect } from "react";
import Footer from "../../../layout/pages/Footer";
import Header2 from "../../../layout/users/Header2";
import useAuth from "../../../hooks/useAuth";
import Menubar from "../../../layout/users/MenuBar";
import { pdfjs, Document, Page } from "react-pdf";
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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <Menubar />
          <div className="page-title">
            <h1 className="page-title-child">Market Insights</h1>
          </div>
          <PdfViewer currentPage={currentPage} onLoadSuccess={handleDocumentLoadSuccess} />
          <div className="page-navigation">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <p>
              Page {currentPage} of {numPages}
            </p>
            <button onClick={goToNextPage} disabled={currentPage === numPages}>
              Next Page
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MarketInsights;
