import React, { useEffect, useState } from "react";
import PostService from "../api/PostService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/Loader";
import { Card } from "react-bootstrap";
import { formatDate } from "../utils";
import { useParams } from "react-router-dom";

const PostPage = () => {

	const params = useParams();
	const [post, setPost] = useState({});
	const subtitleFontSize = '12px';

	if (!post.user)
		post.user = {
			name: "name in postItem",
		};
	if (!post.description)
		post.description = post.body;
	if (!post.dateCreated)
		post.dateCreated = new Date('April 17, 2022 17:47:00');
	const [fetchPost, isPostLoading, postError] = useFetching(async (id) => {
		const response = await PostService.getPostById(id);
		console.log("PostPage fetchPost response: ");
		console.log(response);
		setPost(response.data);
	})

	useEffect(() => {
		const fetchAPI = async () => {
			await fetchPost(params.id);
		};
		fetchAPI();
	}, []);

	return (
		<>
			{
				isPostLoading
					? <Loader />
					: <Card>
						<Card.Header>
							<Card.Subtitle
								className="m-2 text-muted text-sm-left s"
								style={{ fontSize: subtitleFontSize }}
							>
								Автор: {post.user.name}
							</Card.Subtitle>
							<Card.Subtitle
								className="m-2 text-muted"
								style={{ fontSize: subtitleFontSize }}
							>
								Опубликовано:
								{' ' + formatDate(post.dateCreated)}
							</Card.Subtitle>
						</Card.Header>
						<Card.Body>
							<h4>{post.title}</h4>
							{post.body}
						</Card.Body>
					</Card>
			}
		</>
	);
}

export default PostPage;