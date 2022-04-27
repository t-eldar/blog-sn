import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import PostList from "../components/PostList";
import PostService from "../api/PostService";
import { Spinner } from "react-bootstrap";
import Loader from "../components/Loader";
import P_agination from "../components/P_agination";


const AllPostsPage = () => {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage] = useState(5);

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

	const lastPostsIndex = currentPage * postPerPage;
	const firstPostsIndex = lastPostsIndex - postPerPage;
	const currentPost = posts.slice(firstPostsIndex, lastPostsIndex)

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	}

	return (
		<>
			{
				isPostsLoading
					? <div className="d-flex justify-content-center m-3">
						<Loader />
					</div>
					: <>
						<PostList posts={currentPost} />
						<div className='d-flex justify-content-center'>
							<P_agination
								postPerPage={postPerPage}
								totalPosts={posts.length}
								paginate={paginate}
							/>
						</div>
					</>
			}
		</>
	);
}

export default AllPostsPage;