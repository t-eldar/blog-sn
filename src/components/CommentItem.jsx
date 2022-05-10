import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils';

const CommentItem = ({ comment }) => {

	const navigate = useNavigate();

	const subtitleFontSize = '12px';

	const [publishedDate, setPublishedDate] = useState('');

	useEffect(() => {
		const formattedDate = formatDate(comment.dateCreated);
		setPublishedDate(formattedDate);
	}, [comment]);

	return (
		<>
			<Card className='m-1 mb-3'>  
				<Card.Header>
					<Card.Subtitle
						className="m-2 text-muted text-sm-left s"
						style={{ cursor: "pointer", fontSize: subtitleFontSize }}
						onClick={() => navigate(`/users/${comment.applicationUserId}`)}
					>
						Автор: {comment.applicationUser ? comment.applicationUser.userName : 'Нет автора'}
					</Card.Subtitle>
					<Card.Subtitle
						className="mb-2 text-muted"
						style={{ fontSize: subtitleFontSize }}
					>
						Опубликовано:
						{' ' + publishedDate}
					</Card.Subtitle>
				</Card.Header>
				<Card.Body>
					<Card.Text>{comment.content}</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
}

export default CommentItem