import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts }) => {

	if (!posts.length) {
		return (
			<h1 style={{ textAlign: 'center' }}>
				Посты не найдены
			</h1>
		)
	}

	return (
		<>
			{posts.map(post =>
				<PostItem key={post.id} post={post} />
			)}
		</>
	);
}

export default PostList;