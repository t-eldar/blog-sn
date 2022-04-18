import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils";

const PostItem = ({ post }) => {

    const subtitleFontSize = '12px';
    
    const navigate = useNavigate();
    const [publishedDate, setPublishedDate] = useState('');
    
    if (!post.user)
        post.user = {
            name: "name in postItem",
        };
    if (!post.description)
        post.description = post.body;
    if (!post.dateCreated)
        post.dateCreated = new Date('April 17, 2022 17:47:00');
    useEffect(() => {
        const formattedDate = formatDate(post.dateCreated);
        setPublishedDate(formattedDate);
    }, []);

    return (
        <Card style={{cursor:"pointer"}} onClick={() => {
            navigate(`/${post.id}`)
        }}>
            <Card.Header>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle
                    className="mb-2 text-muted text-sm-left s"
                    style={{ fontSize: subtitleFontSize }}
                >
                    Автор: {post.user.name}
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
                <Card.Text>{post.description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default PostItem;