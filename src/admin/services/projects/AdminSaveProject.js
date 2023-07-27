import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../../../layout/pages/Footer"
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";

const AdminSaveProject = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [progress, setProgress] = useState('');
  const [reportSent, setReportSent] = useState(false);

  useEffect(() => {
    // Fetch the list of projects from the backend
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Projects/projects-portal`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching projects', error);
      });
  }, []);

  const handleProjectChange = async (e) => {
    const selectedProjectId = e.target.value;
    setSelectedProject(selectedProjectId);

    // Fetch the current progress for the selected project from the backend
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Projects/${selectedProjectId}`);
      // Check if the response contains progress and set the state accordingly
      if (response.data.progress) {
        setProgress(response.data.progress);
      } else {
        // If progress is empty, set the state to a blank value
        setProgress('');
      }
    } catch (error) {
      console.error('Error fetching project progress', error);
    }
  };

  const handleMailReport = async () => {
    try {
      // Create a PDF of the progress and send the report via mail
      // Replace the 'generatePDF' and 'sendMail' functions with your actual implementations
      await generatePDF(progress); // Function to generate PDF from progress
      await sendMail(progress); // Function to send the PDF report via mail
      setReportSent(true);
    } catch (error) {
      console.error('Error sending report', error);
      // Perform error handling if required
    }
  };

  const renderReportButton = () => {
    if (reportSent) {
      return <button disabled>Report Sent</button>;
    } else {
      return <button onClick={handleMailReport}>Mail/Print Update</button>;
    }
  };

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="hosp-content">
            <h1>Mail or Print Update</h1>
            <form className="hospital-f">
              <div className="form-group">
                <label htmlFor="projectSelect">Choose Project:</label>
                <select
                  id="projectSelect"
                  value={selectedProject}
                  onChange={handleProjectChange}
                  required
                  className="form-outline"
                >
                  <option value="" disabled>
                    Select Project
                  </option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="progress">View Progress:</label>
                <textarea
                  id="progress"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  placeholder="Progress"
                  className="form-outline textarea"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Progress Report:</label>
                {renderReportButton()}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminSaveProject;
