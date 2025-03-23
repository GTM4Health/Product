import React, { useState } from "react";
import axios from "axios";
import Footer from "../../../layout/pages/Footer";
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";

import { stateOptions, getCityOptionsByState } from '../../../assets/cityOptions';

const NewSpecialistForm = () => {
  const [doctorName, setDoctorName] = useState("");
  const [specialistIn, setSpecialistIn] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [mobNumber, setMobNumber] = useState("");
  const [specialistStatus, setSpecialistStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/specialist`, {
        doctorName,
        specialistIn,
        qualifications,
        yearsExperience,
        workExperience,
        location,
        state,
        city,
        email,
        mobNumber,
      });
      setDoctorName("");
      setSpecialistIn("");
      setQualifications("");
      setYearsExperience("");
      setWorkExperience("");
      setLocation("");
      setState("");
      setCity("");
      setEmail("");
      setMobNumber("");
      setSpecialistStatus("success");

      setTimeout(() => {
        setSpecialistStatus(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      setSpecialistStatus("failure");
    }
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

    const handleStateChange = (e) => {
      setState(e.target.value);
      setCity('');
    };
  

  const renderSpecialistStatusMessage = () => {
    if (specialistStatus === "success") {
      return <div className="popup success">Specialist successfully added!</div>;
    } else if (specialistStatus === "failure") {
      return (
        <div className="popup failure">
          Failed to add Specialist. Please try again.
          <br />
          <button onClick={() => setSpecialistStatus(null)}>Try Again</button>
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
            <h1>Add Specialist</h1>
            {renderSpecialistStatusMessage()}
            <form onSubmit={handleSubmit} className="hospital-f">
              <div className="form-group">
                <label htmlFor="doctorName">Doctor Name*:</label>
                <input type="text" id="doctorName" required value={doctorName} onChange={(e) => setDoctorName(e.target.value)} placeholder="Doctor Name" className="form-outline" />
              </div>
              <div className="form-group">
                <label htmlFor="specialistIn">Specialist in:</label>
                <input type="text" id="specialistIn" value={specialistIn} onChange={(e) => setSpecialistIn(e.target.value)} placeholder="Specialist Field" className="form-outline" />
              </div>
              <div className="form-group">
                <label htmlFor="qualifications">Qualifications:</label>
                <input type="text" id="qualifications" value={qualifications} onChange={(e) => setQualifications(e.target.value)} placeholder="Qualifications" className="form-outline" />
              </div>
              <div className="form-group">
                <label htmlFor="yearsExperience">Years of Experience:</label>
                <input type="number" id="yearsExperience" value={yearsExperience} onChange={(e) => setYearsExperience(e.target.value)} placeholder="Years of Experience" className="form-outline" />
              </div>
              <div className="form-group">
                <label htmlFor="workExperience">Work Experience:</label>
                <textarea id="workExperience" value={workExperience} onChange={(e) => setWorkExperience(e.target.value)} placeholder="Work Experience" className="form-outline textarea" />
              </div>
              <div className="form-group">
                <label htmlFor="location">Address:</label>
                <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Address" className="form-outline" />
              </div>
              <div className="form-group">
                <label htmlFor="state">State:</label>
                <select id="state" value={state} onChange={handleStateChange}>
                  <option disabled value="">
                    Select State
                  </option>
                  {renderStateOptions()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <select
                  id="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option disabled hidden value="">
                    Select City
                  </option>
                  {renderCityOptions()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="form-outline" />
              </div>
              <div className="form-group">
                <label htmlFor="mobNumber">Mobile Number:</label>
                <input type="text" id="mobNumber" value={mobNumber} onChange={(e) => setMobNumber(e.target.value)} placeholder="Mobile Number" className="form-outline" />
              </div>
              <button type="submit" className="hsubtn login-btn">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewSpecialistForm;
