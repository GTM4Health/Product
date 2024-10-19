import React, { useState, useEffect } from "react";
import axios from "axios";
import { stateOptions, getCityOptionsByState } from "../../../assets/cityOptions";
import specialitiesData from "../../../assets/specialities.json"; // Import the specialities data
import Categories from "../../../assets/healthcareCategories.json";

const EditHospitalForm = ({ hospital, onUpdate, onCancel }) => {
  const [name, setName] = useState(hospital.name);
  const [details, setDetails] = useState(hospital.details);
  const [city, setCity] = useState(hospital.city);
  const [docName, setDocName] = useState(hospital.docName);
  const [docSpez, setDocSpez] = useState(hospital.docSpez);
  const [mail, setMail] = useState(hospital.mail);
  const [phone, setPhone] = useState(hospital.phone);
  const [infraSer, setInfraSer] = useState(hospital.infraSer);
  const [state, setState] = useState(hospital.state);
  const [speciality, setSpeciality] = useState(hospital.speciality);
  const [lastConnected, setLastConnected] = useState(hospital.lastConnected);
  const [address, setAddress] = useState(hospital.address);
  const [pincode, setPincode] = useState(hospital.pincode);
  const [category, setCategory] = useState(hospital.category);
  const [addedBy, setAddedBy] = useState(hospital.addedBy || "Admin");
  const [beds, setBeds] = useState(hospital.beds || "");

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity("");
  };

  useEffect(() => {
    setName(hospital.name);
    setDetails(hospital.details || "");
    setCity(hospital.city);
    setDocName(hospital.docName);
    setDocSpez(hospital.docSpez);
    setMail(hospital.mail);
    setPhone(hospital.phone);
    setInfraSer(hospital.infraSer);
    setState(hospital.state);
    setSpeciality(hospital.speciality || ""); // Set initial value if not present
    setLastConnected(hospital.lastConnected || ""); // Set initial value if not present
    setPincode(hospital.pincode || "");
    setAddress(hospital.address || "");
    setCategory(hospital.category || "");
    setAddedBy(hospital.addedBy || "Admin");
    setBeds(hospital.beds || "");
  }, [hospital]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      details,
      city,
      docName,
      docSpez,
      mail,
      phone,
      infraSer,
      state,
      speciality,
      lastConnected,
      pincode,
      address,
      beds,
      category
    };
    onUpdate(hospital._id, updatedData);
  };

  const renderCityOptions = () => {
    const cities = getCityOptionsByState(state);
    if (!state)
      return <option disabled value=""> State is Mandatory field *</option>;
    return cities.map((city) => (
      <option key={city.value} value={city.value}>
        {city.label}
      </option>
    ));
  };

  const renderStateOptions = () => {
    return stateOptions.map((state) => (
      <option key={state.value} value={state.value}>
        {state.label}
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
    <div className="edit-form">
      <h2>Edit Hospital</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
                <label htmlFor="det">Centre Details* :</label>
                <input
                  type="text"
                  id="det"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Healthcare Centre Details"
                  className="form-outline"
                />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <select id="state" value={state} onChange={handleStateChange}>
            <option disabled value="">
              Select State
            </option>
            {renderStateOptions()}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
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
            <label >Pincode:</label>
            <input
              type="integer"
              id="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Pincode"
              className="form-outline f-select pincode"
            />
        </div>
        <div className="form-group">
          <label htmlFor="infraServ">Infrastructure & Services</label>
          <textarea
            id="infraServ"
            value={infraSer}
            onChange={(e) => setInfraSer(e.target.value)}
            placeholder="Infrastructure & Services"
            className="textarea"
          ></textarea>
        </div>
        <div className="form-group">
                <label htmlFor="det"># of Beds :</label>
                <input
                  type="text"
                  id="det"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  placeholder="Beds"
                  className="form-outline"
                />
        </div>
        <div className="form-group">
          <label htmlFor="docName">Contact Name</label>
          <input
            type="text"
            id="docName"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="docSpez">Role</label>
          <input
            type="text"
            id="docSpez"
            value={docSpez}
            onChange={(e) => setDocSpez(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mail">Contact Email</label>
          <input
            type="email"
            id="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Contact Number</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="speciality">Speciality</label>
          <select
            id="speciality"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          >
            <option disabled value="">
              Select Speciality
            </option>
            {renderSpecialityOptions()}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="lastConnected">Last Connected</label>
          <textarea
            id="lastConnected"
            value={lastConnected}
            onChange={(e) => setLastConnected(e.target.value)}
            placeholder="Last Connected"
            className="textarea"
          ></textarea>
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

export default EditHospitalForm;
