import React, { useState, useEffect } from 'react'
import { Card, Container, Image, Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import { useFetching } from '../hooks/useFetching';
import AllPostsPage from './AllPostsPage';
import { CreatePostForm } from '../components/CreatePostForm';
import PostService from '../api/PostService';
import AuthService from '../api/AuthService';
import { useAuth } from '../hooks/useAuth';
import UserService from '../api/UserService';


const UserPage = () => {

	const params = useParams();

	const [pageUser, setPageUser] = useState({ userName: '' });
	const [posts, setPosts] = useState([]);

	const [showCreatePostModal, setShowCreatePostModal] = useState(false);
	const [expanded, setExpanded] = useState(false);
	//
	const [categories, setCategories] = useState([]);

	const [fetchCategories, isLoading, categoriesError] = useFetching(async () => {
		const response = await PostService.getAllCategories();
		console.log(response.data)
		setCategories(response.data);
	})

	const [fetchUserId] = useFetching(async (id) => {
		const responce = await UserService.getUserById(id);
		setPageUser(responce.data);
	})

	const [fetchUserPosts] = useFetching(async (id) => {
		const responce = await UserService.getUserPostsById(id);
		setPosts(responce.data);
	})
	//
	useEffect(() => {
		const fetchAPI = async () => {
			await fetchCategories();
			await fetchUserId(params.id);
			await fetchUserPosts(params.id);
		}
		fetchAPI();
		console.log(pageUser);
	}, [params.id]);

	const handleCreatePostModalClose = () => setShowCreatePostModal(false);
	const handleCreatePostModalOpen = () => {
		// console.log(AuthService.getCurrentUser())
		setShowCreatePostModal(true);
		setExpanded(false);
	}


	return (
		<>

			<Modal size='lg' show={showCreatePostModal} onHide={handleCreatePostModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Создание новой записи</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CreatePostForm
						maxHeight={400}
						categories={categories}
					/>
				</Modal.Body>
			</Modal>

			<Container className='d-flex justify-content-center'>
				<Card style={{ width: '16.87rem', height: '15rem', top: '1rem', marginBottom: '1rem', marginLeft: '1.5rem'  }} className='d-flex'>
					<Card.Img style={{ height: '15rem', width: '16.87rem' }}
						variant="top"
						src="https://4kwallpapers.com/images/wallpapers/mount-cook-new-zealand-aoraki-national-park-mountain-peak-5120x3200-3913.jpg" />
					<Card.ImgOverlay>
						<Card.Title>{pageUser.userName}</Card.Title>
					</Card.ImgOverlay>
					{/* <Card.Body>
						<div className='d-flex justify-content-center'>
							<h2 style={{ top: '30rem' }}>{pageUser.userName}</h2>
						</div>
						<div className='d-flex justify-content-center'>
							<h6 style={{ top: '30rem' }}>Developer stream bla bla</h6>
						</div>
						<br />
						<br />
						<br />
						<br />
						<br />
						<div className='d-flex justify-content-center' >
							<Card className='App justify-content-center'
								style={{ margin: '0,9rem', height: '5rem', width: '5rem' }}>
								<h6>Posts</h6>
								<h8>{posts.length}</h8>
							</Card>
							<hr />
							<Card className='App justify-content-center'
								style={{ margin: '0,9rem', height: '5rem', width: '5rem' }}>
								<h6>Followers</h6>
								<h8>Count</h8>
							</Card>
							<hr />
							<Card className='App justify-content-center'
								style={{ margin: '0,9rem', height: '5rem', width: '5rem' }}>
								<h6>Following</h6>
								<h8>Count</h8>
							</Card>
						</div>
					</Card.Body> */}
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
				{/* <Card style={{ width: '50rem', top: '1rem', marginLeft: '3rem' }}>
					<Card.Header className='d-flex'>
						<h2>User Posts</h2>
						<Button
							variant="dark"
							onClick={handleCreatePostModalOpen}
							style={{ marginLeft: '10rem' }}
						>
							Создать пост
						</Button>
					</Card.Header>
					<Card.Body>
						<PostList posts={posts} />
					</Card.Body>
				</Card> */}
			</Container>
			<Card style={{ width: '50rem', top: '1rem', marginLeft: '3rem' }}>
				<Card.Header className='d-flex'>
					<h2>User Posts</h2>
					<Button
						variant="dark"
						onClick={handleCreatePostModalOpen}
						style={{ marginLeft: '10rem' }}
					>
						Создать пост
					</Button>
				</Card.Header>
				<Card.Body>
					<PostList posts={posts} />
				</Card.Body>
			</Card>
			{/* <PostList posts={posts} /> */}
		</>
	)
}

export default UserPage