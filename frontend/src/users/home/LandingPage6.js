import React, { useState, useEffect } from "react";
import Footer from "../../layout/pages/Footer";
import Header from "../../layout/users/Header";
// import Creative from "../../images/Creative.png";
// import Banner from "../../images/Banner.png";
// import Cases from "../../images/Cases.png";
// import "./Carousel.css"; // CSS code will be provided below
import Cases from "../../images/Cases.png";
import Creative from "../../images/2025_Jun21_Banner1.png";
import Banner from "../../images/2025_Jun21_Banner2.png";
import "./Carousel.css"; // CSS code will be provided below

const images = [Creative, Banner ];

// const images = [Creative, Banner, Cases];

const LandingPage6 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="page-view">
      <Header />
      <div className="gtm-carousel-container">
        <div className="gtm-carousel">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`slide-${index}`}
              className={`gtm-carousel-img ${
                index === currentIndex ? "active" : ""
              }`}
            />
          ))}
          <button className="gtm-carousel-btn prev" onClick={goToPrev}>
            &#10094;
          </button>
          <button className="gtm-carousel-btn next" onClick={goToNext}>
            &#10095;
          </button>
          <div className="gtm-carousel-indicators">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default LandingPage6;
