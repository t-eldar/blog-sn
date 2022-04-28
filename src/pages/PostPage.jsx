import React, { useContext, useEffect, useState } from "react";
import PostService from "../api/PostService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/Loader";
import { Card, Button } from "react-bootstrap";
import { formatDate } from "../utils";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context";
import AuthService from "../api/AuthService";

const PostPage = () => {

	const params = useParams();

	const [user, setUser] = useState();
	const { isAuth } = useContext(AuthContext);

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
	const [editPost, isEditLoading, editError] = useFetching(async (id, post) => {
		const response = await PostService.editPost(id, post);
		console.log('PostPage edit post response:');
		console.log(response);
	})
	const [deletePost, isDeleteLoading, deleteError] = useFetching(async (id) => {
		const response = await PostService.deletePost(id);
		console.log('PostPage delete post response:');
		console.log(response);
	})
	useEffect(() => {
		const fetchAPI = async () => {
			await fetchPost(params.id);
		};
		fetchAPI();
	}, []);
	useEffect(() => {
		const authUser = AuthService.getCurrentUser();
		if (isAuth && authUser) {
			setUser(authUser);
		}
	}, [isAuth]);

	const handleEdit = async () => {
		if ((user.role === 'moderator'
			|| user.role === 'admin'
			|| user.id === post.user.id)
			&& post.content && post.content !== '' && post.title && post.title !== '') {
			await editPost(post.id, post);
		}
	}

	const handleDelete = async () => {
		if ((user.role === 'moderator'
			|| user.role === 'admin'
			|| user.id === post.user.id)
			&& post) {
			await deletePost(post.id);
		}
	}

	return (
		<>
			{
				isPostLoading
					? <Loader />
					: <Card border='dark' className='m-3'>
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
							<Button onClick={handleEdit}>
								Изменить
							</Button>
							<Button onClick={handleDelete}>
								Удалить
							</Button>
						</Card.Header>
						<Card.Body>
							<h4>{post.title}</h4>
							{post.body} {/*// content */}
						</Card.Body>
					</Card>
			}
		</>
	);
}

export default PostPage;