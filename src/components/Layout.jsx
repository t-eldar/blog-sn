import React, { 
	useState, 
	useEffect 
} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import PostService from "../api/PostService";
import { useFetching } from "../hooks/useFetching";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = () => {
	const [categories, setCategories] = useState([]);

	const [fetchCategories, isLoading, categoriesError] = useFetching(async () => {
		const response = await PostService.getAllCategories();
		console.log('Layout get all categories response:');
		console.log(response);
		setCategories(response.data);
	})

	useEffect(() => {
		// включить при подключении бэка
		// const fetchAPI = async () => {
		// 	await fetchCategories();
		// }
		// fetchAPI();
		setCategories([
			{
				name: 'Авто',
				id: 1,
			},
			{
				id: 2,
				name: 'Железо',
			},
			{
				name: 'Аниме',
				id: 3
			}
		]);
	}, []);
	return (
		<>
			<NavBar categories={categories}/>
			<Container style={{ minWidth: 400 }}>
				<Row>
					<Col lg="2" >
						<SideBar categories={categories}/>
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