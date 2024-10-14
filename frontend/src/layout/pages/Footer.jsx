// Footer Component 
// Just have added Versioning.
//
import React from 'react';
import Logo from '../../components/Logo';
import imgP from "../../images/newlogo.png";
import PrivacyPDF from "../../assets/GTMScale_Privacy_Policy.pdf"
import TnC from "../../assets/GTMScale_Terms_&_Conditions.pdf"
import AdminDashHomeButton from './../../components/AdminDashHome';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="left-content">
          <span className="footer-text">
          <div className="image">
            <img src={imgP} alt="logoH" className="logo" />
          </div>
            <h1>&copy; 2024 GTM4Health</h1>
            <h3>V1.5.9</h3>
          </span>
          <div className="social-icons">
             <a href="https://www.facebook.com/gtm4health" target="_blank">
                 <i className="fab fa-facebook fa-lg social-icons-col"></i>
             </a>
             <a href="https://www.instagram.com/gtm4health" target="_blank">
                 <i className="fab fa-instagram fa-lg social-icons-col"></i>
             </a>
             <a href="https://www.linkedin.com/company/gtm4health" target="_blank">
                 <i className="fab fa-linkedin fa-lg social-icons-col"></i>
             </a>
         </div>

         <br />
        </div>
        <div className="right-content">
          <span className="footer-text">
            <h2>About</h2>
          </span>
          <span className="footer-text">
            <h2><a href={PrivacyPDF} className="footer-link" target="_blank">Privacy Policy</a></h2> 
          </span>
          <span className="footer-text">
            <h2><a href={TnC} className="footer-link" target="_blank">Terms and Conditions</a></h2> 
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
