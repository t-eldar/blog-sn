import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

const PostItem = ({ post }) => {

    const subtitleFontSize = '12px';
    
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
        const currentDate = new Date();
        const date = post.dateCreated;

        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();
        
        if (day < 10)
            day = `0${day}`;
        if (month < 10)
            month = `0${month}`;
        if (minute < 10)
            minute = `0${minute}`;

        console.log(currentDate);
        console.log(date);

        if (currentDate.getFullYear() !== year)
            setPublishedDate(
                `${day}.${month}.${year} 
                ${hour}:${minute}`);
        else if (currentDate.getMonth() != month)
            setPublishedDate(
                `${day}.${month}
                ${hour}:${minute}`);
        else if (currentDate.getDate() != day)
            setPublishedDate(
                `${day}.${month}
                ${hour}:${minute}`);
        else if (currentDate.getHours() - hour >= 1)
            setPublishedDate(currentDate.getHours() - hour + ' час')
        else if (currentDate.getMinutes() - minute >= 1)
            setPublishedDate(currentDate.getMinutes() - minute + ' мин');
        else if (currentDate.getSeconds() - date.getSeconds() < 60)
            setPublishedDate('только что');
        else 
            setPublishedDate(
                `${day}.${month}.${year} 
                ${hour}:${minute}`);
        console.log(currentDate.getMonth() !== month)
    }, []);

    return (
        <Card className="w-50 mb-0 mt-3">
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