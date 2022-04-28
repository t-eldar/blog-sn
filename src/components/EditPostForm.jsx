import React, { useState } from 'react'
import PostService from '../api/PostService';
import { useFetching } from '../hooks/useFetching';
import PostForm from './PostForm'

const EditPostForm = ({ initPost, maxHeight }) => {

	const [post, setPost] = useState(initPost);

	const [editPost, isEditLoading, editError] = useFetching(async (edittedPost) => {
		const response = await PostService.editPost(initPost.id, edittedPost);
		console.log('EditPostForm edit post response: ');
		console.log(response);
	})
	const handleEditPost = () => {
		editPost(post)
	}

	return (
		<>
			<PostForm
				initialValue={initPost}
				categories={categories}
				maxHeight={maxHeight}
				submitText='Редактировать'
				onSubmit={handleEditPost}
				onCategoryChange={e => setPost({ ...post, category: e.target.value })}
				onContentChange={e => setPost({ ...post, content: e.target.value })}
				onTitleChange={e => setPost({ ...post, title: e.target.value })}
			/>
		</>
	)
}

export default EditPostForm