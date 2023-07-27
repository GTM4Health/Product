import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProductForm = ({ product, onUpdate, onCancel }) => {
  const [companyName, setCompanyName] = useState(product.companyName);
  const [website, setWebsite] = useState(product.website);
  const [address, setAddress] = useState(product.address);
  const [city, setCity] = useState(product.city);
  const [state, setState] = useState(product.state);
  const [productName, setProductName] = useState(product.productName);
  const [productCode, setProductCode] = useState(product.productCode);
  const [description, setDescription] = useState(product.description);
  const [hsnCode, setHsnCode] = useState(product.hsnCode);
  const [qtySets, setQtySets] = useState(product.qtySets);
  const [unitPrice, setUnitPrice] = useState(product.unitPrice);
  const [totalPrice, setTotalPrice] = useState(product.totalPrice);
  const [GST, setGST] = useState(product.GST);

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity("");
  };

  useEffect(() => {
    setCompanyName(product.companyName);
    setWebsite(product.website);
    setAddress(product.address);
    setCity(product.city);
    setState(product.state);
    setProductName(product.productName);
    setProductCode(product.productCode);
    setDescription(product.description);
    setHsnCode(product.hsnCode);
    setQtySets(product.qtySets);
    setUnitPrice(product.unitPrice);
    setTotalPrice(product.totalPrice);
    setGST(product.GST);
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      companyName,
      website,
      address,
      city,
      state,
      productName,
      productCode,
      description,
      hsnCode,
      qtySets,
      unitPrice,
      totalPrice,
      GST,
    };
    onUpdate(product._id, updatedData);
  };

  return (
    <div className="edit-form">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Website"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productCode">Product Code</label>
          <input
            type="text"
            id="productCode"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            placeholder="Product Code"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="hsnCode">HSN Code</label>
          <input
            type="text"
            id="hsnCode"
            value={hsnCode}
            onChange={(e) => setHsnCode(e.target.value)}
            placeholder="HSN Code"
          />
        </div>
        <div className="form-group">
          <label htmlFor="qtySets">Quantity Sets</label>
          <input
            type="number"
            id="qtySets"
            value={qtySets}
            onChange={(e) => setQtySets(e.target.value)}
            placeholder="Quantity Sets"
          />
        </div>
        <div className="form-group">
          <label htmlFor="unitPrice">Unit Price</label>
          <input
            type="number"
            id="unitPrice"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            placeholder="Unit Price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalPrice">Total Price</label>
          <input
            type="number"
            id="totalPrice"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            placeholder="Total Price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="GST">GST</label>
          <input
            type="text"
            id="GST"
            value={GST}
            onChange={(e) => setGST(e.target.value)}
            placeholder="GST"
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

export default EditProductForm;
