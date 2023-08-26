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
    if (selectedFile) {
      const formData = new FormData();
      formData.append("pdfFile", selectedFile);

      try {
        await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("File uploaded successfully!");
        setSelectedFile(null);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="page-view">
        <AdminHeader />
        <div className="d-content">
            <AdminMenuBar />
            <div className="content">
              <h2>Add Content</h2>
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleUpload}>Upload PDF</button>
            </div>
        </div>
      <Footer />
    </div>
  );
};

export default AddContent;
