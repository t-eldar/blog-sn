import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList'
import { useFetching } from '../hooks/useFetching';
import PostService from "../api/PostService";

const CategoryPostsPage = () => {
	const params = useParams();
	const [posts, setPosts] = useState([]);
	const [category, setCategory] = useState({});

	const [fetchCategory, isCategoryLoading, categoryError] = useFetching(async (id) => {
		const responce = await PostService.getCategory(id)
		setCategory(responce.data);
		console.log(responce.data);
		console.log('Huy')
	})
	
	const [fetchPosts, isPostsLoading, isPostsError] = useFetching(async (id) => {
		const responce = await PostService.getPostsByCategoryId(id);
		setPosts(responce.data);
	});

	useEffect(() => {
		const fetchAPI = async () => {
			await fetchCategory(params.id);
			await fetchPosts(params.id);
		}
		fetchAPI();
	}, [params.id]);

	return (
		<>
			<Card>
				<h1>{category.name}</h1>
				<Button onClick={e => console.log(params.id)} variant='primary'>Params</Button>
			</Card>
			<PostList posts={posts} />
		</>
	)
}

export default CategoryPostsPage