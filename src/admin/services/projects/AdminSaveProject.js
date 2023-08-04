// src/saveproject.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Footer from "../../../layout/pages/Footer";
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const ProgressReportPDF = ({ projectName, progress }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Project Name: {projectName}</Text>
        <Text>Progress: {progress}</Text>
      </View>
    </Page>
  </Document>
);

const AdminSaveProject = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [progress, setProgress] = useState('');
  const [projectName, setProjectName] = useState('');
  const [reportSent, setReportSent] = useState(false);
  const pdfRef = useRef();
  const [mailtoLink, setMailtoLink] = useState('');

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

  useEffect(() => {
    // When the selected project ID changes, find the corresponding project object
    if (selectedProject) {
      const project = projects.find((proj) => proj._id === selectedProject);
      setSelectedProject(project?._id);
      setProjectName(project?.projectName);
      setProgress(project?.progress || '');
    }
  }, [selectedProject, projects]);

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };


  const handleMailReport = () => {
    if (selectedProject && projectName && progress) {
      const email = "sreeharshapolepalli@gmail.com";
      const subject = `Progress Report for ${projectName}`;
      const body = `Progress Report for ${projectName}:\n\n${progress}`;
      const mailtoLink = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
      const anchor = document.createElement('a');
      anchor.href = mailtoLink;
      anchor.click();
    }
  };
  

  const renderReportButton = () => {
    if (reportSent) {
      return <button disabled>Report Sent</button>;
    } else {
      return (
        <div>
          <button onClick={handleMailReport}>Mail Report</button>
          <PDFDownloadLink document={<ProgressReportPDF projectName={projectName} progress={progress} />} fileName="Progress_Report.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Loading...' : 'Print PDF'
            }
          </PDFDownloadLink>
        </div>
      );
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
