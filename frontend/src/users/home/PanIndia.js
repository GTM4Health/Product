import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../layout/pages/Footer';
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import Header2 from './../../layout/users/Header2';
import MenuBar from '../../layout/users/MenuBar';

const PanIndiaDash = () => {
  const [stateCenters, setStateCenters] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [user, setUser] = useState(null);
  const [cities, setCities] = useState([]);
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchStateCenters();
  // }, []);

  useEffect(() => {
    if (user && user.dashPriveleges  && isAuthenticated) {
      fetchStateCenters();
    } else if (user && !(user.dashPriveleges ) && isAuthenticated) {
      navigate("/dashboard/Subscription");
    }
  }, [isAuthenticated]);

  const fetchStateCenters = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal/state-centers`);
      const sortedStateCenters = response.data.sort((a, b) => b.totalCenters - a.totalCenters);
      setStateCenters(sortedStateCenters);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCities = async (state) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/hospital-portal/state-centers/${state}/cities`);
      setCities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []); 

  const handleStateClick = (state) => {
    setSelectedState(state);
    fetchCities(state);
  };

  return (
    <div className="page-view">
      <Header2 user={user}/>
      <div className="d-content">
        <div className="dashboard">
          <MenuBar />
          <div className="page-title">
            <h1 className="page-title-child hdblue-tag">Pan India Dashboard Analytics</h1>
          </div>
          <div className="table-content">
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>States & Union Territories</th>
                  <th>Total # of Centres</th>
                </tr>
              </thead>
              <tbody>
                {stateCenters.map((entry, index) => (
                  <tr key={entry.id} onClick={() => handleStateClick(entry.state)}>
                    <td>{index + 1}</td>
                    <td>{entry.state}</td>
                    <td>{entry.totalCenters}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedState && (
              <div>
                {/* <h2>{selectedState}</h2> */}
                <table>
                  <thead>
                    <tr>
                      {/*<th>#</th>
                      <th>City</th>
                      <th>Total # of Centres</th>
                      */}
                    </tr> 
                  </thead>
                  <tbody>
                    {cities.map((city, index) => (
                      <tr key={index}>
                      {/*
                         <td>{index + 1}</td>
                        <td>{city._id}</td>
                        <td>{city.totalCenters}</td> */}
                        {console.log(index + 1,city._id,city.totalCenters)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PanIndiaDash;
