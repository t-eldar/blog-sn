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
		setCategories(response.data);
	})

	useEffect(() => {
		const fetchAPI = async () => {
			await fetchCategories();
		}
		fetchAPI();
	}, []);
	const [sideBarHeight, setSideBarHeight] = useState('90vh');

	const handleResize = () => {
		if (window.innerWidth < 1000) {
			setSideBarHeight('8vh')
		}
		else {
			setSideBarHeight('90vh')
		}
	}
	useEffect(() => {
		handleResize()
		window.addEventListener("resize", handleResize, false);
	}, []);
	return (
		<>
			<div style={{ overflow: '' }}>
				<NavBar style={{ height: '10vh', zIndex: 1000 }} categories={categories} />
				<Container style={{ minWidth: 400 }}>
					<Row className="justify-content-start">
						<Col style={{ height: sideBarHeight, overflowY: 'scroll' }} lg="2">
							<SideBar categories={categories} onToggle={(expanded) => {
								if (expanded) setSideBarHeight('90vh');
								else setSideBarHeight('8vh')
							}} />
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