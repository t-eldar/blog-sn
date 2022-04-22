import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = (props) => {
	return (
		<>
			<NavBar />
			<Container style={{ minWidth: 400 }}>
				<Row>
					<Col lg="2" >
						<SideBar />
					</Col>
					<Col lg="8">
						<Outlet />
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Layout;