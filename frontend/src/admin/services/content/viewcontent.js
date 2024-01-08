import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../../layout/pages/Footer";
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";

const ViewContent = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [previewFileName, setPreviewFileName] = useState("");
  const [editFileName, setEditFileName] = useState("");
  const [newFileName,setNewFileName]=useState(editFileName);
  const [editModalVisible, setEditModalVisible] = useState(false);

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

  const handleDownload = async (fileName) => {
    try {
      // Replace 'download-endpoint' with your actual download API endpoint
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/cont/download/${fileName}`, {
        responseType: 'blob',
      });

      // Create a temporary anchor element to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error downloading file ${fileName}:`, error);
    }
  };

  const handlePreview = (fileName) => {
    setPreviewFileName(fileName);
  };

  const handleEdit = (fileName) => {
    setEditFileName(fileName);
    setEditModalVisible(true);
  };

  const handleEditName = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/cont/edit/${editFileName}`,
        { newFileName: newFileName },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      console.log('Edit Response:', response.data);
  
      // Update state and trigger page reload
      setEditModalVisible(false);
      setEditFileName(newFileName);
      setNewFileName("");
  
      // Reload the page after a short delay to allow state to update
      setTimeout(() => {
        window.location.reload();
      }, 30000);
    } catch (error) {
      console.error(`Error editing file name for ${editFileName}:`, error);
    }
  };
  
  
  
  

  const handleDelete = async (fileName) => {
    try {
      // Replace 'delete-endpoint' with your actual delete API endpoint
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/cont/delete/${fileName}`);
      setPdfFiles(pdfFiles.filter((file) => file !== fileName));
    } catch (error) {
      console.error(`Error deleting file ${fileName}:`, error);
    }
  };

  return (
    <div className="page-view">
      <AdminHeader />
      <AdminMenuBar />
      <div className="d-content">
        <div className="dashboard">
          <h2 className="page-title">View Market Insight Reports</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>File Name</th>
                <th>Actions</th>
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
                  <td>
                    <button onClick={() => handleDownload(pdfFile)}>
                      <i className="fas fa-download"></i>
                    </button>
                    {/* <button onClick={() => handlePreview(pdfFile)}>
                      <i className="fas fa-eye"></i>
                    </button> */}
                    <button onClick={() => handleEdit(pdfFile)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => handleDelete(pdfFile)}>
                      <i className="fas fa-trash"></i>
                    </button>
                    {/* Add more action buttons as needed */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editModalVisible && (
        <div className="edit-form">
          <h2>Edit File</h2>
          <form onSubmit={handleEditName}>
            <div className="form-group">
              <label htmlFor="newFileName">New File Name</label>
              <input
                type="text"
                id="newFileName"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                required                
              />
            </div>
            <div className="button-group">
              <button type="submit" className="btn-primary">
                <i className="fas fa-check"></i>
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setEditModalVisible(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Preview Modal
      {previewFileName && (
        <div className="preview-modal">
          <div className="preview-modal-content">
            <h3>File Preview</h3>
            <iframe
              title="File Preview"
              src={`${process.env.REACT_APP_BASE_URL}/api/cont/pdfs/${encodeURIComponent(previewFileName)}`}
              width="100%"
              height="500px"
            ></iframe>
            <button onClick={() => setPreviewFileName("")}>
              <i className="fas fa-times"></i> Close Preview
            </button>
          </div>
        </div>
      )} */}

      <Footer />
    </div>
  );
};

export default ViewContent;
