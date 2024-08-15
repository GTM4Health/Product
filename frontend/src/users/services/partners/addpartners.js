import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../../../layout/pages/Footer"
import useAuth from "../../../hooks/useAuth";
import Header2 from "../../../layout/users/Header2";
import MenuBar from "../../../layout/users/MenuBar";

import { stateOptions, getCityOptionsByState } from '../../../assets/cityOptions';
import { useNavigate } from "react-router-dom";

const UserDealers = () => {
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
  const [pincode, setPincode] = useState(null);
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [dealers, setDealers] = useState([]);
  const [addedBy, setAddedBy] = useState('');
  const [addedOnTime, setAddedOnTime] = useState('');
  const navigate = useNavigate();

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity('');
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated && user) {
  //     if (0) { //!user.gtmPrivileges
  //       navigate("/dashboard/Subscription");
  //     } else {
  //       fetchDealers();
  //     }
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    if (user && user.formPrivilegesDD && isAuthenticated) {
      fetchDealers();
    } else if (user && !(user.formPrivilegesDD) && isAuthenticated) {
      navigate("/dashboard/Subscription");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    user && setAddedBy(user.name);
  })

  const fetchDealers = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Dealers/dealers-portal?`;
  
    const params = new URLSearchParams();
    // params.append('page', currentPage);
    // params.append('limit', pageSize);
  
    // if (selectedState !== 'all') {
    //   params.append('state', selectedState);
    // }
  
    // if (selectedCity !== 'all') {
    //   params.append('city', selectedCity);
    // }
  
    try {
      const response = await axios.get(url + params.toString());
      setDealers(response.data.dealer);
      setTotalRows(response.data.totalRows);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = now.toLocaleDateString('en-GB', options).replace(/ /g, '-');
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: true });
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
        GST,
        pincode,
        addedBy,
        addedOnTime: `${formattedDate}, ${formattedTime} `,
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
      setPincode('');
      setDealerStatus('success');
      setAddedOnTime('');

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
      return <div className="popup success">Dealers & Distributors successfully registered!</div>;
    } else if (dealerStatus === 'failure') {
      const errorMessage = 'Dealers & Distributors failed to register. Please try again.';
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
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="hosp-content">
            <h1>Add Dealers & Distributors</h1>
            {renderDealerStatusMessage()}
            <form onSubmit={handleSubmit} className="hospital-f">
              <div className='filter-container'>
              <div className="pincode">
                  <label className='f-label' htmlFor="state">State* :</label>
                  <select
                    id="state"
                    value={state}
                    onChange={handleStateChange}
                    className="form-outline f-select wd50"
                  >
                    <option value="" disabled hidden>
                      Select
                    </option>
                    {stateOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="pincode">
                  <label className='f-label' htmlFor="city">City* :</label>
                  <select
                    id="city"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-outline f-select wd50"
                  >
                    <option value="" disabled hidden>
                      Select
                    </option>
                    {renderCityOptions()}
                  </select>
                </div>
                {/* <div className="pincode">
                  <label className='f-label'>Pincode:</label>
                  <input
                    type="integer"
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Pincode"
                    className="form-outline f-select pincode"
                  />
                </div> */}
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
              {/* <div className="form-group">
                <label htmlFor="phone">GST No.:</label>
                <input
                  type="text"
                  id="phone"
                  value={GST}
                  onChange={(e) => setGST(e.target.value)}
                  placeholder="Company Registered GST Number"
                  className="form-outline"
                />
              </div> */}
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

export default UserDealers;