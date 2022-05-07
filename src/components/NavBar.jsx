import React, { 
	useContext, 
	useEffect, 
	useState 
} from "react";
import { 
	Nav, 
	Navbar, 
	Container, 
	Button, 
	Modal, 
	ButtonGroup 
} from "react-bootstrap";
import Logo from "../test-logo.svg";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";
import { CreatePostForm } from "./CreatePostForm";
import LoginForm from "./LoginForm";
import AuthService from "../api/AuthService";
import { useAuth } from "../hooks/useAuth";

const NavBar = ({ categories }) => {

	const { user, setUser } = useAuth();

	const [showRegisterModal, setShowRegisterModal] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showCreatePostModal, setShowCreatePostModal] = useState(false);
	const [expanded, setExpanded] = useState(false);

	const handleLoginModalClose = () => setShowLoginModal(false);
	const handleLoginModalOpen = () => {
		setShowLoginModal(true);
		setExpanded(false);
	}

	const handleRegisterModalClose = () => setShowRegisterModal(false);
	const handleRegisterModalOpen = () => {
		setShowRegisterModal(true);
		setExpanded(false);
	}

	const handleCreatePostModalClose = () => setShowCreatePostModal(false);
	const handleCreatePostModalOpen = () => {
		console.log(AuthService.getCurrentUser())
		setShowCreatePostModal(true);
		setExpanded(false);
	}

	const handleLogout = () => {
		AuthService.logout();
		setUser(null);
	}

	const AuthorizedNav = () =>
		<Nav className='mx-3'>
			<Nav.Link
				as={Link}
				to={`users/${user.id}`}
			>
				Мой профиль
			</Nav.Link>
			<ButtonGroup>
				<Button
					variant="dark"
					onClick={handleCreatePostModalOpen}
				>
					Создать пост
				</Button>
				<Button
					variant="dark"
					onClick={handleLogout}
				>
					Выйти
				</Button>
			</ButtonGroup>
		</Nav>

	const UnauthorizedNav = () =>
		<Nav className='mx-3'>
			<ButtonGroup>
				<Button
					variant="dark"
					onClick={handleLoginModalOpen}
				>
					Войти
				</Button>
				<Button
					variant="dark"
					onClick={handleRegisterModalOpen}
				>
					Зарегистрироваться
				</Button>
			</ButtonGroup>
		</Nav>

	return (
		<>
			<Modal show={showLoginModal} onHide={handleLoginModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Вход в учетную запись</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<LoginForm onSuccess={handleLoginModalClose}/>
				</Modal.Body>
			</Modal>

			<Modal size='lg' show={showCreatePostModal} onHide={handleCreatePostModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Создание новой записи</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CreatePostForm
						maxHeight={400}
						categories={categories} />
				</Modal.Body>
			</Modal>

			<Modal size='lg' show={showRegisterModal} onHide={handleRegisterModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Регистрация</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<RegisterForm onSuccess={handleRegisterModalClose}/>
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
						{!!user ? <AuthorizedNav /> : <UnauthorizedNav />}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default NavBar;