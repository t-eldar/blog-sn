import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = (props) => {
    return (
        <>
            <NavBar />
            <div style={{marginTop: 75}}/>
            <Container>
                <Row>
                    <Col><Outlet/></Col>
                </Row>
            </Container>
        </>
    );
}

export default Layout;