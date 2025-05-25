import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../../layout/pages/Footer";
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";

// // Import the category options for learning modules
// import learningModuleCategories from "../../../assets/learningModuleCategories.json";

const AddLearningModule = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [moduleName, setModuleName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // useEffect(() => {
  //   if (learningModuleCategories && learningModuleCategories.length > 0) {
  //     setSelectedCategory(learningModuleCategories[0]);
  //   }
  // }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile ) {
      window.alert("Please fill in all the required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", selectedFile);
    formData.append("moduleName", moduleName);
    formData.append("category", selectedCategory);

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/learning/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (window.confirm("Learning Module uploaded successfully!")) {
        window.location.reload();
      }

      setSelectedFile(null);
      setModuleName("");
    } catch (error) {
      console.error("Error uploading learning module:", error);
    }
  };

  return (
    <div className="page-view">
      <AdminHeader />
      <AdminMenuBar />
      <div className="d-content">
        <div className="dashboard hosp-content">
          <h1 className="page-title">Add Learning Modules</h1>

          <label>
            Name of Module:
            <input
              type="text"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
          </label>

          {/* <label>
            Category:
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {learningModuleCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label> */}

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

export default AddLearningModule;
