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
const AdminNavBar = () => {

	const [expanded, setExpanded] = useState(false);

	return (
		<Navbar
			style={{ position: 'sticky', top: 0, zIndex: 1 }}
			collapseOnSelect
			expand="md"
			expanded={expanded}
			bg="dark"
			variant="dark"
		>
			<Container>
				<Navbar.Brand as={Link} to="/admin-page">
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
					onClick={() => setExpanded(expanded ? false : true)}
				/>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link
							as={Link}
							to="/admin-page/users"
							onClick={() => setExpanded(false)}
						>
							Все пользователи
						</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link
							as={Link}
							to="/admin-page/register-admin"
							onClick={() => setExpanded(false)}
						>
							Зарегистрировать нового админа
						</Nav.Link>
					</Nav>
					<Nav className='mx-3'>
						<Button
							variant="dark"
							as={Link}
							to='/'
						>
							Вернуться
						</Button>
					</Nav>

				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default AdminNavBar