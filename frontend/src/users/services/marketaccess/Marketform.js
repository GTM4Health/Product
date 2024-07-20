import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Footer from "../../../layout/pages/Footer"
import MenuBar from '../../../layout/users/MenuBar';
import Header2 from '../../../layout/users/Header2';
import Categories from "../../../assets/healthcareCategories.json";
import useAuth from '../../../hooks/useAuth';

import { stateOptions, getCityOptionsByState } from '../../../assets/cityOptions';
import specialitiesData from '../../../assets/specialities.json'; // Import the specialities data
import { useNavigate } from 'react-router-dom';

const UserHospital = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [infraSer, setInfraSer] = useState('');
  const [city, setCity] = useState('');
  const [docName, setDocName] = useState('');
  const [docSpez, setDocSpez] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [lastConnected, setLastConnected] = useState('');
  const [hospitalStatus, setHospitalStatus] = useState(null);
  const [pincode, setPincode] = useState(''); 
  const [address,setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [hospitalNames, setHospitalNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [addedBy, setAddedBy] = useState('');
  const [addedOnTime, setAddedOnTime] = useState('');



  useEffect(() => {
    if (user && user.formPrivilegesHC && isAuthenticated) {
      fetchHospitals();
    } else if (user && !(user.formPrivilegesHC) && isAuthenticated) {
      navigate("/dashboard/Subscription");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    user && setAddedBy(user.name);
  })
  
  

  useEffect(() => {
    // Fetch hospital names from the backend when the component mounts
    user && setAddedBy(user.name);
    const fetchHospitalNames = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal`, {
          params: {
            search: searchQuery // Send the search query as a parameter
          }
        });
        setHospitalNames(response.data.hospitals.map(hospital => hospital.name));
      } catch (error) {
        console.error('Error fetching hospital names:', error);
      }
    };
  
    fetchHospitalNames();
  }, [searchQuery]); // Trigger the effect whenever searchQuery changes


  // useEffect(() => {
  //   if (user && !(user.formPrivilegesHC) && isAuthenticated) {
  //     navigate("/dashboard/Subscription");
  //   }

  // }, [isAuthenticated]);
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  
  }, []); 



  const fetchHospitals = async () => {
    const params = new URLSearchParams();
    // params.append('page', currentPage);
    // params.append('limit', pageSize);
    // params.append('state', selectedState);
    // params.append('city', selectedCity);
    // params.append('speciality', selectedSpeciality);
    // params.append('category', selectedCategory);
    // params.append('search', searchQuery); // Add this line to include the search parameter
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal?${params.toString()}`);
      // setHospitals(response.data.hospitals);
      // setTotalRows(response.data.totalRows);
      // setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity('');
  };
  if (!isAuthenticated) {
    // Optional: Show a loading state or return null while checking authentication
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = now.toLocaleDateString('en-GB', options).replace(/ /g, '-');
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: true });
    
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Add-Hospital`, {
        name,
        city,
        state,
        infraSer,
        docName,
        docSpez,
        mail,
        phone,
        speciality,
        lastConnected,
        pincode,
        address,
        category,
        searchQuery,
        hospitalNames,
        addedBy,
        addedOnTime: `${formattedDate}, ${formattedTime} `,
      });
      setSearchQuery('');
      setName('');
      setCity('');
      setInfraSer('');
      setState('');
      setDocName('');
      setDocSpez('');
      setMail('');
      setPhone('');
      setSpeciality('');
      setLastConnected('');
      setPincode('');
      setHospitalStatus('success');
      setAddress('');
      setCategory('');
      setHospitalNames('');
      setAddedOnTime('');
      // Clear the success message after 2 seconds
      setTimeout(() => {
        setHospitalStatus(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      console.log('Error response:', error.response);
      setHospitalStatus('failure');
      // show an error message or perform any other error handling
    }
  };

  const renderHospitalStatusMessage = () => {
    if (hospitalStatus === 'success') {
      return <div className="popup success">Healthcare Centre added successfully!</div>;
    } else if (hospitalStatus === 'failure') {
      const errorMessage = 'Healthcare Centre addition failed. Please try again.';
      return (
        <div className="popup failure">
          {errorMessage}
          <br />
          <button onClick={() => setHospitalStatus(null)}>Try Again</button>
        </div>
      );
    }
    return null;
  };

  const renderCityOptions = () => {
    const cities = getCityOptionsByState(state);
    if(!state)
      return <option disabled value=''> State is a Mandatory field *</option>
    return cities.map((city) => (
      <option key={city.value} value={city.value}>
        {city.label}
      </option>
    ));
  };

  const renderSpecialityOptions = () => {
    return specialitiesData.specialities.map((spec) => (
      <option key={spec} value={spec}>
        {spec}
      </option>
    ));
  };

  const renderCategoryOptions = () => {
    return Categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ));
  };
  

  return (
    <div className="page-view">
      <Header2 user = {user} />
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="hosp-content">
            <h1>Add Healthcare Centres</h1>
            {renderHospitalStatusMessage()}
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
                <div className="pincode">
                  <label className='f-label'>Pincode:</label>
                  <input
                    type="integer"
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Pincode"
                    className="form-outline f-select pincode"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="search">Search Hospital:</label>
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search hospital by name"
                  className="form-outline"
                />
{hospitalNames.length > 0 && searchQuery.length >0 && (
  <div className="form-group">
    <label htmlFor="hospital">Found Hospital:</label>
    <select
      id="hospital"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="form-outline"
    >
      <option value="" disabled hidden>
        Found Hospital
      </option>
      {hospitalNames.map((hospital, index) => (
        <option key={index} value={hospital}>
          {hospital}
        </option>
      ))}
    </select>
  </div>

              )}
              </div>
                              {/* Dropdown Menu */}
              <div className="form-group">
                <label htmlFor="name">Centre Name* :</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Healthcare Centre Name"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="infraSer">Infrastructure & Services :</label>
                <textarea
                  id="infraSer"
                  value={infraSer}
                  onChange={(e) => setInfraSer(e.target.value)}
                  placeholder="Infrastructure & Services"
                  className="form-outline textarea"
                ></textarea>
              </div>
              <div className="form-group">
                <label className='f-label' htmlFor="speciality">Categories :</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-outline f-select wd50"
                >
                  <option value="" disabled hidden>
                    Select Category
                  </option>
                  {renderCategoryOptions()}
                </select>
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
                <label htmlFor="docName">Contact Name :</label>
                <input
                  type="text"
                  id="docName"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="Contact Name"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="docSpez">Role :</label>
                <input
                  type="text"
                  id="docSpez"
                  value={docSpez}
                  onChange={(e) => setDocSpez(e.target.value)}
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
                <label className='f-label' htmlFor="speciality">Speciality :</label>
                <select
                  id="speciality"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  className="form-outline f-select wd50"
                >
                  <option value="" disabled hidden>
                    Select Speciality
                  </option>
                  {renderSpecialityOptions()}
                </select>
              </div> */}
              <div className="form-group">
                <label htmlFor="lastConnected">Last Connected:</label>
                <textarea
                  id="lastConnected"
                  value={lastConnected}
                  onChange={(e) => setLastConnected(e.target.value)}
                  placeholder="Last Connected"
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

export default UserHospital;
