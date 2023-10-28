// File contains all the menu items of Landing Page (like Users, Benefits lists).
import React from "react";
import Card from "../../components/Card";
import cardsData from "../../assets/Features";
import Footer from "../../layout/pages/Footer";
import Header from "../../layout/users/Header";


const Content = () => {
  return (
    <div className="page-view">
      <div className="content page-view">
        <Header />
        <div className="card-container">
          {cardsData.map((card, index) => (
            <Card key={index} title={card.title} features={card.features} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Content;
