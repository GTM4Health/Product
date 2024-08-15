import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../../layout/pages/Footer";
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";

const ViewContent = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [editFileName, setEditFileName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);

  useEffect(() => {
    const fetchPdfFiles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/cont/pdfs?page=${currentPage}&limit=${pageSize}`
        );
        setPdfFiles(response.data.files);
        setTotalFiles(response.data.totalFiles);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching PDF files:", error);
      }
    };

    fetchPdfFiles();
  }, [currentPage, pageSize]);

  const handleDownload = async (fileName) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/cont/download/${fileName}`, {
        responseType: 'blob',
      });

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

  const handleEdit = (fileName) => {
    setEditFileName(fileName);
    setEditModalVisible(true);
    // You may fetch the existing category for the selected file here and set it in a state variable
  };

  const handleEditDetails = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/cont/edit/${editFileName}`,
        { newFileName, newCategory },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Edit Response:', response.data);

      setEditModalVisible(false);
      setNewFileName("");
      setNewCategory("");

      setTimeout(() => {
        window.location.reload();
      }, 30000);
    } catch (error) {
      console.error(`Error editing file details for ${editFileName}:`, error);
    }
  };

  const handleDelete = async (fileName) => {
    try {
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
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag">View Market Insight Reports</h1>
          </div>
          <div className="page-jump w10">
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
            <h4 className="total-rows ft5">Total Market Access Reports = {totalFiles}</h4>
            <h4 className="total-rows right ft5">
              <i>Displaying Page {currentPage} of {totalPages}</i>
            </h4>
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th className="sl">Sl No.</th>
                <th>Market Insights Reports</th>
                <th>Category</th>
                <th>Actions</th>
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
                  <td>
                    <button onClick={() => handleDownload(pdfFile)}>
                      <i className="fas fa-download"></i>
                    </button>
                    <button onClick={() => handleEdit(pdfFile)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => handleDelete(pdfFile)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
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

      {/* Edit Modal */}
      {editModalVisible && (
        <div className="edit-form">
          <h2>Edit File</h2>
          <form onSubmit={handleEditDetails}>
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
            <div className="form-group">
              <label htmlFor="newCategory">New Category</label>
              <input
                type="text"
                id="newCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
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

      <Footer />
    </div>
  );
};

export default ViewContent;