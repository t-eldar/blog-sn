import React, { useEffect, useState } from "react";
import { Card, Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';

const SideBar = ({ categories, ...props }) => {
	return (
		<>
			<Navbar {...props} style={{ position: 'fixed' }}>
				<Navbar.Toggle />
				<Nav className="flex-column">
					{categories.map(category =>
						<Nav.Item key={category.id}>
							<Card style={{ margin: '0.5rem', width: '10rem' }} className='App'>
								<Nav.Link as={Link} to={`category/${category.id}`}>
									<h6 style={{color: 'black'}}>
										{category.title}
									</h6>
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