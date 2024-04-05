import React from "react";
import Logo from "../../components/Logo";
import LoginButton from "../../components/Login";
import RequestDemoButton from "../../components/Demo";
import { Container, Row, Col } from 'react-bootstrap';

const Header = () => {
    return(
        <header className="toolbar bg-light">
            <Container fluid>
                <Row className="align-items-center">
                    <Col xs={4} md={2}>
                        <Logo />
                    </Col>
                    <Col xs={8} md={10} className="text-end">
                        <div className="buttons">
                            <LoginButton />
                            <RequestDemoButton />
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
