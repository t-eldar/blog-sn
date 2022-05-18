import React, { useState, useEffect } from 'react'
import { Card, Container, Image, Modal, Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import { useFetching } from '../hooks/useFetching';
import AllPostsPage from './AllPostsPage';
import { CreatePostForm } from '../components/CreatePostForm';
import PostsService from '../api/PostsService';
import AuthService from '../api/AuthService';
import { useAuth } from '../hooks/useAuth';
import UsersService from '../api/UsersService';
import PostBlock from '../components/PostBlock';


const UserPage = () => {

	const params = useParams();
	const navigate = useNavigate();

	const [pageUser, setPageUser] = useState({ userName: '' });
	const [posts, setPosts] = useState([]);

	const [fetchUser, userLoading, userError] = useFetching(async (id) => {
		const response = await UsersService.getById(id);
		setPageUser(response.data);
	})

	const [fetchPosts] = useFetching(async (id) => {
		const response = await UsersService.getPostsByUserId(id);
		setPosts(response.data);
	})
	//
	useEffect(() => {
		const fetchAPI = async () => {
			await fetchUser(params.id);
			await fetchPosts(params.id);
		}
		fetchAPI();
		console.log(pageUser);
	}, [params.id]);
	useEffect(() => {
		if (userError && (userError.response.status === 404
			|| params.id === null
			|| !params.id
		)) {
			navigate('/not-found', { replace: true })
		}
	}, [params.id, userError]);

	return (
		<>
			<Card className='p-4 m-3'>
				<h4>
					{pageUser.userName}
				</h4>
				<span style={
					pageUser.role === 'Admin' ? { color: 'green' } : {
						color: 'blue'
					}}>
					{pageUser.role}
				</span>
				<span>
					Количество постов: {pageUser.postsCount}
				</span>
			</Card>
			<Card className='mt-3'>
				<Card.Header className='pt-3'>
					<h2>Посты пользователя</h2>
				</Card.Header>
				<Card.Body>
					<PostBlock 
						fetchPosts={async () => await fetchPosts(params.id)} 
						posts={posts} 
					/>
				</Card.Body>
			</Card>
		</>
	)
}

export default UserPage