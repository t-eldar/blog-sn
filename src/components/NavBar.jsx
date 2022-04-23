import React, { useState } from "react";
import { Nav, Navbar, Container, Button, Modal } from "react-bootstrap";
import Logo from "../test-logo.svg";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import { CreatePostForm } from "./CreatePostForm";

const NavBar = () => {

	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showCreatePostModal, setShowCreatePostModal] = useState(false);
	const [expanded, setExpanded] = useState(false);

	const handleLoginModalClose = () => setShowLoginModal(false);
	const handleLoginModalOpen = () => {
		setShowLoginModal(true);
		setExpanded(false);
	}


	const handleCreatePostModalClose = () => setShowCreatePostModal(false);
	const handleCreatePostModalOpen = () => {
		setShowCreatePostModal(true);
		setExpanded(false);
	}

	return (
		<>
			<Modal show={showLoginModal} onHide={handleLoginModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Вход в учетную запись</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<LoginForm />
				</Modal.Body>
			</Modal>
			<Modal size='lg' show={showCreatePostModal} onHide={handleCreatePostModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Создание новой записи</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CreatePostForm
						maxHeight={400}
						categories={[
							{ id: 1, name: 'Железо' },
							{ id: 2, name: "Авто" },
							{ id: 3, name: "gbcmrb" }
						]} />
				</Modal.Body>
			</Modal>

			<Navbar
				style={{ position: 'sticky', top: 0, zIndex: 1 }}
				collapseOnSelect
				expand="md"
				expanded={expanded}
				bg="dark"
				variant="dark"
			>
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
					<Navbar.Toggle
						aria-controls="responsive-navbar-nav"
						onClick={() => setExpanded(expanded ? false : "expanded")}
					/>
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link
								as={Link}
								to="/"
								onClick={() => setExpanded(false)}
							>
								Главная
							</Nav.Link>
						</Nav>
						<Nav className="mx-3">
							<Button variant="dark" onClick={() =>
								handleCreatePostModalOpen()
							}>
								Создать пост
							</Button>
						</Nav>
						<Nav className="mx-3">
							<Button variant="dark" onClick={() =>
								handleLoginModalOpen()
							}>
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