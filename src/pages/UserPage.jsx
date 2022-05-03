import React, { useState, useEffect } from 'react'
import { Card, Container, Image, Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import { useFetching } from '../hooks/useFetching';
import AllPostsPage from './AllPostsPage';
import { CreatePostForm } from '../components/CreatePostForm';

const UserPage = ({ categories }) => {

	const params = useParams();
	const [posts, setPosts] = useState();
	const [user, setUser] = useState();

	const [showCreatePostModal, setShowCreatePostModal] = useState(false);
	const [expanded, setExpanded] = useState(false);
	//
	const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
		// api call
	})

	const handleCreatePostModalClose = () => setShowCreatePostModal(false);
	const handleCreatePostModalOpen = () => {
		// console.log(AuthService.getCurrentUser())
		setShowCreatePostModal(true);
		setExpanded(false);
	}

	const AuthorizedNav = () =>
		<Button
			variant="dark"
			onClick={handleCreatePostModalOpen}
		>
			Создать пост
		</Button>

	useEffect(() => {
		const fetchAPI = () => {
			fetchPosts();
		};
		fetchAPI();
	}, [])


	return (
		<>

			<Modal size='lg' show={showCreatePostModal} onHide={handleCreatePostModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Создание новой записи</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* <CreatePostForm
						maxHeight={400}
						categories={categories} /> */}
					<h4>Centered Modal</h4>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
						dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
						consectetur ac, vestibulum at eros.
					</p>
				</Modal.Body>
			</Modal>

			<Container className='d-flex'>
				<Card style={{ width: '18rem', height: '32rem', margin: '5rem' }} className='justify-content-center'>
					<Card.Img style={{ height: '15rem', width: '17.9rem' }}
						variant="top"
						src="https://4kwallpapers.com/images/wallpapers/mount-cook-new-zealand-aoraki-national-park-mountain-peak-5120x3200-3913.jpg" />
					<Card.Body>
						<div className='d-flex justify-content-center'>
							<h2 style={{ top: '30rem' }}>Danila</h2>
						</div>
						<div className='d-flex justify-content-center'>
							<h6 style={{ top: '30rem' }}>Developer stream bla bla</h6>
						</div>
						<br />
						<br />
						<br />
						<br />
						<br />
						<div className='d-flex justify-content-center'>
							<Card className='App justify-content-center'
								style={{ margin: '0,9rem', height: '5rem', width: '5rem' }}>
								<h6>Posts</h6>
								<h8>Count</h8>
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
					</Card.Body>
				</Card>
				<Card style={{ width: '35rem', top: '5rem' }}>
					<Card.Header className='d-flex'>
						<h2>User Posts</h2>
						<AuthorizedNav />
					</Card.Header>
					<Card.Body>
						<AllPostsPage />
					</Card.Body>
				</Card>

			</Container>
			{/* <PostList posts={posts} /> */}
		</>
	)
}

export default UserPage