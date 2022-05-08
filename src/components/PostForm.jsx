import React, { useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
const PostForm = ({
	initialValue,
	categories,
	maxHeight,
	onTitleChange,
	onContentChange,
	onCategoryChange,
	onSubmit,
	submitText }) => {

	const handleTextAreaKeyDown = (e) => {
		e.target.style.height = 'inherit';
		e.target.style.height = `${e.target.scrollHeight}px`;
	}

	return (
		<Form>
			<Form.Group className="mb-3">
				<Form.Control
					className='p-3'
					type="text"
					placeholder='Заголовок'
					defaultValue={!!initialValue ? initialValue.title : ''}
					required
					onChange={onTitleChange}
				/>
			</Form.Group>
			<Form.Select
				className='p-3'
				onChange={onCategoryChange}
				defaultValue={!!initialValue ? initialValue.category.name : ''}
			>
				<option hidden value>Категория</option>
				{categories.map(cat =>
					<option key={cat.id} value={cat.id}>{cat.name}</option>)}
			</Form.Select>
			<Form.Group className="mt-3 mb-3">
				<Form.Control
					style={{ maxHeight: maxHeight }}
					className='p-3'
					as="textarea"
					placeholder="Введите текст..."
					defaultValue={!!initialValue ? initialValue.content : ''}
					onKeyDown={handleTextAreaKeyDown}
					onChange={onContentChange}
					required
				/>
			</Form.Group>
			<Button
				variant="outline-primary"
				onClick={onSubmit}
			>
				{submitText}
			</Button>
		</Form>
	)
}

export default PostForm