import React, { useState } from "react";
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';
// import blobStream from 'blob-stream';
import AdminHeader from '../../layout/admin/AdminHeader';
import AdminMenuBar from '../../layout/admin/AdminMenubar';
import Footer from '../../layout/pages/Footer';

const BillingForm = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);

  const addItem = () => {
    setItems([...items, { name: itemName, price: itemPrice }]);
    setItemName("");
    setItemPrice(0);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const generatePDF = () => {
    const MyDocument = (
      <Document>
        <Page>
          <Text>Bill Details:</Text>
          {items.map((item, index) => (
            <Text key={index}>{`${item.name}: $${item.price}`}</Text>
          ))}
          <Text>Total: ${calculateTotal()}</Text>
        </Page>
      </Document>
    );

    return (
      <PDFDownloadLink document={MyDocument} fileName="bill.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Generating PDF..." : "Download PDF"
        }
      </PDFDownloadLink>
    );
  };

  const mailPDF = async () => {
    try {
      // Generate the PDF document
      const MyDocument = (
        <Document>
          <Page>
            <Text>Bill Details:</Text>
            {items.map((item, index) => (
              <Text key={index}>{`${item.name}: $${item.price}`}</Text>
            ))}
            <Text>Total: ${calculateTotal()}</Text>
          </Page>
        </Document>
      );
  
      // Create the PDF blob
      const blob = await MyDocument.toBlob();
  
      // Convert the blob to a data URL
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const dataURL = reader.result;
  
        // Construct the mailto link with the email body containing the data URL of the PDF
        const email = 'recipient@example.com';
        const subject = 'Billing PDF';
        const body = `Please find the attached PDF for billing details. \n\n ${dataURL}`;
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Redirect the user to the mail client with the pre-filled email details
        window.location.href = mailtoLink;
      };
    } catch (error) {
      console.error('Error generating or encoding PDF:', error);
    }
  };
  
  

  return (
    <div className="page-view">
      <AdminHeader />
      <div className="d-content">
        <div className="dashboard">
          <AdminMenuBar />
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag">Billing Form</h1>
          </div>
          <div className="content">
            <input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(parseFloat(e.target.value))}
            />
            <button onClick={addItem}>Add Item</button>
            <div>
              {items.map((item, index) => (
                <div key={index}>
                  <span>{item.name}: ${item.price}</span>
                </div>
              ))}
            </div>
            <div>Total: ${calculateTotal()}</div>
            <div className="buttons-container">
              {generatePDF()}
              <button onClick={mailPDF}>Email PDF</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BillingForm;
