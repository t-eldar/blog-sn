import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';

const SideBar = ({ categories, ...props }) => {
	return (
		<>
			<Navbar {...props} style={{ position: 'fixed' }}>
				<Navbar.Toggle />
				<Nav className="flex-column">
					{categories.map(category =>
						<Nav.Item key={category.id}>
							<Nav.Link as={Link} to={`category/${category.id}`}>
								{category.name}
							</Nav.Link>
						</Nav.Item>
					)}
				</Nav>
			</Navbar>
		</>
	);
}

export default SideBar;