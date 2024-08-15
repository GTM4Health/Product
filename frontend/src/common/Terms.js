import React from "react";
import Card from "../components/Card";
import cardsData from "../assets/Features.json";
import Footer from "../layout/pages/Footer";
import Header from "../layout/users/Header";


const Terms = () => {
    const Title = "Terms of Use"
    const Features = ["feature one","feature two","feature three","feature four","feature five","feature six",]
  return (
    <div className="content page-view">
      <Header />
      <div className="card-container">
        <Card title = {Title} features = {Features} />
      </div>
      <Footer />
    </div>
  );
};

export default Terms;