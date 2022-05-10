import React, {
	useState,
	useEffect
} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import CategoriesService from "../api/CategoriesService";
import { useFetching } from "../hooks/useFetching";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = () => {
	const [categories, setCategories] = useState([]);

	const [fetchCategories, isLoading, categoriesError] = useFetching(async () => {
		const response = await CategoriesService.getAll();
		console.log(response.data)
		setCategories(response.data);
	})

	useEffect(() => {
		const fetchAPI = async () => {
			await fetchCategories();
		}
		fetchAPI();
	}, []);
	return (
		<>
			<NavBar categories={categories} />
			<Container style={{ minWidth: 400 }}>
				<Row className="justify-content-start">
					<Col lg="2">
						<SideBar categories={categories} />
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