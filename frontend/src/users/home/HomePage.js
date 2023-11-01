import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Card from "../../components/Card";
import cardsData from "../../assets/Features";
import Footer from "../../layout/pages/Footer";
import Header from "../../layout/users/Header";
import Land2 from "../../images/Land2.png";
import Intended from "../../images/Intended.png";
import Benefits from "../../images/Benefits.png";



const HomePage = () => {
  return (
    <div className="page-view">
      <div className="content page-view">
        <Header />
        <div className="card-container">
            <img src={Land2} alt="Welcome to GTMScale" className="land2" />
        </div>
        <div className="card-container">
            <img src={Intended} alt="GTMScale" className="land3" />
            <img src={Benefits} alt="GTMScale" className="land3" />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage2;

