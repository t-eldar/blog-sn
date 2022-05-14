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
			<div style={{ overflow: '' }}>
				<NavBar style={{ height: '10vh' }} categories={categories} />
				<Container style={{ minWidth: 400 }}>
					<Row className="justify-content-start">
						<Col style={{ height: '', overflowY: 'scroll' }} lg="2">
							<SideBar categories={categories} />
						</Col>
						<Col style={{ height: '90vh', overflowY: 'scroll' }} lg="8">
							<Outlet />
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
}

export default Layout;