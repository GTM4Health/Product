import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Header2 from "../../layout/users/Header2";
import MenuBar from "../../layout/users/MenuBar";
import Footer from "../../layout/pages/Footer";
import Products from './../../admin/services/products/AdminProducts';

const UPartners = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const [partner, setPartner] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (!user.gtmPrivileges) {
        navigate("/dashboard/Subscription");
      } else {
        fetchPartner();
      }
    }
  }, [isAuthenticated, user, id, navigate]);

  const fetchPartner = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/Dealers/get/${id}`
      );
      setPartner(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching partner data", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!partner) {
    return <div>Partner Not Found</div>;
  }

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="centre-details-container">
            <div className="centre-header">
              <h1 className="centre-name">{partner.name}</h1>
              {/* <h3 className="normal centre-insights-item">{partner.role}</h3> */}
              <h3 className="normal centre-insights-item"><strong>Address:</strong> <br/> {partner.address}</h3>
            </div>
            <div className="centre-info">
              <h2 className="centre-section-title">Dealers & Distributors Details</h2>
              <ul className="centre-info-list">
                <li className="centre-insights-item"><h3 className="normal"><strong>Contact:</strong> {partner.dealerName}</h3></li>
                 <li className="centre-info-item"><h3 className="normal"><strong>Role:</strong> {partner.role}</h3></li>
                <li className="centre-info-item"><h3 className="normal"><strong>Website:</strong> {partner.web}</h3></li>
                {/* <li className="centre-insights-item"><h3 className="normal"><strong>Address:</strong> {partner.address}</h3></li> */}
                <li className="centre-info-item"><h3 className="normal"><strong>Location:</strong> {partner.city}, {partner.state}</h3></li>
                {/* <li className="centre-info-item"><h3 className="normal"><strong>Role:</strong> {partner.role}</h3></li> */}
                <li className="centre-insights-item"><h3 className="normal"><strong>Products Managed:</strong>  <br/> {partner.products}</h3></li>
                <li className="centre-info-item"><h3 className="normal"><strong>Email:</strong> {partner.mail}</h3></li>
                <li className="centre-info-item"><h3 className="normal"><strong>Phone:</strong> {partner.phone}</h3></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UPartners;