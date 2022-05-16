import React, { useEffect, useState } from "react";
import RatingsService from "../api/RatingsService";
import { useFetching } from "../hooks/useFetching";
import { useSorting } from "../hooks/useSorting";
import PostFilter from "./PostFilter";
import PostItem from "./PostItem";

const PostList = ({ posts }) => {

	if (!posts.length) {
		return (
			<h1 style={{ textAlign: 'center', bottom: '20rem' }}>
				Посты не найдены
			</h1>
		)
	}
	return (
		<>
			{posts.map(post =>
				<PostItem 
					key={post.id} 
					post={post} 
				/>
			)}
		</>
	);
}

export default PostList;