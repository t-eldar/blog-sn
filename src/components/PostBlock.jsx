import React, { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap';
import { useSearching } from '../hooks/useSearching';
import { useSorting } from '../hooks/useSorting';
import Loader from './Loader';
import PostFilter from './PostFilter';
import PostList from './PostList'
import PostSearch from './PostSearch';

const PostBlock = ({ posts, fetchPosts, isPostsLoading }) => {

	const [filter, setFilter] = useState('');
	const [query, setQuery] = useState('');

	const sortedPosts = useSorting(posts, filter);
	const searchedPosts = useSearching(sortedPosts, 'title', query)


	return (
		<>
		<PostSearch 
			setQuery={setQuery}
		/>
		<div className='d-flex m-3'>
			<PostFilter filter={filter} setFilter={setFilter} />
			<Button
				variant='outline-dark'
				className='m-2'
				onClick={fetchPosts}
			>
				Обновить {
					isPostsLoading && <Spinner />
				}
			</Button>
		</div>
			{
				isPostsLoading ? 
				<div className='m-5 d-flex justify-content-center'>
					<Loader /> 
				</div>
				:
					<PostList posts={searchedPosts} />
			}
		</>
	)
}

export default PostBlock