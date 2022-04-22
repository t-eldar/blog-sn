import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import PostList from "../components/PostList";
import PostService from "../api/PostService";
import { Spinner } from "react-bootstrap";
import Loader from "../components/Loader";


const AllPostsPage = () => {
	const [posts, setPosts] = useState([]);

	const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
		const response = await PostService.getAll();
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
			{
			isPostsLoading 
			? <div className="d-flex justify-content-center m-3">
				<Loader/>
			</div>
			: <PostList posts={posts}/>
			}
		</>
	);
}

export default AllPostsPage;