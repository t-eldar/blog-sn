import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList'
import { useFetching } from '../hooks/useFetching';
import PostService from "../api/PostService";

const CategoryPostsPage = () => {
	const params = useParams();
	const [category, setCategory] = useState({});

	const [fetchCategory, isCategoryLoading, categoryError] = useFetching(async (id) => {
		const responce = await PostService.getPostById(id)
		setCategory(responce.data);
		console.log(category);
	})

	useEffect(() => {
		const fetchAPI = async () => {
			await fetchCategory(params.id);
		}
		fetchAPI();
	}, []);

	return (
		<>
			<Card>
				<h1>{category.title}</h1>
			</Card>
			<PostList posts={category} />
		</>
	)
}

export default CategoryPostsPage