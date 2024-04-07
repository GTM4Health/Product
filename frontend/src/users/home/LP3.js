import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Card from "../../components/Card";
import cardsData from "../../assets/Features";
import Footer from "../../layout/pages/Footer";
import Header from "../../layout/users/Header";
import Land2 from "../../images/Land2.png";
import Intended from "../../images/Intended.png";
import Benefits from "../../images/Benefits.png";
import 'bootstrap/dist/css/bootstrap.min.css'; 


const LandingPage3 = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="c-page-view">
      <div className="content page-view">
        <Header />
        <div className="carousel-container c-page">
          <Carousel
            activeIndex={index}
            interval={3000}
            onSelect={handleSelect}
            prevIcon={<span className="carousel-control-prev-icon" />}
            nextIcon={<span className="carousel-control-next-icon" />}
          >
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-img"
                src={Land2}
                alt="Welcome to GTMScale"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-img"
                src={Intended}
                alt="GTMScale"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-img"
                src={Benefits}
                alt="GTMScale"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage3;
