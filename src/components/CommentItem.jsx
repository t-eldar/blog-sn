import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEditAllow } from '../hooks/useEditAllow';
import { formatDate } from '../utils';
import _delete from "../icons/delete.svg";
import edit from "../icons/edit.svg"

const CommentItem = ({ comment, onCommentDelete, onEdit = (com) => null }) => {

	const navigate = useNavigate();
	const location = useLocation();
	const subtitleFontSize = '12px';

	const [publishedDate, setPublishedDate] = useState('');

	useEffect(() => {
		const formattedDate = formatDate(comment.createdDate);
		setPublishedDate(formattedDate);
	}, [comment]);

	const isEditAllowed = useEditAllow(comment);


	const handleDeleting = (e) => {
		e.preventDefault();
		if (isEditAllowed) {
			onCommentDelete(comment.id);
		}
	}
	const handleEdit = (e) => {
		e.preventDefault();
		if (isEditAllowed) {
			onEdit(comment);
		}
	}

	return (
		<>
			<Card className='m-1 mb-3'>
				<Card.Header className='d-flex justify-content-between'>
					<div >
						<Card.Subtitle
							className="m-2 text-muted text-sm-left s"
							style={{ cursor: "pointer", fontSize: subtitleFontSize }}
							onClick={() => navigate(`/users/${comment.applicationUserId}`, {
								state: { from: location }
							})}
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
					</div>
					<div className='m-2'>
						{
							isEditAllowed &&
							<>
								<Button
									className='mx-2'
									variant="outline-dark"
									onClick={handleEdit}
								>
									<div className="d-flex justify-content-center">
										<h6>Изменить</h6>
										<img src={edit} />
									</div>
								</Button>
								<Button
									className='mx-2'
									variant="outline-dark"
									onClick={handleDeleting}
								>
									<div className="d-flex justify-content-center">
										<h6>Удалить</h6>
										<img src={_delete} />
									</div>
								</Button>
							</>
						}
					</div>
				</Card.Header>
				<Card.Body>
					<Card.Text>{comment.content}</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
}

export default CommentItem