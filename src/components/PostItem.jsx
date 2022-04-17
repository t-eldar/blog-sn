import React from "react";
import { Card, Button } from "react-bootstrap";

const PostItem = ({ post }) => {

    const subtitleFontSize = '12px';
    
    if (!post.user)
        post.user = {
            name: "name in postItem",
        };
    if (!post.description)
        post.description = post.body;
    if (!post.dateCreated)
        post.dateCreated = new Date();
    return (
        <Card className="w-50 mb-3">
            <Card.Header>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle 
                    className="mb-2 text-muted text-sm-left s"
                    style={{fontSize: subtitleFontSize}}
                >
                    Автор: {post.user.name}
                </Card.Subtitle>
                <Card.Subtitle 
                    className="mb-2 text-muted"
                    style={{fontSize: subtitleFontSize}}
                >
                    Опубликовано:
                    { post.dateCreated.getFullYear()+'-'+
                    (post.dateCreated.getMonth()+1)+'-'+
                    post.dateCreated.getDate()}
                </Card.Subtitle>
            </Card.Header>
            <Card.Body>
                <Card.Text>{post.description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default PostItem;