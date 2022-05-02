import React, { useState, useEffect } from 'react'
import { Card, Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import { useFetching } from '../hooks/useFetching';
import AllPostsPage from './AllPostsPage';

const UserPage = () => {

	const params = useParams();
	const [posts, setPosts] = useState();
	const [user, setUser] = useState();
	//
	const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
		// api call
	})

	useEffect(() => {
		const fetchAPI = () => {
			fetchPosts();
		};
		fetchAPI();
	}, [])


	return (
		<>
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
					<Card.Header><h2>User Posts</h2></Card.Header>
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