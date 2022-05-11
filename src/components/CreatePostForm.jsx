import React, { useState } from 'react'
import PostsService from '../api/PostsService';
import { useFetching } from '../hooks/useFetching';
import { Card, Form, Button } from 'react-bootstrap';
import PostForm from './PostForm';
import { cutText } from '../utils';
import { useAuth } from '../hooks/useAuth';

export const CreatePostForm = ({ categories, maxHeight, onSubmit = () => null }) => {

	const {user} = useAuth();

	const [post, setPost] = useState({});
	const [createPost, isCreatingLoading, creatingError] = useFetching(async (post) => {
		const response = await PostsService.createPost(post);
		console.log('CreatePostForm post form response:');
		console.log(response);
	})
	const handleCreatePost = async (e) => {
		console.log(post)
		e.preventDefault();

		post.applicationUserId = user.id;
		post.description = cutText(post.content);

		console.log(post);
		await createPost(post);
	}

	return (
		<>
			<Card className="m-3 p-3">
				<PostForm 
					categories={categories}
					maxHeight={maxHeight}
					submitText='Создать'
					submitDisabled={!isCreatingLoading}
					onSubmit={e => {
						handleCreatePost(e);
						onSubmit(e);
					}}
					onCategoryChange={e => setPost({...post, categoryId: e.target.value})}
					onTitleChange={e => setPost({...post, title: e.target.value})}
					onContentChange={e => setPost({...post, content: e.target.value})}
				/>
			</Card>
		</>
	)
}
