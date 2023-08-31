import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../../layout/pages/Footer";
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";

const ViewContent = () => {
  const [pdfFiles, setPdfFiles] = useState([]);

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

  return (
    <div className="page-view">
      <AdminHeader />
      <AdminMenuBar />
      <div className="d-content">
        <div className="dashboard">
          <h2 className="page-title">View Content</h2>
          <ul className="pdf-list">
            {/* {pdfFiles.map((pdfFile, index) => (
              <li key={index} className="pdf-item">
                <a
                  href={`${process.env.REACT_APP_BASE_URL}/api/cont/pdfs/${encodeURIComponent(pdfFile)}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-link"
                >
                  {pdfFile}
                </a>       
              </li>
            ))} */}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewContent;
