import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import PostList from "../components/PostList";
import PostsService from "../api/PostsService";
import { Spinner } from "react-bootstrap";
import Loader from "../components/Loader";
import PostBlock from "../components/PostBlock";


const AllPostsPage = () => {
	const [posts, setPosts] = useState([]);

	const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
		const response = await PostsService.getAll();
		setPosts(response.data)
	});
	useEffect(() => {
		const fetchAPI = async () => {
			await fetchPosts();
		}
		fetchAPI();
	}, []);

	return (
		<>
			<PostBlock
				posts={posts}
				fetchPosts={fetchPosts}
				isPostsLoading={isPostsLoading}
			/>
		</>
	);
}

export default AllPostsPage;