// frontend/CreateProjectForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './components/Footer';
import AdminHeader from './components/AdminHeader';
import AdminMenuBar from './components/AdminMenubar';

const CreateProject = () => {
  const [startupName, setStartupName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startupList, setStartupList] = useState([]);
  const [projectStatus, setProjectStatus] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Startups/all-startups`)
      .then((response) => {
        setStartupList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching startup list', error);
      });
  }, []);

  const handleProjectNameChange = (e) => {
    const selectedStartupName = e.target.value;
    setStartupName(selectedStartupName);
    // Generate the project name based on the selected startup name
    if (selectedStartupName) {
      setProjectName(`${selectedStartupName} Project`);
    } else {
      setProjectName('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Projects`, {
        startupName,
        projectName,
        startDate,
        endDate,
      });
      setStartupName('');
      setProjectName('');
      setStartDate('');
      setEndDate('');
      setProjectStatus('success');

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setProjectStatus(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      console.log('Error response:', error.response);
      setProjectStatus('failure');
    }
  };

  const renderProjectStatusMessage = () => {
    if (projectStatus === 'success') {
      return <div className="popup success">Project successfully added!</div>;
    } else if (projectStatus === 'failure') {
      const errorMessage = 'Failed to add project. Please try again.';
      return (
        <div className="popup failure">
          {errorMessage}
          <br />
          <button onClick={() => setProjectStatus(null)}>Try Again</button>
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
            <h1>Create Project</h1>
            {renderProjectStatusMessage()}
            <form onSubmit={handleSubmit} className="hospital-f">
              <div className="form-group">
                <label className='wd100' htmlFor="startupName">Startup:</label>
                <select
                  id="startupName"
                  value={startupName}
                  onChange={handleProjectNameChange}
                  required
                  className="form-outline"
                >
                  <option value="" disabled>
                    Select Startup
                  </option>
                  {startupList.map((startup) => (
                    <option key={startup._id} value={startup.startupName}>
                      {`${startup.startupName} Project`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date:</label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="form-outline"
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

export default CreateProject;
