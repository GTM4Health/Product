import React, { useState } from 'react';
import axios from 'axios';
import Footer from "../../../layout/pages/Footer"
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";

import { stateOptions, getCityOptionsByState } from '../../../assets/cityOptions';

const Dealers = () => {
  const [name, setName] = useState('');
  const [web,  setWeb] = useState('');
  const [state, setState] = useState('');
  const [products, setProducts] = useState('');
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('');
  const [dealerName, setDealerName] = useState('');
  const [role, setRole] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [GST,setGST] = useState('')
  const [dealerStatus, setDealerStatus] = useState(null);

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Dealers`, {
        name,
        web,
        address,
        city,
        state,
        products,
        dealerName,
        role,
        mail,
        phone,
        GST
      });
      setName('');
      setWeb('');
      setAddress('');
      setCity('');
      setState('');
      setProducts('');
      setDealerName('');
      setRole('');
      setMail('');
      setPhone('');
      setGST('');
      setDealerStatus('success');

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setDealerStatus(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      console.log('Error response:', error.response);
      setDealerStatus('failure');
      // show an error message or perform any other error handling
    }
  };

  const renderDealerStatusMessage = () => {
    if (dealerStatus === 'success') {
      return <div className="popup success">MedTech-Company successfully registered!</div>;
    } else if (dealerStatus === 'failure') {
      const errorMessage = 'MedTech-Company failed to register. Please try again.';
      return (
        <div className="popup failure">
          {errorMessage}
          <br />
          <button onClick={() => setDealerStatus(null)}>Try Again</button>
        </div>
      );
    }
    return null;
  };

  const renderCityOptions = () => {
    const cities = getCityOptionsByState(state);
    if(!state)
    return     <option disabled value=''> State is Mandatory field * </option>
    return cities.map((city) => (
      <option key={city.value} value={city.value}>
        {city.label}
      </option>
    ));
  };

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="hosp-content">
            <h1>Add MedTech-Companies</h1>
            {renderDealerStatusMessage()}
            <form onSubmit={handleSubmit} className="hospital-f">
              <div className='filter-container'>
                <div className="form-group">
                  <label className='f-label' htmlFor="state">State* :</label>
                  <select
                    id="state"
                    value={state}
                    onChange={handleStateChange}
                    className="form-outline f-select wd50"
                  >
                    <option value="" disabled hidden>
                      Select State
                    </option>
                    {stateOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className='f-label' htmlFor="city">City* :</label>
                  <select
                    id="city"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-outline f-select wd50"
                  >
                    <option value="" disabled hidden>
                      Select City
                    </option>
                    {renderCityOptions()}
                  </select>
                </div>
                </div>
              <div className="form-group">
                <label htmlFor="name">Company Name* :</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Company Name"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="addrx">Address :</label>
                <textarea
                  id="addrx"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="form-outline textarea addrx"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="name">Website :</label>
                <input
                  type="text"
                  id="name"
                  value={web}
                  onChange={(e) => setWeb(e.target.value)}
                  placeholder="Company Website"
                  className="form-outline"
                />
              </div>
              <div className='form-group'>
              <label htmlFor="prod">Products Managed:</label>
                <textarea
                  id="prod"
                  value={products}
                  onChange={(e) => setProducts(e.target.value)}
                  placeholder="Managed Products & Services"
                  className="form-outline textarea"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="dealerName">Contact Name :</label>
                <input
                  type="text"
                  id="dealerName"
                  value={dealerName}
                  onChange={(e) => setDealerName(e.target.value)}
                  placeholder="Contact Name"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role :</label>
                <input
                  type="text"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="mail">Contact Email :</label>
                <input
                  type="text"
                  id="mail"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  placeholder="Contact Email"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Contact Mobile:</label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contact Mobile"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">GST No.:</label>
                <input
                  type="text"
                  id="phone"
                  value={GST}
                  onChange={(e) => setGST(e.target.value)}
                  placeholder="Company Registered GST Number"
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

export default Dealers;