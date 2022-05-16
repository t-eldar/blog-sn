import React, { useEffect, useState } from "react";
import { Card, Button, CloseButton } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RatingsService from "../api/RatingsService";
import { useAuth } from "../hooks/useAuth";
import { useFetching } from "../hooks/useFetching";
import { formatDate } from "../utils";
import dislike from "../icons/dislike.svg";
import like from "../icons/like.svg";
import PostsService from "../api/PostsService";

const PostItem = ({ post }) => {

	const { user } = useAuth();

	const [currentPost, setCurrentPost] = useState(post);
	const [rating, setRating] = useState()
	const [ratingExists, setRatingExists] = useState(false);

	const subtitleFontSize = '12px';
	const location = useLocation();
	const navigate = useNavigate();
	const [publishedDate, setPublishedDate] = useState('');
	const [fetchPost, isPostLoading, fetchPostError] = useFetching(async (id) => {
		const response = await PostsService.getById(id);
		setCurrentPost(response.data);
	})

	useEffect(() => {
		setPublishedDate(formatDate(post.dateCreated))
	}, [currentPost])

	const handleLike = async (status) => {
		if (!user) {
			navigate('/login');
			return;
		}
		try {
			await RatingsService.postRating({
				id: currentPost.id + user.id,
				postId: currentPost.id,
				applicationUserId: user.id,
				likeStatus: status,
			})
		} catch (e) {
			if (e.response.data.message.includes('exist')) {
				await RatingsService.deleteRating(currentPost.id + user.id)
				await RatingsService.postRating({
					id: currentPost.id + user.id,
					postId: currentPost.id,
					applicationUserId: user.id,
					likeStatus: status,
				})
			}
		}

		await fetchPost(currentPost.id);
	}

	return (
		<Card
			border='dark'
			className="m-3"
		>
			<Card.Header>
				<Card.Title>{currentPost.title}</Card.Title>
				<div className="d-flex justify-content-between">
					<div>
						<Card.Subtitle
							className="mb-2 text-muted text-sm-left s"
							style={{ cursor: "pointer", fontSize: subtitleFontSize }}
							onClick={() => navigate(`/users/${currentPost.applicationUserId}`, {
								state: { from: location }
							})}
						>
							Автор: {currentPost.applicationUser ? currentPost.applicationUser.userName : 'Нет автора'}
						</Card.Subtitle>
						<Card.Subtitle
							className="mb-2 text-muted"
							style={{ fontSize: subtitleFontSize }}
						>
							Опубликовано:
							{' ' + publishedDate}
						</Card.Subtitle>
					</div>
					<Link to={currentPost.category ? `/category/${currentPost.category.id}` : '/'}>
						{currentPost.category ? currentPost.category.name : 'Нет категории'}
					</Link>
				</div>
			</Card.Header>
			<Card.Body
				style={{ cursor: "pointer" }}
				onClick={() => {
					navigate(`/posts/${currentPost.id}`)
				}}
			>
				<Card.Text>{currentPost.description}</Card.Text>
			</Card.Body>
			<Card.Footer className="d-flex justify-content-between">
				<div>
					Комментариев: {currentPost.commentsCount}
				</div>
				<div className="d-flex mx-3">
					<Button
						onClick={async () => {
							await handleLike(true)
						}}
						variant="light"
					>
						<img src={like} width='20' height='20' />
					</Button>
					{currentPost.ratingCount}
					<Button
						onClick={async () => {
							await handleLike(false)
						}}
						variant="light"
					>
						<img src={dislike} width='20' height='20' />
					</Button>
				</div>
			</Card.Footer>
		</Card>
	);
}

export default PostItem;