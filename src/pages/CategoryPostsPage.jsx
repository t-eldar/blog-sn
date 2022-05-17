import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PostList from '../components/PostList'
import { useFetching } from '../hooks/useFetching';
import CategoriesService from "../api/CategoriesService";
import PostBlock from '../components/PostBlock';

const CategoryPostsPage = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [posts, setPosts] = useState([]);
	const [category, setCategory] = useState({});

	const [fetchCategory, isCategoryLoading, categoryError] = useFetching(async (id) => {
		const response = await CategoriesService.getById(id)
		setCategory(response.data);
	})

	const [fetchPosts, isPostsLoading, isPostsError] = useFetching(async (id) => {
		const response = await CategoriesService.getPostsByCategoryId(id);
		setPosts(response.data);
	});

	useEffect(() => {
		const fetchAPI = async () => {
			await fetchCategory(params.id);
			await fetchPosts(params.id);
		}
		fetchAPI();
	}, [params.id]);
	useEffect(() => {
		if (categoryError && (categoryError.response.status === 404
			|| params.id === null
			|| !params.id
		)) {
			navigate('/not-found', { replace: true })
		}
	}, [params.id, categoryError]);

	return (
		<>
			<Card className='m-3'>
				<Card.Header>
					<h1 style={{ textAlign: 'center' }}>{category.name}</h1>
				</Card.Header>
				<Card.Body>
					{category.description}
				</Card.Body>
			</Card>
			<PostBlock fetchPosts={
				async() => await fetchPosts(params.id)} 
				posts={posts} 
			/>
		</>
	)
}

export default CategoryPostsPage