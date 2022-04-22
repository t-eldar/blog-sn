import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const SideBar = (props) => {
	return (
		<>
			<Navbar {...props} style={{position: 'fixed'}}>
				<Navbar.Toggle />
				<Nav className="flex-column">
					<Nav.Item>
						<Nav.Link>Active</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link>Link</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link>Link</Nav.Link>
					</Nav.Item>
				</Nav>
			</Navbar>
		</>
	);
}

export default SideBar;