import React from "react";
import Footer from "../../layout/pages/Footer"
import AdminMenuBar from "../../layout/admin/AdminMenubar";
import useAuth from "../../hooks/useAuth";
import AdminHeader from "../../layout/admin/AdminHeader";
import Card from "../../components/Card";

const AdminFeatures = () => {
  const isAuthenticated = useAuth();
  const Title = "Admin-Features"
  const Features = ["feature one","feature two","feature three","feature four","feature five","feature six",]

  if (!isAuthenticated) {
    // Optional: Show a loading state or return null while checking authentication
    return null;
  }

  return (
    <div className="page-view">
    <AdminHeader />
    <div className="d-content">
      <div className="dashboard">
        <AdminMenuBar />
        <div className="dashboard-content">
          <h1>Features</h1>
          <Card title = {Title} features = {Features} />
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default AdminFeatures;
