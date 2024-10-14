import React from 'react';
import Logo from '../../components/Logo';
import { Container, Row, Col } from 'react-bootstrap';
import imgP from "../../images/newlogo.png";
import PrivacyPDF from "../../assets/GTMScale_Privacy_Policy.pdf";
import TnC from "../../assets/GTMScale_Terms_&_Conditions.pdf";

const FooterR = () => {
    return (
        <footer className="footer bg-dark text-light mt-auto">
            <Container fluid>
                <Row>
                    <Col xs={12} md={6}>
                        <div className="left-content">
                            <div className="image">
                                <Logo />
                            </div>
                            <div className="footer-text">
                                <h1>&copy; 2024 GTM4Health</h1>
                                <h3>V1.5.4</h3>
                            </div>
                            <div className="social-icons">
                                <a href="https://www.facebook.com/gtm4health" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook fa-lg social-icons-col"></i>
                                </a>
                                <a href="https://www.instagram.com/gtm4health" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram fa-lg social-icons-col"></i>
                                </a>
                                <a href="https://www.linkedin.com/company/gtm4health" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin fa-lg social-icons-col"></i>
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={6} className="text-md-end">
                        <div className="right-content">
                            <div className="footer-text">
                                <h2>About</h2>
                            </div>
                            <div className="footer-text">
                                <h2><a href={PrivacyPDF} className="footer-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a></h2> 
                            </div>
                            <div className="footer-text">
                                <h2><a href={TnC} className="footer-link" target="_blank" rel="noopener noreferrer">Terms and Conditions</a></h2> 
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default FooterR;
