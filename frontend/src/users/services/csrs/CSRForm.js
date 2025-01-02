import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../../layout/pages/Footer';
import MenuBar from '../../../layout/users/MenuBar';
import Header2 from '../../../layout/users/Header2';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CSRForm = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);
  const [csrName, setCSRName] = useState('');
  const [website, setWebsite] = useState('');
  const [domain, setDomain] = useState('');
  const [ser, setSer] = useState('');
  const [addedBy, setAddedBy] = useState('');
  const [csrStatus, setCSRStatus] = useState(null);
  const [addedOnTime, setAddedOnTime] = useState('');
  

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    user && setAddedBy(user.name);
  })

  useEffect(() => {
    if (user && user.formPrivilegesCSR && isAuthenticated) {
      fetchCsrs();
    } else if (user && !(user.formPrivilegesCSR) && isAuthenticated) {
      navigate("/dashboard/Subscription");
    }
  }, [isAuthenticated]);

  const fetchCsrs = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/CSR/csrs-portal?`;

    const params = new URLSearchParams();

    try {
      const response = await axios.get(url + params.toString());
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = now.toLocaleDateString('en-GB', options).replace(/ /g, '-');
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: true });
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/CSR`, {
        csrName,
        website,
        domain,
        ser,
        addedBy,
        addedOnTime: `${formattedDate}, ${formattedTime} `,
        
      });
      setCSRName('');
      setWebsite('');
      setDomain('');
      setSer('');
      setCSRStatus('success');
      setAddedOnTime('');
      setTimeout(() => {
        setCSRStatus(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      setCSRStatus('failure');
    }
  };

  const renderCSRStatusMessage = () => {
    if (csrStatus === 'success') {
      return <div className="popup success">CSR/Foundation successfully added!</div>;
    }
    if (csrStatus === 'failure') {
      return (
        <div className="popup failure">
          Failed to add CSR/Foundation. Please try again.
          <br />
          <button onClick={() => setCSRStatus(null)}>Try Again</button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="hosp-content">
            <h1>Add CSR/Foundation</h1>
            {renderCSRStatusMessage()}
            <form onSubmit={handleSubmit} className="hospital-f">
              {/* CSR/Foundation Name */}
              <div className="form-group">
                <label htmlFor="csrName">CSR/Foundation Name*:</label>
                <input
                  type="text"
                  id="csrName"
                  required
                  value={csrName}
                  onChange={(e) => setCSRName(e.target.value)}
                  placeholder="CSR/Foundation Name"
                  className="form-outline"
                />
              </div>
              {/* Website URL */}
              <div className="form-group">
                <label htmlFor="website">Website URL:</label>
                <input
                  type="text"
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Website URL"
                  className="form-outline"
                />
              </div>
              {/* Domain */}
              <div className="form-group">
                <label htmlFor="domain">Domain:</label>
                <input
                  type="text"
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Enter domain"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="ser">Services:</label>
                <textarea
                  id="ser"
                  value={ser}
                  onChange={(e) => setSer(e.target.value)}
                  placeholder="CSR/Foundation Services"
                  className="form-outline textarea"
                ></textarea>
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

export default CSRForm;
