import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useFetching } from "../hooks/useFetching";
import PostService from '../api/PostService';
import { Link } from 'react-router-dom';

const SideBar = (props) => {

	const [categories, setCategories] = useState([
		{
			id: 1,
			name: 'Авто',
		},
		{
			id: 2,
			name: 'Железо'
		}
	]);

	const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching(async () => {
		const response = PostService.getAllCategories();
		console.log('SideBar fetch categories response:' + response);
		setCategories(response.data);
	});

	// включить после подключения api
	// useEffect(() => {
	// 	const fetchAPI = async () => {
	// 		fetchCategories();
	// 	}
	// 	fetchAPI();
	// }, []);

	return (
		<>
			<Navbar {...props} style={{ position: 'fixed' }}>
				<Navbar.Toggle />
				<Nav className="flex-column">
					{categories.map(category =>
						<Nav.Item key={category.id}>
							<Nav.Link as={Link} to={`/${category.name}`}>
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