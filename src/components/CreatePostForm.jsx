import React, { useState } from 'react'
import PostService from '../api/PostService';
import { useFetching } from '../hooks/useFetching';
import { Card, Form, Button } from 'react-bootstrap';
import PostForm from './PostForm';
import { cutText } from '../utils';

export const CreatePostForm = ({ categories, maxHeight }) => {

	const [post, setPost] = useState({});
	const [createPost, isCreationLoading, creationError] = useFetching(async (post) => {
		const response = await PostService.createPost(post);
		console.log('CreatePostForm post form response:');
		console.log(response);
	})
	const handleCreatePost = async (e) => {
		console.log(post)
		e.preventDefault();
		const formData = new FormData();

		formData.append("Title", post.title);
		formData.append("Content", post.content);
		formData.append("Description", cutText(post.content));
		formData.append("CategoryId", post.categoryId);
		formData.append("ApplicationUserId")

		await createPost(formData);
	}


	return (
		<>
			<Card className="m-3 p-3">
				<PostForm 
					categories={categories}
					maxHeight={maxHeight}
					submitText='Создать'
					onSubmit={handleCreatePost}
					onCategoryChange={e => setPost({...post, category: e.target.value})}
					onTitleChange={e => setPost({...post, title: e.target.value})}
					onContentChange={e => setPost({...post, content: e.target.value})}
				/>
			</Card>
		</>
	)
}
