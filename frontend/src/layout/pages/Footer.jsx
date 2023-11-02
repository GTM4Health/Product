// Footer Component 
// Just have added Versioning.
//
import React from 'react';
import Logo from '../../components/Logo';
import imgP from "../../images/newlogo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="left-content">
          <span className="footer-text">
          <div className="image">
            <img src={imgP} alt="logoH" className="logo" />
          </div>
            <h1>&copy; 2023 GTM4Health</h1>
            <h3>V1.4.4</h3>
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
            <h2>Copyright Policy</h2>
          </span>
          <span className="footer-text">
            <h2>Terms and Conditions</h2>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
