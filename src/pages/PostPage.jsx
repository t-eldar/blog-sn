import React, { useContext, useEffect, useState } from "react";
import PostService from "../api/PostService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/Loader";
import { Card, Button, Modal } from "react-bootstrap";
import { formatDate } from "../utils";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context";
import AuthService from "../api/AuthService";
import EditPostForm from "../components/EditPostForm";

const PostPage = () => {

	const { user } = useContext(AuthContext);
	const params = useParams();

	const [post, setPost] = useState({});
	const subtitleFontSize = '14px';

	const [showEditPostModal, setShowEditPostModal] = useState(false);
	const handleEditPostModalClose = () => setShowEditPostModal(false);
	const handleEditPostModalOpen = () => setShowEditPostModal(true);

	if (!post.applicationUser)
		post.applicationUser = {
			name: "name in postItem",
		};
	if (!post.applicationUserId) 
		post.applicationUserId = 1;
	const [fetchPost, isPostLoading, postError] = useFetching(async (id) => {
		const response = await PostService.getPostById(id);
		console.log("PostPage fetchPost response: ");
		console.log(response);
		setPost(response.data);
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

	const handleDelete = async () => {
		if ((user.role === 'moderator'
			|| user.role === 'admin'
			|| user.id === post.user.id)
			&& post) {
			await deletePost(post.id);
		}
	}

	const [isEditAllowed, setIsEditAllowed] = useState(false);
	useEffect(() => {
		if (user?.role === 'moderator'
			|| user?.role === 'admin'
			|| user?.id === post.applicationUserId) {
			setIsEditAllowed(true);
		} else { 
			setIsEditAllowed(false);
		}
	}, [user]);

	return (
		<>
			<Modal size='lg' show={showEditPostModal} onHide={handleEditPostModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Создание новой записи</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EditPostForm
						initPost={post}
						maxHeight={400}
					/>
				</Modal.Body>
			</Modal>
			{
				isPostLoading
					? <Loader />
					: <Card border='dark' className='m-3'>
						<Card.Header className="d-flex justify-content-between">
							<div>
								<Card.Subtitle
									className="m-2 text-muted"
									style={{ fontSize: subtitleFontSize }}
								>
									Автор: {post.applicationUser.name}
								</Card.Subtitle>
								<Card.Subtitle
									className="m-2 text-muted"
									style={{ fontSize: subtitleFontSize }}
								>
									Опубликовано:
									{' ' + formatDate(post.dateCreated)}
								</Card.Subtitle>
							</div>
							{
								isEditAllowed &&
								<div className="mt-2">
									<Button
										className='m-1'
										variant="outline-warning"
										onClick={handleEditPostModalOpen}
									>
										Изменить
									</Button>
									<Button
										className='m-1'
										variant="outline-danger"
										onClick={handleDelete}
									>
										Удалить
									</Button>
								</div>
							}
						</Card.Header>
						<Card.Body>
							<h4>{post.title}</h4>
							{post.content}
						</Card.Body>
					</Card>
			}
		</>
	);
}

export default PostPage;