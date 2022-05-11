import React, { useState } from 'react'
import { Card, FloatingLabel, Form, Button } from 'react-bootstrap'
import CommentsService from '../api/CommentsService'
import { useFetching } from '../hooks/useFetching'
import CommentItem from './CommentItem'

const CommentList = ({ comments, onCommentDelete }) => {


	if (!comments || !comments.length) {
		comments = [
			{
				id: 1,
				applicationUser: {
					id: '422ad997-6fd2-44d6-bb2e-882c379cf032',
					userName: 'gfgf'
				},
				content: 'НЕт лваоиплапалоляпо',
				dateCreated: new Date().toString()
			}, {
				id: 2,
				applicationUser: {
					id: '422ad997-6fd2-44d6-bb2e-882c379cf032',
					userName: 'gfgf'
				},
				content: 'щдшптьадводьпаиоабвпьтвыоилавб',
				dateCreated: new Date().toString()
			}, {
				id: 3,
				applicationUser: {
					id: '422ad997-6fd2-44d6-bb2e-882c379cf032',
					userName: 'gfgf'
				},
				content: 'НЕт шгрпгиргпрвпшгашпрвашгпдаврпивопавпилавопавпоб',
				dateCreated: new Date().toString()
			},
		]
		// return (
		// 	<Card className='m-3 p-3' border='dark'>
		// 		<Card.Text >
		// 			Этот пост еще не обсуждали.
		// 		</Card.Text>
		// 	</Card>
		// )
	}
	return (
		<>
			{comments.map(com => <CommentItem key={com.id} comment={com} onCommentDelete={onCommentDelete}/>)}
		</>
	)
}

export default CommentList