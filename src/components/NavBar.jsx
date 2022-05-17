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
import Logo from "../icons/logo.svg";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";
import { CreatePostForm } from "./CreatePostForm";
import LoginForm from "./LoginForm";
import AuthService from "../api/AuthService";
import { useAuth } from "../hooks/useAuth";
import home from "../icons/home.svg";
import create from "../icons/create.svg";
import logout from "../icons/logout.svg";
import userTest from "../icons/userTest.svg";
import { updateServices } from "../utils";

const NavBar = ({ categories, style }) => {

	const { user, setUser } = useAuth();
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (user && user.role === 'Admin') {
			setIsAdmin(true);
		}
		else {
			setIsAdmin(false);
		}
	}, [user])


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
		setShowCreatePostModal(true);
		setExpanded(false);
	}

	const handleLogout = () => {
		AuthService.logout();
		window.location.reload();
		updateServices();
		setUser(null);
	}

	const AuthorizedNav = () =>
		<Nav className='mx-3'>
			<Nav.Link
				as={Link}
				to={`users/${user.id}`}
				onClick={() => setExpanded(false)}
			>
				<img src = {userTest} 
				    style ={{width: '30', height: '30'}}/>
			</Nav.Link>
			<ButtonGroup>
				<Button
					variant="dark"
					onClick={handleCreatePostModalOpen}
				>
					<img src = {create}
					     style ={{width: '30', height: '30'}}/>
				</Button>
				<Button
					variant="dark"
					onClick={handleLogout}
				>
				<img src = {logout}
				     style ={{width: '30', height: '30'}}/>
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
					<LoginForm onSuccess={handleLoginModalClose} />
				</Modal.Body>
			</Modal>

			<Modal size='lg' show={showCreatePostModal} onHide={handleCreatePostModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Создание новой записи</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CreatePostForm
						onSubmit={handleCreatePostModalClose}
						maxHeight={400}
						categories={categories} />
				</Modal.Body>
			</Modal>

			<Modal size='lg' show={showRegisterModal} onHide={handleRegisterModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Регистрация</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<RegisterForm onSuccess={handleRegisterModalClose} />
				</Modal.Body>
			</Modal>

			<Navbar
				style={style}
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
							width="40"
							height="40"
							alt="React Bootstrap logo"
						/>
						BlogSN
					</Navbar.Brand>
					<Navbar.Toggle
						aria-controls="responsive-navbar-nav"
						onClick={() => setExpanded(expanded ? false : true)}
					/>
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link
								as={Link}
								to="/"
								onClick={() => setExpanded(false)}
							>
								<img src = {home} />
							</Nav.Link>
						</Nav>
						{
							isAdmin &&
							<Button
								variant='dark'
								as={Link}
								to='/admin-page'
							>
								Перейти в админскую панель
							</Button>
						}
						{!!user ? <AuthorizedNav /> : <UnauthorizedNav />}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default NavBar;