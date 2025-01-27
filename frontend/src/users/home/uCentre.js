import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header2 from '../../layout/users/Header2';
import MenuBar from '../../layout/users/MenuBar';
import Footer from '../../layout/pages/Footer';
import useAuth from '../../hooks/useAuth';
import gtm from '../../images/newlogo.png';

const CentreDetails = () => {
  const { id } = useParams();
  const [centre, setCentre] = useState(null);
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);


  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    console.log(user)
    // if(![user.privileges.accessDashboard]){
    //   return <Subscription />;
    // }
  }, []);

  useEffect(() => {
    const fetchCentreDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal/centre/${id}`);
        setCentre(response.data);
      } catch (error) {
        console.error('Error fetching centre details:', error);
      }
    };

    fetchCentreDetails();
  }, [id]);

  if (!centre) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-view">
      <Header2 user={user}/>
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="centre-details-container">
          <div className="centre-header">
            {/* <img src={gtm} alt="GTM Logo" className="centre-logo" /> */}
            <h1 className="centre-name">{centre.name}</h1>
            {/* <hr className="divider" /> */}
            <h3>{centre.city}, {centre.state}</h3>
            <h3 className='normal'><strong>Category:</strong> {centre.category}</h3> 
          </div>
          <div className="centre-info">
            <h2 className="centre-section-title">Infrastructure and Services</h2>
            <ul className="centre-info-list">
              {/* <li className="centre-info-item"><h3 className="normal" ><strong>Category: </strong> {centre.category}</h3></li> */}
              <li className="centre-info-item"><h3 className="normal" ><strong>No of Beds: </strong> {centre.beds}</h3></li>
              <li className="centre-info-item"><h3 className="normal" ><strong>Certifications: </strong> {centre.certification}</h3></li>
            </ul>
          </div>
          <div className="centre-insights">
            <h2 className="centre-section-title">Actionable Insights</h2>
            <div className="centre-insights-item"><h4 className="normal">{centre.infraSer}</h4></div>
          </div>
          <div className="centre-contact">
            <h2 className="centre-section-title">Contact Details</h2>
            <ul className="centre-contact-list">
              <li className="centre-contact-item"><h3 className="normal"><strong>Name: </strong>{centre.docName}</h3></li>
              <li className="centre-contact-item"><h3 className="normal"><strong>Email: </strong>{centre.mail}</h3></li>
              <li className="centre-contact-item"><h3 className="normal"><strong>Phone: </strong>{centre.phone}</h3></li>
            </ul>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CentreDetails;
