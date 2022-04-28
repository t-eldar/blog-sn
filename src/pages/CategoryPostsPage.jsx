import React, { useEffect, useState } from 'react'
import PostList from '../components/PostList'
import { useFetching } from '../hooks/useFetching';

const CategoryPostsPage = () => {
	const [posts, setPosts] = useState([]);

	const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
		//api call
	})

	useEffect(() => {
		const fetchAPI = async () => {
			await fetchPosts();
		}
		fetchAPI();
	}, []);

	return (
		<>
			<PostList posts={posts} />
		</>
	)
}

export default CategoryPostsPage