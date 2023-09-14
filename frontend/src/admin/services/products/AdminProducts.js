import React, { useState } from 'react';
import axios from 'axios';
import Footer from "../../../layout/pages/Footer"
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";
import { stateOptions, getCityOptionsByState } from '../../../assets/cityOptions';

const Products = () => {
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [description, setDescription] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [qtySets, setQtySets] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const[GST,setGST] = useState('');
  const [productStatus, setProductStatus] = useState(null);

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Products`, {
        companyName,
        website,
        address,
        productName,
        productCode,
        description,
        hsnCode,
        qtySets,
        unitPrice,
        totalPrice,
        state,
        city,
        GST
      });
      setCompanyName('');
      setWebsite('');
      setAddress('');
      setProductName('');
      setProductCode('');
      setDescription('');
      setHsnCode('');
      setQtySets('');
      setUnitPrice('');
      setTotalPrice('');
      setState('');
      setCity('');
      setGST('');
      setProductStatus('success');

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setProductStatus(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      console.log('Error response:', error.response);
      setProductStatus('failure');
      // show an error message or perform any other error handling
    }
  };

  const renderProductStatusMessage = () => {
    if (productStatus === 'success') {
      return <div className="popup success">Product successfully added!</div>;
    } else if (productStatus === 'failure') {
      const errorMessage = 'Failed to add product. Please try again.';
      return (
        <div className="popup failure">
          {errorMessage}
          <br />
          <button onClick={() => setProductStatus(null)}>Try Again</button>
        </div>
      );
    }
    return null;
  };

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

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="hosp-content">
            <h1>Add Products</h1>
            {renderProductStatusMessage()}
            <form onSubmit={handleSubmit} className="hospital-f">
            
              <div className="form-group">
                <label htmlFor="companyName">Company Name*:</label>
                <input
                  type="text"
                  id="companyName"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company Name"
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
              <div className='filter-container'>
              <div className="form-group">
                <label className='f-label' htmlFor="state">State*:</label>
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
                <label className='f-label' htmlFor="city">City*:</label>
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
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="form-outline textarea addrx"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="productName">Product Name:</label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Product Name"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="productCode">Product Code:</label>
                <input
                  type="text"
                  id="productCode"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  placeholder="Product Code"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="form-outline textarea"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="hsnCode">HSN Code:</label>
                <input
                  type="text"
                  id="hsnCode"
                  value={hsnCode}
                  onChange={(e) => setHsnCode(e.target.value)}
                  placeholder="HSN Code"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="qtySets">Qty/Sets:</label>
                <input
                  type="text"
                  id="qtySets"
                  value={qtySets}
                  onChange={(e) => setQtySets(e.target.value)}
                  placeholder="Qty/Sets"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="unitPrice">Unit Price:</label>
                <input
                  type="text"
                  id="unitPrice"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  placeholder="Unit Price"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="totalPrice">Total Price:</label>
                <input
                  type="text"
                  id="totalPrice"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                  placeholder="Total Price"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="GST">GST :</label>
                <input
                  type="text"
                  id="GST"
                  value={GST}
                  onChange={(e) => setGST(e.target.value)}
                  placeholder="GST"
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

export default Products;
