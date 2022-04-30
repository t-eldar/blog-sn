import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList'
import { useFetching } from '../hooks/useFetching';

const CategoryPostsPage = () => {
	const params = useParams();
	const [category, setCategory] = useState({});

	const [fetchCategory, isCategoryLoading, categoryError] = useFetching(async (id) => {
		//api call
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
				<h1>{category.name}</h1>
			</Card>
			<PostList posts={category.posts} />
		</>
	)
}

export default CategoryPostsPage