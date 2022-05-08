import React, { useState } from 'react'
import PostService from '../api/PostService';
import { useAuth } from '../hooks/useAuth';
import { useFetching } from '../hooks/useFetching';
import { cutText } from '../utils';
import PostForm from './PostForm'

const EditPostForm = ({ categories, initPost, maxHeight }) => {

	const { user } = useAuth();
	const [post, setPost] = useState(initPost);

	const [editPost, isEditLoading, editError] = useFetching(async (edittedPost) => {
		const response = await PostService.editPost(edittedPost);
		console.log('EditPostForm edit post response: ');
		console.log(response);
	})


	const handleEdit = async (e) => {
		e.preventDefault();
		
		const tempPost = {...post, description: cutText(post.content)} 
		console.log(tempPost);
		if ((user.role === 'moderator'
			|| user.role === 'admin'
			|| user.id === post.applicationUserId)
			&& post.content && post.content !== '' && post.title && post.title !== '') {
			await editPost(tempPost);
		}
	}
	return (
		<>
			<PostForm
				initialValue={initPost}
				categories={categories}
				maxHeight={maxHeight}
				submitText='Редактировать'
				onSubmit={handleEdit}
				onCategoryChange={e => setPost({ ...post, categoryId: e.target.value })}
				onContentChange={e => setPost({ ...post, content: e.target.value })}
				onTitleChange={e => setPost({ ...post, title: e.target.value })}
			/>
		</>
	)
}

export default EditPostForm