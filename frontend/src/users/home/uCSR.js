import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Header2 from "../../layout/users/Header2";
import MenuBar from "../../layout/users/MenuBar";
import Footer from "../../layout/pages/Footer";

const CSRPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const [csr, setCsr] = useState(null);
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
      if (!user.csrPrivileges) {
        navigate("/dashboard/Subscription");
      } else {
        fetchCSR();
      }
    }
  }, [isAuthenticated, user, id, navigate]);

  const fetchCSR = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/CSR/${id}`
      );
      setCsr(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching CSR data", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!csr) {
    return <div>CSR Not Found</div>;
  }

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="centre-details-container">
            <div className="centre-header">
              <h1 className="centre-name">{csr.csrName}</h1>
            </div>
            <div className="centre-info">
              <h2 className="centre-section-title">CSR/Foundation Details</h2>
              <ul className="centre-info-list">
                <li className="centre-info-item"><h3 className="normal"><strong>Website:</strong> {csr.website}</h3></li>
                <li className="centre-info-item"><h3 className="normal"><strong>Domain:</strong> {csr.domain}</h3></li>
                <li className="centre-info-item"><h3 className="normal"><strong>Description:</strong> {csr.ser}</h3></li>
                {/* <li className="centre-info-item"><h3 className="normal"><strong>Contact:</strong>{csr.ser}</h3></li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CSRPage;