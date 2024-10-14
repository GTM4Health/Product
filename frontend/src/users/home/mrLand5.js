import React from "react";
import Card from "../../components/Card";
import cardsData from "../../assets/Features";
import Footer from "../../layout/pages/Footer";
import Header from "../../layout/users/Header";
import Land2 from "../../images/Land2.png";
import Intended from "../../images/Intended.png";
import Benefits from "../../images/Benefits.png";
// import 'bootstrap/dist/css/bootstrap.min.css'; 

const LandingPage5 = () => {
  return (
    <div className="c-page-view">
      <div className="content page-view">
        <Header />
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-12 col-md-4 mb-3">
              <img
                className="d-block img-fluid"
                src={Land2}
                alt="Welcome to GTMScale"
              />
            </div>
            <div className="col-sm-12 col-md-4 mb-3">
              <img
                className="d-block img-fluid"
                src={Intended}
                alt="GTMScale"
              />
            </div>
            <div className="col-sm-12 col-md-4 mb-3">
              <img
                className="d-block img-fluid"
                src={Benefits}
                alt="GTMScale"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage5;