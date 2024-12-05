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
  const [csrStatus, setCSRStatus] = useState(null);



  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []); 

  useEffect(() => {
    if (user && user.formPrivilegesCSR && isAuthenticated) {
      //fetchHospitals();
    } else if (user && !(user.formPrivilegesCSR) && isAuthenticated) {
      navigate("/dashboard/Subscription");
    }
  }, [isAuthenticated]);



  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/CSR`, {
        csrName,
        website,
        domain,
        ser,
      });
      setCSRName('');
      setWebsite('');
      setDomain('');
      setSer('');
      setCSRStatus('success');

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
          <div className="csr-content">
            <h1>Add CSR/Foundation</h1>
            {renderCSRStatusMessage()}
            <form onSubmit={handleSubmit} className="csr-form">
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
              <button type="submit" className="btn-submit">
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
