import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminMenuBar from "../../../layout/admin/AdminMenubar";
import useAuth from "../../../hooks/useAuth";
import AdminHeader from "../../../layout/admin/AdminHeader";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'; 
import Footer from '../../../layout/pages/Footer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerItem: {
    fontSize: 12,
  },
  bodyItem: {
    fontSize: 12,
    marginBottom: 5,
  },
  footer: {
    marginTop: 10,
  },
});

// Invoice PDF component
const MyDocument = ({ data }) => {
  const { date, customerName, address, productName, unitCost, quantity, total, igst, cgst, sgst, totalWithGST, finalTotal } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Billing</Text>
          <View style={styles.header}>
            <Text style={styles.headerItem}>Date: {date}</Text>
            <Text style={styles.headerItem}>Customer Name: {customerName}</Text>
          </View>
          <Text style={styles.headerItem}>Address: {address}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Body</Text>
          <Text style={styles.bodyItem}>Product Name: {productName}</Text>
          <Text style={styles.bodyItem}>Unit Cost: {unitCost}</Text>
          <Text style={styles.bodyItem}>Quantity: {quantity}</Text>
          <Text style={styles.bodyItem}>Total: {total}</Text>
          <Text style={styles.bodyItem}>CGST: {cgst}</Text>
          <Text style={styles.bodyItem}>SGST: {sgst}</Text>
          <Text style={styles.bodyItem}>IGST: {igst}</Text>
          <Text style={styles.bodyItem}>Final Total: {totalWithGST}</Text>
          {/* <Text style={styles.bodyItem}>Final Total: {finalTotal}</Text> */}
        </View>
        <View style={styles.footer}>
          <Text>Invoice billed successfully</Text>
        </View>
      </Page>
    </Document>
  );
};

const Bill = () => {
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [productName, setProductName] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [igst, setIGST] = useState('');
  const [cgst, setCGST] = useState('');
  const [sgst, setSGST] = useState('');
  const [total, setTotal] = useState('');
  const [totalWithGST, setTotalWithGST] = useState('');
  const [finalTotal, setFinalTotal] = useState('');
  const [billStatus, setBillStatus] = useState(null);

  useEffect(() => {
    const calculateTotal = () => {
      const calculatedTotal = parseFloat(unitCost) * parseFloat(quantity);
      setTotal(calculatedTotal || '');
    };

    const calculateTotalWithGST = () => {
      let totalGST = 0;
        if (igst)
          totalGST += parseFloat(igst);
        if (cgst) 
          totalGST += parseFloat(cgst);
        if (sgst) 
          totalGST += parseFloat(sgst);
      const calculatedTotalWithGST = parseFloat(total) + (parseFloat(total) * totalGST / 100);
      setTotalWithGST(calculatedTotalWithGST || '');
      setFinalTotal(calculatedTotalWithGST || '');
    };

    // const calculateFinalTotal = () => {
    //   setFinalTotal(parseFloat(totalWithGST) || '');
    // };

    calculateTotal();
    calculateTotalWithGST();
    // calculateFinalTotal();
  }, [unitCost, quantity, igst, cgst, sgst]);

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
        cgst,
        sgst,
        totalWithGST,
        finalTotal
      });
      setDate('');
      setCustomerName('');
      setAddress('');
      setProductName('');
      setUnitCost('');
      setQuantity('');
      setIGST('');
      setCGST('');
      setSGST('');
      setTotal('');
      setTotalWithGST('');
      setFinalTotal('');
      setBillStatus('success');

      setTimeout(() => {
        setBillStatus(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      console.log('Error response:', error.response);
      setBillStatus('failure');
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
                  readOnly
                  placeholder="Total"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cgst">CGST:</label>
                <input
                  type="number"
                  id="cgst"
                  value={cgst}
                  onChange={(e) => setCGST(parseFloat(e.target.value))}
                  placeholder="CGST"
                  className="form-outline"
                />
              </div>
              <div className="form-group">
                <label htmlFor="sgst">SGST:</label>
                <input
                  type="number"
                  id="sgst"
                  value={sgst}
                  onChange={(e) => setSGST(parseFloat(e.target.value))}
                  placeholder="SGST"
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
                <label htmlFor="totalWithGST">Final Total:</label>
                <input
                  type="number"
                  id="totalWithGST"
                  value={totalWithGST}
                  readOnly
                  placeholder="Total with GST"
                  className="form-outline"
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="finalTotal">Final Total:</label>
                <input
                  type="number"
                  id="finalTotal"
                  value={finalTotal}
                  readOnly
                  placeholder="Final Total"
                  className="form-outline"
                />
              </div> */}
              <PDFDownloadLink
                document={<MyDocument data={{ date, customerName, address, productName, unitCost, quantity, total, igst, cgst, sgst, totalWithGST, finalTotal }} />}
                fileName="bill.pdf"
              >
                {({ blob, url, loading, error }) => {
                  if (loading) {
                    return 'Loading document...';
                  }
                  if (error) {
                    return 'Error generating PDF';
                  }
                  return 'Download PDF';
                }}
              </PDFDownloadLink>
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

export default Bill;
