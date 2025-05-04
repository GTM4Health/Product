import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Header2 from "../../layout/users/Header2";
import MenuBar from "../../layout/users/MenuBar";
import Footer from "../../layout/pages/Footer";

const USpecialist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const [specialist, setSpecialist] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  

  useEffect(() => {
    if (isAuthenticated && user !== null) {
      fetchSpecialist();
    }
  }, [isAuthenticated, user, id]);
  

  // useEffect(() => {
  //   if (isAuthenticated && user) {
  //     // if (!user.gtmPrivileges) {
  //     //   navigate("/dashboard/Subscription");
  //     // } else {
  //       fetchSpecialist();
  //     //}
  //   }
  // }, [isAuthenticated, user, id, navigate]);

  const fetchSpecialist = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/admin/dashboard/specialist/${id}`
      );
      setSpecialist(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching specialist data", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!specialist) {
    return <div>Specialist Not Found</div>;
  }

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="centre-details-container">
            <div className="centre-header">
              <h1 className="centre-name">{specialist.doctorName}</h1>
              <h3 className="normal centre-insights-item">
                <strong>Speciality:</strong> {specialist.specialistIn}
              </h3>
              <h3 className="normal centre-insights-item">
                <strong>Experience:</strong> {specialist.yearsExperience} Years
              </h3>
              <h3 className="normal centre-insights-item">
                <strong>Qualifications:</strong> {specialist.qualifications} 
              </h3>
              <h3 className="normal centre-insights-item">
                <strong>Career:</strong><br /> {specialist.workExperience}
              </h3>
              <h3 className="normal centre-insights-item">
                <strong>Address:</strong><br /> {specialist.location}
              </h3>
            </div>
            <div className="centre-info">
              <h2 className="centre-section-title">Specialist Details</h2>
              <ul className="centre-info-list">
                <li className="centre-insights-item">
                  <h3 className="normal">
                    <strong>Mobile Number:</strong> {specialist.mobNumber}
                  </h3>
                </li>
                <li className="centre-info-item">
                  <h3 className="normal">
                    <strong>Email:</strong> {specialist.email}
                  </h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default USpecialist;
