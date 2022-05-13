import React, { useState } from 'react'
import { Card, FloatingLabel, Form, Button } from 'react-bootstrap'
import CommentsService from '../api/CommentsService'
import { useFetching } from '../hooks/useFetching'
import CommentItem from './CommentItem'

const CommentList = ({ comments, onCommentDelete, onCommentEdit }) => {


	if (!comments || !comments.length) {
		return (
			<Card className='m-3 p-3' border='dark'>
				<Card.Text >
					Этот пост еще не обсуждали.
				</Card.Text>
			</Card>
		)
	}
	return (
		<>
			{comments.map(com => 
				<CommentItem 
					onEdit={onCommentEdit}
					key={com.id} 
					comment={com} 
					onCommentDelete={onCommentDelete}
				/>)}
		</>
	)
}

export default CommentList