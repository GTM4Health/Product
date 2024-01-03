import React, { useState } from "react";
import axios from "axios";
import Footer from "../../../layout/pages/Footer";
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";

const AddContent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      // If no file is selected, reset and return
      window.location.reload();
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", selectedFile);

    try {
      // Use process.env.REACT_APP_BASE_URL directly here for better consistency
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/cont/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Display success message and reload the page after user confirmation
      if (window.confirm("File uploaded successfully!")) {
        window.location.reload();
      }

      // Reset selected file after successful upload
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      // You might want to handle the error and provide appropriate user feedback here
    }
  };

  return (
    <div className="page-view">
      <AdminHeader />
      <AdminMenuBar />
      <div className="d-content">
        <div className="dashboard">
          <h2 className="page-title">Add Market Insight Reports</h2>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload PDF</button>
          {/* Display a message if no file is chosen */}
          {/* {selectedFile === null && <p>No file chosen</p>} */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddContent;
