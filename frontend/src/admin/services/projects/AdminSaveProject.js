import React, { useState, useRef, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Footer from "../../../layout/pages/Footer";
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";
import axios from 'axios';
import logo from "../../../images/newlogo.png";

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    paddingTop: 3,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  section: {
    margin: 2,
    padding: 1,
    flexGrow: 1,
  },
  logoContainer: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  logo: {
    width: 150,
    height: 50,
  },
  projectNameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  projectName: {
    fontSize: 22,
    fontWeight: '1000',
  },
  underline: {
    borderBottom: '2px solid black', // Adjust the color and thickness to match the underline style
    width: '90%',
    marginTop: 1,
  },
  progressContainer: {
    marginTop: 0,
    marginBottom: '100%',
  },
  progressText: {
    textAlign: 'left',
  },
});

const ProgressReportPDF = ({ projectName, progress }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.logoContainer}>
          <Image src={logo} style={styles.logo} />
        </View>
        <View style={styles.projectNameContainer}>
          <Text style={styles.projectName}>{projectName}</Text>
          <View style={styles.underline} />
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {progress}
          </Text>
        </View>
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
      const subject = `Progress Report for ${projectName}`;
      const body = `Progress Report for ${projectName}:\n${progress}`;
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
      const anchor = document.createElement('a');
      anchor.href = mailtoLink;
      anchor.target = '_blank'; // Open in a new tab/window
      anchor.click();
      setReportSent(true);
    }
  };
  

  const renderReportButton = () => {
    if (reportSent) {
      return <button disabled>Report Sent</button>;
    } else {
      return (
        <div>
          <button onClick={handleMailReport}>Mail Report</button>
          <button>
            <PDFDownloadLink className='btn' document={<ProgressReportPDF projectName={projectName} progress={progress} />} fileName="Progress_Report.pdf">
              {({ blob, url, loading, error }) =>
                loading ? 'Loading...' : 'Print PDF'
              }
            </PDFDownloadLink>
          </button>
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
                <label htmlFor="projectSelect">Project:</label>
                <select
                  id="projectSelect"
                  value={selectedProject}
                  onChange={handleProjectChange}
                  required
                  className="form-outline"
                >
                  <option value="" hidden>
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