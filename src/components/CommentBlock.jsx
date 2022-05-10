import React, { useState } from 'react'
import { Card, FloatingLabel, Form, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import CommentsService from '../api/CommentsService'
import { useAuth } from '../hooks/useAuth'
import { useFetching } from '../hooks/useFetching'
import CommentList from './CommentList'

const CommentBlock = ({ comments, postId }) => {

	const { user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [comment, setComment] = useState({});
	const [postComment, isPostCommentLoading, postCommentError] = useFetching(async (com) => {
		const response = await CommentsService.postComment(com);
		console.log('CommentList postComment respone:');
		console.log(response);
	})

	const handlePostComment = async (e) => {
		e.preventDefault();
		if (!user) {
			navigate('/login', { state: { from: location } })
		} else {
			await postComment({
				content: comment,
				applicationUserId: user.id,
				////////////////////////
				postId: postId
				////////////////////////
			});
		}
	}

	return (
		<Card className='m-3' border='dark'>
			<Card.Title className='m-3'>
				Комментариев: сколько
			</Card.Title>
			<Card.Body className='m-1'>
				<FloatingLabel label='Написать комментарий...'>
					<Form.Control
						className='me-2'
						placeholder='Написать комментарий...'
						onChange={e => setComment(e.target.value)}
					/>
				</FloatingLabel>
				<Button
					className='m-1'
					variant='outline-primary'
					onClick={handlePostComment}
				>
					Отправить
				</Button>
				<CommentList comments={comments} />
			</Card.Body>
		</Card>
	)
}

export default CommentBlock