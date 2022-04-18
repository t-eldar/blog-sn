import React, { useState } from "react";
import { Nav, Navbar, Container, Button, Modal } from "react-bootstrap";
import Logo from "../test-logo.svg";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

const NavBar = () => {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleOpen = () => setShowModal(true);

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Вход в учетную запись</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm />
                </Modal.Body>
            </Modal>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            className="m-2"
                            src={Logo}
                            width="30"
                            height="30"
                            alt="React Bootstrap logo"
                        />
                        BlogSN
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Главная</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button variant="dark" onClick={handleOpen}>
                                Войти
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;