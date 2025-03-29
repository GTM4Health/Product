import React, { useState, useEffect } from 'react';
import { stateOptions, getCityOptionsByState } from "../../../assets/cityOptions";

const UpdateSpecialist = ({ specialistData, onUpdate, onCancel }) => {
  const [doctorName, setDoctorName] = useState(specialistData.doctorName);
  const [specialistIn, setSpecialistIn] = useState(specialistData.specialistIn);
  const [qualifications, setQualifications] = useState(specialistData.qualifications);
  const [yearsOfExperience, setYearsOfExperience] = useState(specialistData.yearsOfExperience);
  const [workExperience, setWorkExperience] = useState(specialistData.workExperience);
  const [location, setLocation] = useState(specialistData.location);
  const [state, setState] = useState(specialistData.state);
  const [city, setCity] = useState(specialistData.city);
  const [email, setEmail] = useState(specialistData.email);
  const [mobNumber, setMobNumber] = useState(specialistData.mobNumber);

  useEffect(() => {
    setDoctorName(specialistData.doctorName);
    setSpecialistIn(specialistData.specialistIn);
    setQualifications(specialistData.qualifications);
    setYearsOfExperience(specialistData.yearsOfExperience);
    setWorkExperience(specialistData.workExperience);
    setLocation(specialistData.location);
    setState(specialistData.state);
    setCity(specialistData.city);
    setEmail(specialistData.email);
    setMobNumber(specialistData.mobNumber);
  }, [specialistData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      doctorName,
      specialistIn,
      qualifications,
      yearsOfExperience,
      workExperience,
      location,
      state,
      city,
      email,
      mobNumber,
    };
    onUpdate(specialistData._id, updatedData);
  };

    const renderCityOptions = () => {
      const cities = getCityOptionsByState(state);
      if (!state) {
        return (
          <option disabled value="">
            State is a mandatory field *
          </option>
        );
      }
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
    
    const renderStateOptions = () => {
      return stateOptions.map((state) => (
        <option key={state.value} value={state.value}>
          {state.label}
        </option>
      ));
    };
  

  return (
    <div className="edit-form">
      <h2>Edit Specialist Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='f-label' htmlFor="doctorName">Doctor Name:</label>
          <input
            type="text"
            id="doctorName"
            required
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Doctor Name"
            className="form-outline addrx"
          />
        </div>
        <div className="form-group">
          <label className='f-label' htmlFor="specialistIn">Specialist In:</label>
          <input
            type="text"
            id="specialistIn"
            required
            value={specialistIn}
            onChange={(e) => setSpecialistIn(e.target.value)}
            placeholder="Specialist In"
            className="form-outline"
          />
        </div>
        <div className="form-group">
          <label className='f-label' htmlFor="qualifications">Qualifications:</label>
          <textarea
            id="qualifications"
            required
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            placeholder="Qualifications"
            className="form-outline textarea"
          ></textarea>
        </div>
        <div className="form-group">
          <label className='f-label' htmlFor="yearsOfExperience">Years of Experience:</label>
          <input
            type="number"
            id="yearsOfExperience"
            required
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            placeholder="Years of Experience"
            className="form-outline"
          />
        </div>
        <div className="form-group">
          <label className='f-label' htmlFor="workExperience">Work Experience:</label>
          <textarea
            id="workExperience"
            required
            value={workExperience}
            onChange={(e) => setWorkExperience(e.target.value)}
            placeholder="Work Experience"
            className="form-outline textarea"
          ></textarea>
        </div>
        <div className="form-group">
          <label className='f-label' htmlFor="location">Address:</label>
          <input
            type="text"
            id="location"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Address"
            className="form-outline"
          />
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
          <label className='f-label' htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="form-outline"
          />
        </div>
        <div className="form-group">
          <label className='f-label' htmlFor="mobNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobNumber"
            required
            value={mobNumber}
            onChange={(e) => setMobNumber(e.target.value)}
            placeholder="Mobile Number"
            className="form-outline"
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn-primary">
            Update
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSpecialist;