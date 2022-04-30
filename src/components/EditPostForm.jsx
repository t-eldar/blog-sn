import React, { useState } from 'react'
import PostService from '../api/PostService';
import { useAuth } from '../hooks/useAuth';
import { useFetching } from '../hooks/useFetching';
import PostForm from './PostForm'

const EditPostForm = ({ categories, initPost, maxHeight }) => {

	const {user} = useAuth();
	const [post, setPost] = useState(initPost);

	const [editPost, isEditLoading, editError] = useFetching(async (edittedPost) => {
		const response = await PostService.editPost(initPost.id, edittedPost);
		console.log('EditPostForm edit post response: ');
		console.log(response);
	})
	

	const handleEdit = async () => {
		if ((user.role === 'moderator'
			|| user.role === 'admin'
			|| user.id === post.user.id)
			&& post.content && post.content !== '' && post.title && post.title !== '') {
			await editPost(post.id, post);
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
				onCategoryChange={e => setPost({ ...post, category: e.target.value })}
				onContentChange={e => setPost({ ...post, content: e.target.value })}
				onTitleChange={e => setPost({ ...post, title: e.target.value })}
			/>
		</>
	)
}

export default EditPostForm