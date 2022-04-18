import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = (props) => {
    return (
        <>
            <NavBar />
            <div style={{marginTop: 75}}/>
            <Container className="w-50" style={{minWidth: 400}}>
                <Col className="justify-content-md-center">
                    <Outlet/>
                </Col>
            </Container>
        </>
    );
}

export default Layout;