import React, { useState } from 'react'
import { Card, FloatingLabel, Form, Button, Modal } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import CommentsService from '../api/CommentsService'
import { useAuth } from '../hooks/useAuth'
import { useFetching } from '../hooks/useFetching'
import CommentList from './CommentList'
import EditCommentForm from './EditCommentForm'

const CommentBlock = ({ comments, postId, updateComments = () => null }) => {

	const { user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [commentContent, setCommentContent] = useState('');

	const [showEditCommentModal, setShowEditCommentModal] = useState(false);
	const handleEditCommentModalClose = () => setShowEditCommentModal(false);
	const handleEditCommentModalOpen = () => setShowEditCommentModal(true);

	const [createComment, isCreateCommentLoading, createCommentError] = useFetching(async (com) => {
		const response = await CommentsService.createComment(com);
		if (response) {
			updateComments();
			setCommentContent('');
		}
	})
	const [deleteComment, isDeleteCommentLoading, deleteCommentError] = useFetching(async (id) => {
		const response = await CommentsService.deleteComment(id);
		if (response) {
			updateComments();
		}
	})

	const handlePostComment = async (e) => {
		e.preventDefault();
		if (!user) {
			navigate('/login', { state: { from: location } })
		} else {
			if (commentContent && commentContent !== '') {
				await createComment({
					content: commentContent,
					applicationUserId: user.id,
					postId: postId
				});
			}
		}
	}
	const handleDeleteComment = async (id) => {
		await deleteComment(id);
	}

	const [editingComment, setEditinComment] = useState();
	const handleEditComment = (com) => {
		setEditinComment(com);
		handleEditCommentModalOpen()
	}

	return (

		<>
			<Modal show={showEditCommentModal} onHide={handleEditCommentModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Редактирование записи</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EditCommentForm 
						initComment={editingComment}
						onSuccess={(e) => {
							updateComments(e);
							handleEditCommentModalClose();
						}}
					/>
				</Modal.Body>
			</Modal>


			<Card className='m-3' border='dark'>
				<Card.Title className='m-3'>
					Комментариев: {comments.length}
				</Card.Title>
				<Card.Body className='m-1'>
					<FloatingLabel label='Написать комментарий...'>
						<Form.Control
							className='me-2'
							placeholder='Написать комментарий...'
							value={commentContent}
							onChange={e => setCommentContent(e.target.value)}
						/>
					</FloatingLabel>
					<Button
						disabled={isCreateCommentLoading}
						className='m-1'
						variant='outline-primary'
						onClick={handlePostComment}
					>
						Отправить
					</Button>
					<CommentList 
						comments={comments} 
						onCommentDelete={handleDeleteComment} 
						onCommentEdit={handleEditComment}
					/>
				</Card.Body>
			</Card>
		</>
	)
}

export default CommentBlock