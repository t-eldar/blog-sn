import React, { useEffect, useState } from "react";
import { Card, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';

const SideBar = ({ categories, ...props }) => {

	const location = useLocation();

	return (
		<>
			<Navbar {...props} style={{ position: 'fixed' }}>
				<Navbar.Toggle />
				<Nav className="flex-column">
					{categories.map(category =>
						<Nav.Item key={category.id}>
							<Card className="m-2 p-2">
								<Nav.Link as={Link} to={`category/${category.id}`}>
									<span style={{fontWeight: 'bolder'}}>
										{category.name}
									</span>
								</Nav.Link>
							</Card>
						</Nav.Item>
					)}
				</Nav>
			</Navbar>
		</>
	);
}

export default SideBar;