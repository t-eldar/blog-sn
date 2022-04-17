import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import Logo from "../test-logo.svg";

const NavBar = () => {

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand >
                <img
                    className="m-2"
                    src={Logo}
                    width="30"
                    height="30"
                    alt="React Bootstrap logo"
                />
                BlogSN
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Главная</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;