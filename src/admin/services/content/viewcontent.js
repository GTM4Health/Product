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
        const response = await axios.get("/api/pdfs");
        setPdfFiles(response.data);
      } catch (error) {
        console.error("Error fetching PDF files:", error);
      }
    };

    fetchPdfFiles();
  }, []);

  return (
    <div>
      <AdminHeader />
      <AdminMenuBar />
      <div className="content">
        <h2>View Content</h2>
        <ul>
          {pdfFiles.map((pdfFile, index) => (
            <li key={index}>
              <a href={`/public/${pdfFile}`} target="_blank" rel="noopener noreferrer">
                {pdfFile}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default ViewContent;
