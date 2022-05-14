import React, { useEffect, useState } from "react";
import RatingsService from "../api/RatingsService";
import { useFetching } from "../hooks/useFetching";
import { useSorting } from "../hooks/useSorting";
import PostFilter from "./PostFilter";
import PostItem from "./PostItem";

const PostList = ({ posts }) => {

	const [rating, setRating] = useState();
	const [postRating, postRatingLoading, postRatingError] = useFetching(async (rate) => {
		const response = await RatingsService.postRating(rate);
		console.log('postRating response');
		console.log(response)
	})

	const [putRating, putRatingLoading, putRatingError] = useFetching(async (rate) => {
		const response = await RatingsService.putRating(rate);
		console.log('putRating response');
		console.log(response)
	})
	const [ratingExists, setRatingExists] = useState({
		id: '',
		exists: false,
	});
	useEffect(() => {
		if (postRatingError && postRatingError.response.data.message
			&& postRatingError.response.data.message.includes('exist'))
			setRatingExists({
				id: rating.id,
				exists: true,
			});
	}, [postRatingError])

	useEffect(() => {
		if (rating) {
			if (rating.id == ratingExists.id) {
				const fetchAPI = async () => {
					console.log(rating)
					await putRating(rating);
				}
				fetchAPI();
			} else {
				const fetchAPI = async () => {
					await postRating(rating);
				}
				fetchAPI();
			}
		}
	}, [rating, ratingExists])

	const [filter, setFilter] = useState();

	const sortedPosts = useSorting(posts, filter);

	if (!posts.length) {
		return (
			<h1 style={{ textAlign: 'center', bottom: '20rem' }}>
				Посты не найдены
			</h1>
		)
	}
	return (
		<>
			<PostFilter filter={filter} setFilter={setFilter}/>
			{sortedPosts.map(post =>
				<PostItem key={post.id} post={post} setRating={setRating} />
			)}
		</>
	);
}

export default PostList;