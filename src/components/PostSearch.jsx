import React from 'react'
import { Form } from 'react-bootstrap'

const PostSearch = ({ query, setQuery }) => {
	return (
		<div className='m-3'>
			<Form.Control
				className='p-2'
				placeholder='Поиск'
				onChange={e => setQuery(e.target.value)}
			/>
		</div>
	)
}

export default PostSearch