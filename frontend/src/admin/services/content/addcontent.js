import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../../layout/pages/Footer";
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";

// Import the category options from a JSON file
import categoryOptions from "../../../assets/categoryOptions.json";

const AddContent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [reportName, setReportName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // useEffect to fetch and set category options
  useEffect(() => {
    // You may load category options from an API or use a local JSON file

    // Set the initial selected category to the first one in the options
    if (categoryOptions && categoryOptions.length > 0) {
      setSelectedCategory(categoryOptions[0]);
    }
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !reportName || !selectedCategory) {
      // If any of the required fields is missing, return
      window.alert("Please fill in all the required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", selectedFile);
    formData.append("reportName", reportName);
    formData.append("category", selectedCategory);

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/cont/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Display success message and reload the page after user confirmation
      if (window.confirm("File uploaded successfully!")) {
        window.location.reload();
      }

      // Reset form fields after successful upload
      setSelectedFile(null);
      setReportName("");
      // You may reset selected category based on your use case
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

          {/* New input fields for Name of Report and Category */}
          <label>
            Name of Report:
            <input type="text" value={reportName} onChange={(e) => setReportName(e.target.value)} />
          </label>

          <label>
            Category:
            {/* Dropdown for Category */}
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          {/* File input and upload button */}
          <label>
            Upload PDF File:
            <input type="file" onChange={handleFileChange} />
          </label>
          <button onClick={handleUpload}>Submit</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddContent;
