import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import { useFetching } from '../hooks/useFetching';

const UserPage = () => {

	const params = useParams();
	const [posts, setPosts] = useState();
	const [user, setUser] = useState();
	//
	const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
		// api call
	})

	useEffect(() => {
		const fetchAPI = () => {
			fetchPosts();
		};
		fetchAPI();
	}, [])


	return (
		<>
			<Card>
				Информация пользоавтеля
			</Card>
			{/*<PostList posts={posts} /> */}
		</>
	)
}

export default UserPage