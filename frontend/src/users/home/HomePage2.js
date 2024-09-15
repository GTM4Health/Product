import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Card from "../../components/Card";
import cardsData from "../../assets/Features";
import Footer from "../../layout/pages/Footer";
import NewHeader from "../../layout/users/LHeader";
import Land2 from "../../images/Land2.png";
import Intended from "../../images/Intended.png";
import Benefits from "../../images/Benefits.png";
import Stats from "../../images/stats.svg"



const HomePage2 = () => {
  return (
    <div className="page-view">
      <div className="content page-view">
        <NewHeader />
        <div className="card-container">
            <img src={Land2} alt="Welcome to GTMScale" className="land2" />
            <img src={Stats} alt="300+ HC" className="land3 bxd" />
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

export default HomePage2;

