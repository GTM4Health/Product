import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header2 from '../../layout/users/Header2';
import MenuBar from '../../layout/users/MenuBar';
import Footer from '../../layout/pages/Footer';
import Table from '../../components/table';
import useAuth from '../../hooks/useAuth';

const UserCityDetails = () => {
  const { city } = useParams();
  const [hospitals, setHospitals] = useState([]);
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(isAuthenticated)
        fetchHospitals();
  }, [isAuthenticated]);

  
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

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal/city/${city}`);
      setHospitals(response.data.hospitals);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-view">
      <Header2 user={user} />
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag">{city} Healthcare Centres</h1>
          </div>
          <div className="table-content">
            <Table data={hospitals} /> {/* Render the table component */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserCityDetails;
