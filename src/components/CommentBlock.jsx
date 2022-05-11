import React, { useState } from 'react'
import { Card, FloatingLabel, Form, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import CommentsService from '../api/CommentsService'
import { useAuth } from '../hooks/useAuth'
import { useFetching } from '../hooks/useFetching'
import CommentList from './CommentList'

const CommentBlock = ({ comments, postId, updateComments = () => null }) => {

	const { user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [commentContent, setCommentContent] = useState('');

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

	return (
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
				<CommentList comments={comments} onCommentDelete={handleDeleteComment}/>
			</Card.Body>
		</Card>
	)
}

export default CommentBlock