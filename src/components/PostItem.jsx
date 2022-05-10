import React, { useEffect, useState } from "react";
import { Card, Button, CloseButton } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../utils";

const PostItem = ({ post }) => {

	const subtitleFontSize = '12px';

	const location = useLocation();
	const navigate = useNavigate();
	const [publishedDate, setPublishedDate] = useState('');

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
								state: {from: location}
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
		</Card>
	);
}

export default PostItem;