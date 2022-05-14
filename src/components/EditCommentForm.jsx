import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import CommentsService from '../api/CommentsService';
import { useFetching } from '../hooks/useFetching';

const EditCommentForm = ({ initComment, onSuccess = () => null }) => {

	const [comment, setComment] = useState({});
	const [editComment, isEditLoading, editError] = useFetching(async (com) => {
		const response = await CommentsService.editComment(com);
		console.log('edit comment resp:')
		console.log(response)

		if (response) {
			onSuccess();
		}
	});

	const handleEditComment = async (e) => {
		e.preventDefault();
		await editComment({ ...initComment, content: comment });
	}

	return (
		<>
			<Form.Control
				defaultValue={initComment.content}
				className='mb-3 mt-3 p-3'
				onChange={e => setComment(e.target.value)}
			>

			</Form.Control>
			<Button
				variant='warning'
				onClick={handleEditComment}
				disabled={isEditLoading}
			>
				Изменить
			</Button>
		</>
	);
}

export default EditCommentForm