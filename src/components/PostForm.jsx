import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
const PostForm = ({
	post,
	setPost,
	initialValue,
	categories,
	maxHeight,
	onSubmit,
	submitText,
	submitDisabled }) => {

	const handleTextAreaKeyDown = (e) => {
		e.target.style.height = 'inherit';
		e.target.style.height = `${e.target.scrollHeight}px`;
	}

	const [disabled, setDisabled] = useState();
	useEffect(() => {
		console.log(post)
		console.log(!post || !post.content || !post.categoryId || !post.title
			|| post.content === '' || post.title === '' || post.categoryId === -1)
		if (!post || !post.content || !post.categoryId || !post.title
			|| post.content === '' || post.title === '' || post.categoryId === -1) {
			setDisabled(true);
		}
		else {
			setDisabled(false);
		}
	}, [post]);

	return (
		<Form>
			<Form.Group className="mb-3">
				<Form.Control
					className='p-3'
					type="text"
					placeholder='Заголовок'
					defaultValue={!!initialValue ? initialValue.title : ''}
					required
					onChange={e => setPost({ ...post, title: e.target.value })}
				/>
			</Form.Group>
			<Form.Select
				className='p-3'
				onChange={e => setPost({ ...post, categoryId: e.target.value })}
				defaultValue={!!initialValue ? initialValue.categoryId : -1}
			>
				<option hidden value>Категория</option>
				{categories.map(cat =>
					<option key={cat.id} value={cat.id}>{cat.name}</option>)}
			</Form.Select>
			<Form.Group className="mt-3 mb-3">
				<Form.Control
					style={{ maxHeight: maxHeight }}
					onChange={e => setPost({ ...post, content: e.target.value })}
					className='p-3'
					as="textarea"
					placeholder="Введите текст..."
					defaultValue={!!initialValue ? initialValue.content : ''}
					onKeyDown={handleTextAreaKeyDown}
					required
				/>
			</Form.Group>
			<Button 
				disabled={submitDisabled || disabled}
				variant="outline-primary"
				onClick={onSubmit}
			>
				{submitText}
			</Button>
		</Form>
	)
}

export default PostForm