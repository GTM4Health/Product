//User dashboard page

import React, { useState, useEffect } from "react";
import Footer from "../../layout/pages/Footer";
import Header2 from "../../layout/users/Header2";

import useAuth from "../../hooks/useAuth";
import MenuBar from "../../layout/users/MenuBar";

const Dashboard = () => {
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!isAuthenticated) {
    // Optional: Show a loading state or return null while checking authentication
    return null;
  }

  return (
    <div>
      <Header2 user={user}/>
      <div className="d-content page-view">
        <div className="dashboard">
          <MenuBar />
          <div className="dashboard-content">
            <h1>Welcome to the GTM4Health, {user ? user.name : 'User'}!</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
