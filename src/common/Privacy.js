import React from "react";
import Card from "../components/Card";
import Footer from "../layout/pages/Footer";
import Header from "../layout/users/Header";


const Privacy = () => {
    const Title = "Privacy Policy"
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

export default Privacy;