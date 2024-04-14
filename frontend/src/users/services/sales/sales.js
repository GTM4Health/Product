import React, { useState, useEffect } from 'react';
import axios from 'axios';;
import Footer from "../../../layout/pages/Footer";
import { stateOptions, getCityOptionsByState } from '../../../assets/cityOptions';
import Header2 from '../../../layout/users/Header2';
import MenuBar from '../../../layout/users/MenuBar';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SalesForm = () => {
  const [user, setUser] = useState('')
  const [leadName, setLeadName] = useState('');
  const [healthcareCentreName, setHealthcareCentreName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [status, setStatus] = useState('');
  const [finalStatus, setFinalStatus] = useState('');
  const [reportsBetweenDates, setReportsBetweenDates] = useState('');
  const [salesStatus, setSalesStatus] = useState(null);
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if (user && user.salesPriveleges  && isAuthenticated) {
      setLeadName(user.name)
  } else if (user && !(user.salesPriveleges ) && isAuthenticated) {
    navigate("/dashboard/Subscription");
  }
}, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Sales`, {
        leadName,
        healthcareCentreName,
        email,
        mobileNo,
        status,
        finalStatus,
        reportsBetweenDates
      });
      // Clear form fields after successful submission
      setLeadName('');
      setHealthcareCentreName('');
      setEmail('');
      setMobileNo('');
      setStatus('');
      setFinalStatus('');
      setReportsBetweenDates('');
      setSalesStatus('success');
      // Show success message or redirect to another page
      setTimeout(() => {
        setSalesStatus(null);
      }, 1500);
      
    } catch (error) {
      console.error('Error:', error);
      setSalesStatus('failure');
      // Handle error
    }
  };

  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const renderCityOptions = () => {
    const cities = getCityOptionsByState(state);
    if (!state)
      return <option disabled value=''>State is a mandatory field *</option>
    return cities.map((city) => (
      <option key={city.value} value={city.value}>
        {city.label}
      </option>
    ));
  };

  const renderSalesStatusMessage = () => {
    if (salesStatus === 'success') {
      return <div className="popup success">Sales entry created successfully!</div>;
    } else if (salesStatus === 'failure') {
      return <div className="popup failure">Failed to create sales entry. Please try again.</div>;
    }
    return null;
  };

  return (
    <div className="page-view">
      <Header2 user={user}/>
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="hosp-content">
            <h1>Sales Tracker Form</h1>
            {renderSalesStatusMessage()}
            <form onSubmit={handleSubmit} className="sales-form hospital-f">
              <div className="form-group">
                <label htmlFor="leadName">Lead Name:</label>
                <input
                  type="text"
                  id="leadName"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Lead Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="healthcareCentreName">Healthcare Centre Name:</label>
                <input
                  type="text"
                  id="healthcareCentreName"
                  value={healthcareCentreName}
                  onChange={(e) => setHealthcareCentreName(e.target.value)}
                  placeholder="Healthcare Centre Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobileNo">Mobile No:</label>
                <input
                  type="tel"
                  id="mobileNo"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  placeholder="Mobile No"
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <input
                  type="text"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="Status"
                />
              </div>
              <div className="form-group">
                <label htmlFor="finalStatus">Final Status:</label>
                <select
                  id="finalStatus"
                  value={finalStatus}
                  onChange={(e) => setFinalStatus(e.target.value)}
                >
                  <option value="No Requirement">No Requirement</option>
                  <option value="Our Cost is higher">Our Cost is higher</option>
                  <option value="Closed Sales">Closed Sales</option>
                  <option value="Lost to Competition">Lost to Competition</option>
                  <option value="On hold">On hold</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="reportsBetweenDates">Reports:</label>
                <textarea
                  className='form-outline textarea'
                  id="reportsBetweenDates"
                  value={reportsBetweenDates}
                  onChange={(e) => setReportsBetweenDates(e.target.value)}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SalesForm;
