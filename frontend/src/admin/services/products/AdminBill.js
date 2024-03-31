import React, { useState } from 'react';
import axios from 'axios';
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";

const Bill = () => {
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [productName, setProductName] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState('');
  const [igst, setIGST] = useState('');
  const [totalWithGST, setTotalWithGST] = useState('');
  const [finalTotal, setFinalTotal] = useState('');
  const [billStatus, setBillStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Billings`, {
        date,
        customerName,
        address,
        productName,
        unitCost,
        quantity,
        total,
        igst,
        totalWithGST,
        finalTotal
      });
      setDate('');
      setCustomerName('');
      setAddress('');
      setProductName('');
      setUnitCost('');
      setQuantity('');
      setTotal('');
      setIGST('');
      setTotalWithGST('');
      setFinalTotal('');
      setBillStatus('success');

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setBillStatus(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      console.log('Error response:', error.response);
      setBillStatus('failure');
      // show an error message or perform any other error handling
    }
  };

  const renderBillStatusMessage = () => {
    if (billStatus === 'success') {
      return <div className="popup success">Bill submitted successfully!</div>;
    } else if (billStatus === 'failure') {
      const errorMessage = 'Failed to submit bill. Please try again.';
      return (
        <div className="popup failure">
          {errorMessage}
          <br />
          <button onClick={() => setBillStatus(null)}>Try Again</button>
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
            <h1>Create Bill</h1>
            {renderBillStatusMessage()}
            <form onSubmit={handleSubmit} className="hospital-f">
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerName">Customer Name:</label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Customer Name"
                  className="form-outline"
                />
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
                <label htmlFor="unitCost">Unit Cost:</label>
                <input
                  type="number"
                  id="unitCost"
                  value={unitCost}
                  onChange={(e) => setUnitCost(parseFloat(e.target.value))}
                  placeholder="Unit Cost"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="total">Total:</label>
                <input
                  type="number"
                  id="total"
                  value={total}
                  onChange={(e) => setTotal(parseFloat(e.target.value))}
                  placeholder="Total"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="igst">IGST:</label>
                <input
                  type="number"
                  id="igst"
                  value={igst}
                  onChange={(e) => setIGST(parseFloat(e.target.value))}
                  placeholder="IGST"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="totalWithGST">Total with GST:</label>
                <input
                  type="number"
                  id="totalWithGST"
                  value={totalWithGST}
                  onChange={(e) => setTotalWithGST(parseFloat(e.target.value))}
                  placeholder="Total with GST"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="finalTotal">Final Total:</label>
                <input
                  type="number"
                  id="finalTotal"
                  value={finalTotal}
                  onChange={(e) => setFinalTotalparseFloat(e.target.value)}
                  placeholder="Final Total"
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
    </div>
  );
};

export default Bill;
