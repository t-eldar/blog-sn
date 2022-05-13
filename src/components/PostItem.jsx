import React, { useEffect, useState } from "react";
import { Card, Button, CloseButton } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RatingsService from "../api/RatingsService";
import { useAuth } from "../hooks/useAuth";
import { useFetching } from "../hooks/useFetching";
import { formatDate } from "../utils";

const PostItem = ({ post }) => {

	const { user } = useAuth();

	const subtitleFontSize = '12px';
	const location = useLocation();
	const navigate = useNavigate();
	const [publishedDate, setPublishedDate] = useState('');

	useEffect(() => {
		const formattedDate = formatDate(post.dateCreated);
		setPublishedDate(formattedDate);
	}, [post]);

	// const [rating, setRating] = useState();
	// const [postRating, postRatingLoading, postRatingError] = useFetching(async (rate) => {
	// 	const response = await RatingsService.postRating(rate);
	// 	console.log('postRating response');
	// 	console.log(response)
	// })
	// const [putRating, putRatingLoading, putRatingError] = useFetching(async (rate) => {
	// 	const response = await RatingsService.putRating(rate);
	// 	console.log('putRating response');
	// 	console.log(response)
	// })
	// const [ratingExists, setRatingExists] = useState(false);
	// useEffect(() => {
	// 	if (postRatingError && postRatingError.response.data.message
	// 		&& postRatingError.response.data.message.includes('exist'))
	// 		setRatingExists(true);
	// }, [postRatingError])

	// useEffect(() => {
	// 	if (rating) {
	// 		if (ratingExists) {
	// 			const fetchAPI = async () => {
	// 				await putRating(rating);
	// 			}
	// 			fetchAPI();
	// 		} else {
	// 			const fetchAPI = async () => {
	// 				await postRating(rating);
	// 			}
	// 			fetchAPI();
	// 		}
	// 	}
	// }, [rating, ratingExists])


	return (
		<Card
			border='dark'
			className="m-3"
		>
			<Card.Header>
				<Card.Title>{post.title}</Card.Title>
				<div className="d-flex justify-content-between">
					<div>
						<Card.Subtitle
							className="mb-2 text-muted text-sm-left s"
							style={{ cursor: "pointer", fontSize: subtitleFontSize }}
							onClick={() => navigate(`/users/${post.applicationUserId}`, {
								state: { from: location }
							})}
						>
							Автор: {post.applicationUser ? post.applicationUser.userName : 'Нет автора'}
						</Card.Subtitle>
						<Card.Subtitle
							className="mb-2 text-muted"
							style={{ fontSize: subtitleFontSize }}
						>
							Опубликовано:
							{' ' + publishedDate}
						</Card.Subtitle>
					</div>
					<Link to={post.category ? `/category/${post.category.id}` : '/'}>
						{post.category ? post.category.name : 'Нет категории'}
					</Link>
				</div>
			</Card.Header>
			<Card.Body
				style={{ cursor: "pointer" }}
				onClick={() => {
					navigate(`/posts/${post.id}`)
				}}
			>
				<Card.Text>{post.description}</Card.Text>
			</Card.Body>
			{/* <Card.Footer className="d-flex justify-content-between">
				<div>
					Комментариев: {post.commentsCount}
				</div>
				<div className="d-flex mx-3">
					<Button
						onClick={() => {
							setRating({
								applicationUserId: user.id,
								likeStatus: true,
								postId: post.id
							});
						}}
					>
						+
					</Button>
					{post.ratingCount}
					<Button
						onClick={() => {
							setRating({
								applicationUserId: user.id,
								likeStatus: false,
								postId: post.id
							});
						}}
					>
						-
					</Button>
				</div>
			</Card.Footer> */}
		</Card>
	);
}

export default PostItem;