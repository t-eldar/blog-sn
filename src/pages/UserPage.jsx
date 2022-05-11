import React, { useState, useEffect } from 'react'
import { Card, Container, Image, Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import { useFetching } from '../hooks/useFetching';
import AllPostsPage from './AllPostsPage';
import { CreatePostForm } from '../components/CreatePostForm';
import PostsService from '../api/PostsService';
import AuthService from '../api/AuthService';
import { useAuth } from '../hooks/useAuth';
import UserService from '../api/UserService';


const UserPage = () => {

	const params = useParams();

	const [pageUser, setPageUser] = useState({ userName: '' });
	const [posts, setPosts] = useState([]);

	const [fetchUser] = useFetching(async (id) => {
		const responce = await UserService.getById(id);
		setPageUser(responce.data);
	})

	const [fetchPosts] = useFetching(async (id) => {
		const responce = await UserService.getPostsByUserId(id);
		setPosts(responce.data);
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


	return (
		<>
			<Container className='d-flex justify-content-center'>
				<Card style={{ width: '16.87rem', height: '15rem', top: '1rem', marginBottom: '1rem', marginLeft: '1.5rem'  }} className='d-flex'>
					<Card.Img style={{ height: '15rem', width: '16.87rem' }}
						variant="top"
						src="https://4kwallpapers.com/images/wallpapers/mount-cook-new-zealand-aoraki-national-park-mountain-peak-5120x3200-3913.jpg" />
					<Card.ImgOverlay>
						<Card.Title>{pageUser.userName}</Card.Title>
					</Card.ImgOverlay>
				</Card>
				<Card style={{ top: '1rem', marginBottom: '1rem', marginLeft: '6rem', width: '30rem' }}>
					<Card.Body style={{marginTop: '7.8rem'}}>
						<div className='d-flex justify-content-center' >
							<Card className='App justify-content-center'
								style={{ margin: '0,9rem', height: '5rem', width: '7rem' }}>
								<h6>Posts</h6>
								<h8>{posts.length}</h8>
							</Card>
						</div>
					</Card.Body>
				</Card>
			</Container>
			<Card style={{ width: '50rem', top: '1rem', marginLeft: '3rem' }}>
				<Card.Header className='d-flex'>
					<h2>User Posts</h2>
				</Card.Header>
				<Card.Body>
					<PostList posts={posts} />
				</Card.Body>
			</Card>
		</>
	)
}

export default UserPage