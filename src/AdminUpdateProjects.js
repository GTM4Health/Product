import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './components/Footer';
import AdminHeader from './components/AdminHeader';
import AdminMenuBar from './components/AdminMenubar';

const UpdateProject = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [progress, setProgress] = useState('');
  const [updateStatus, setUpdateStatus] = useState(null);

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
    setSelectedProject(e.target.value);

    // Fetch the current progress for the selected project from the backend
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Projects/${e.target.value}`);
      setProgress(response.data.progress);
    } catch (error) {
      console.error('Error fetching project progress', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Projects/${selectedProject}`, {
        progress,
      });
      setUpdateStatus('success');

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setUpdateStatus(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      console.log('Error response:', error.response);
      setUpdateStatus('failure');
    }
  };

  const renderUpdateStatusMessage = () => {
    if (updateStatus === 'success') {
      return <div className="popup success">Project updated successfully!</div>;
    } else if (updateStatus === 'failure') {
      const errorMessage = 'Failed to update project. Please try again.';
      return (
        <div className="popup failure">
          {errorMessage}
          <br />
          <button onClick={() => setUpdateStatus(null)}>Try Again</button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="hosp-content">
            <h1>Update Project</h1>
            {renderUpdateStatusMessage()}
            <form onSubmit={handleSubmit} className="hospital-f">
              <div className="form-group">
                <label htmlFor="projectSelect">Project:</label>
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
                <label htmlFor="progress">Progress:</label>
                <textarea
                  id="progress"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  placeholder="Progress"
                  className="form-outline textarea"
                />
              </div>
              <button type="submit" className="hsubtn login-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProject;
