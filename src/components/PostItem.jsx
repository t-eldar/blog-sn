import React, { useEffect, useState } from "react";
import { Card, Button, CloseButton } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RatingsService from "../api/RatingsService";
import { useAuth } from "../hooks/useAuth";
import { useFetching } from "../hooks/useFetching";
import { formatDate } from "../utils";
import dislike from "../image/dislike.svg";
import like from "../image/like.svg";

const PostItem = ({ post, setRating }) => {

	const { user } = useAuth();

	const subtitleFontSize = '12px';
	const location = useLocation();
	const navigate = useNavigate();
	const [publishedDate, setPublishedDate] = useState('');

	const [ratingCount, setRatingCount] = useState(post.ratingCount);

	useEffect(() => {
		const formattedDate = formatDate(post.dateCreated);
		setPublishedDate(formattedDate);
	}, [post]);

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
			<Card.Footer className="d-flex justify-content-between">
				<div>
					Комментариев: {post.commentsCount}
				</div>
				<div className="d-flex mx-3">
					<Button
						onClick={() => {
							if (!user) {
								navigate('/login');
							} else {
								setRating({
									id: post.id + user.id,
									applicationUserId: user.id,
									likeStatus: true,
									postId: post.id
								});
								setRatingCount(ratingCount + 1)
							}
						}}
						variant="light"
					>
						<img src = {like}/>
					</Button>
					{ratingCount}
					<Button
						onClick={() => {
							if (!user) {
								navigate('/login');
							} else {
								setRating({
									id: post.id + user.id,
									applicationUserId: user.id,
									likeStatus: false,
									postId: post.id
								});
							}
							setRatingCount(ratingCount - 1)
						}}
						variant="light"
					>
						<img src={dislike}/>
					</Button>
				</div>
			</Card.Footer>
		</Card>
	);
}

export default PostItem;