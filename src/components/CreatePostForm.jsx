import React, { useState } from 'react'
import PostService from '../api/PostService';
import { useFetching } from '../hooks/useFetching';
import { Card, Form, Button } from 'react-bootstrap';

export const CreatePostForm = ({ categories, maxHeight }) => {

	const [post, setPost] = useState({
		title: '',
		body: '',
		category: '',
	});
	const [createPost, isCreationLoading, creationError] = useFetching(async (post) => {
		const response = await PostService.createPost(post);
		console.log('CreatePostForm post form response:');
		console.log(response);
	})
	const handleCreatePost = (e) => {
		console.log(post)
		e.preventDefault();
		const formData = new FormData();

		formData.append("Title", post.title);
		formData.append("Content", post.body);
		formData.append("Category", post.category.id
		);

		createPost(formData);
	}
	const handleTextAreaKeyDown = (e) => {
		e.target.style.height = 'inherit';
		e.target.style.height = `${e.target.scrollHeight}px`;
	}

	return (
		<>
			<Card className="m-3 p-3">
				<Form>
					<Form.Group className="mb-3">
						<Form.Control
							className='p-3'
							type="text"
							placeholder='Заголовок'
							required
							onChange={e =>
								setPost({ ...post, title: e.target.value })
							} 
						/>
					</Form.Group>
					<Form.Select 
						className='p-3'
						onChange={e => 
							setPost({...post, category: e.target.value})
						}
					>
						<option hidden value>Категория</option>
						{categories.map(cat =>
							<option key={cat.id} value={cat.name}>{cat.name}</option>)}
					</Form.Select>
					<Form.Group className="mt-3 mb-3">
						<Form.Control
							style={{ maxHeight: maxHeight }}
							className='p-3'
							as="textarea"
							placeholder="Введите текст..."
							onKeyDown={handleTextAreaKeyDown}
							onChange={e => 
								setPost({...post, body: e.target.value})}
							required 
						/>
					</Form.Group>
					<Button
						variant="outline-primary"
						onClick={handleCreatePost}
					>
						Создать
					</Button>
				</Form>
			</Card>
		</>
	)
}
