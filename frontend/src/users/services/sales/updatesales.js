import React, { useState, useEffect } from "react";
import finalStatusOptions from "../../../assets/SalesStatus.json"

const EditSalesForm = ({ sale, onUpdate, onCancel }) => {
  const [leadName, setLeadName] = useState(sale.leadName);
  const [healthcareCentreName, setHealthcareCentreName] = useState(sale.healthcareCentreName);
  const [email, setEmail] = useState(sale.email);
  const [mobileNo, setMobileNo] = useState(sale.mobileNo);
  const [status, setStatus] = useState(sale.status);
  const [reportDate, setReportDate] = useState(sale.reportDate);
  const [finalStatus, setFinalStatus] = useState(sale.finalStatus);
  const [reportsBetweenDates, setReportsBetweenDates] = useState(sale.reportsBetweenDates);
  const [revenue, setRevenue] = useState(sale.revenue || "");
  const [product, setProduct] = useState(sale.product || "");
  const [healthcareCentreDetails, setHealthcareCentreDetails] = useState(sale.healthcareCentreDetails || '');


  useEffect(() => {
    setLeadName(sale.leadName);
    setHealthcareCentreName(sale.healthcareCentreName);
    setEmail(sale.email);
    setMobileNo(sale.mobileNo);
    setStatus(sale.status);
    setReportDate(sale.reportDate);
    setFinalStatus(sale.finalStatus);
    setReportsBetweenDates(sale.reportsBetweenDates);
    setRevenue(sale.revenue || "");
    setProduct(sale.product || "");
    setHealthcareCentreDetails(sale.healthcareCentreDetails || '');
  }, [sale]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedData = {
      leadName,
      healthcareCentreName,
      healthcareCentreDetails,
      email,
      mobileNo,
      status,
      reportDate,
      finalStatus,
      reportsBetweenDates,
      revenue,
      product,
    };
    onUpdate(sale._id, updatedData);
  };

  return (
    <div className="edit-form">
      <h2>Edit Sales</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="leadName">Lead Name</label>
          <input
            type="text"
            id="leadName"
            value={leadName}
            onChange={(e) => setLeadName(e.target.value)}
            placeholder="Lead Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="healthcareCentreName">Healthcare Centre Name</label>
          <input
            type="text"
            id="healthcareCentreName"
            value={healthcareCentreName}
            onChange={(e) => setHealthcareCentreName(e.target.value)}
            placeholder="Healthcare Centre Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="healthcareCentreDetails">Healthcare Centre Details</label>
          <textarea
            id="healthcareCentreDetails"
            className="textarea"
            value={healthcareCentreDetails}
            onChange={(e) => setHealthcareCentreDetails(e.target.value)}
            placeholder="Healthcare Centre Details"
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile No</label>
          <input
            type="text"
            id="mobileNo"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            placeholder="Mobile No"
          />
        </div> */}
        {/* <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Status"
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="reportDate">Report Date</label>
          <input
            type="date"
            id="reportDate"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
            placeholder="Report Date"
          />
        </div>
        <div className="form-group">
          <label htmlFor="finalStatus">Status</label>
          <select
                  id="finalStatus"
                  value={finalStatus}
                  onChange={(e) => setFinalStatus(e.target.value)}
                >
                 {finalStatusOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
        </div>
        <div className="form-group">
                <label htmlFor="revenue">Revenue Potential:</label>
                <input
                  type="number"
                  id="revenue"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="Enter Revenue Potential"
                />
        </div>
        <div className="form-group">
                <label htmlFor="csrName">Product :</label>
                <input
                  type="text"
                  id="csrName"
                  required
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Product Name"
                  className="form-outline"
                />
        </div>
        <div className="form-group">
          <label htmlFor="reportsBetweenDates">Progress</label>
          <textarea
            type="text"
            id="reportsBetweenDates"
            value={reportsBetweenDates}
            onChange={(e) => setReportsBetweenDates(e.target.value)}
            placeholder="Progress .."
            className="textarea"
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

export default EditSalesForm;
