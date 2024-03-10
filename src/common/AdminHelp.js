import React, { useState, useEffect } from "react"
import Card from "../components/Card";
import Footer from "../layout/pages/Footer";
import AdminHeader from "../layout/admin/AdminHeader";
import AdminMenuBar from "../layout/admin/AdminMenubar";
import useAuth from "../hooks/useAuth";


const AdminHelpPage = () => {
    const Title = "Admin Help";
    const Features = ["feature one","feature two","feature three","feature four","feature five","feature six",];
    const isAuthenticated = useAuth();


    if (!isAuthenticated) {
      // Optional: Show a loading state or return null while checking authentication
      return null;
    }
  return (
    <div className="content page-view">
      <AdminHeader />
      <AdminMenuBar />
      <div className="card-container">
        <Card title = {Title} features = {Features} />
      </div>
      <Footer />
    </div>
  );
};

export default AdminHelpPage;