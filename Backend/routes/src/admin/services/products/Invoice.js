import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
const InvoicePDF = ({ data }) => {
  const { date, customerName, address, productName, unitCost, quantity, total, igst, finalTotal } = data;

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
          <Text style={styles.bodyItem}>IGST: {igst}</Text>
          <Text style={styles.bodyItem}>Total with GST: {total * 1.18}</Text>
          <Text style={styles.bodyItem}>Final Total: {finalTotal}</Text>
        </View>
        <View style={styles.footer}>
          <Text>Submit Button - Submitted successfully Msg</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
