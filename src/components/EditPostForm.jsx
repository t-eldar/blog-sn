import React, { useState } from 'react'
import PostsService from '../api/PostsService';
import { useAuth } from '../hooks/useAuth';
import { useEditAllow } from '../hooks/useEditAllow';
import { useFetching } from '../hooks/useFetching';
import { cutText } from '../utils';
import PostForm from './PostForm'

const EditPostForm = ({ categories, initPost, maxHeight, onSubmit = () => null}) => {

	const [post, setPost] = useState(initPost);

	const [editPost, isEditLoading, editError] = useFetching(async (edittedPost) => {
		const response = await PostsService.editPost(edittedPost);
		console.log('EditPostForm edit post response: ');
		console.log(response);
		if (response) {
			await onSubmit();
		}
	})

	const isEditAllowed = useEditAllow(post);

	const handleEdit = async (e) => {
		e.preventDefault();
		
		const tempPost = {...post, description: cutText(post.content, 200)} 
		console.log(tempPost);
		if (isEditAllowed
			&& post.content && post.content !== '' && post.title && post.title !== '') {
			await editPost(tempPost);
		}
	}
	return (
		<>
			<PostForm
				post={post}
				setPost={setPost}
				initialValue={initPost}
				categories={categories}
				maxHeight={maxHeight}
				submitDisabled={isEditLoading}
				submitText='Редактировать'
				onSubmit={async e => {
					handleEdit(e);
				}}
			/>
		</>
	)
}

export default EditPostForm