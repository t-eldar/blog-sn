import React from 'react'
import { Form } from 'react-bootstrap'

const PostFilter = ({ filter, setFilter }) => {
	return (
		<>
			<Form.Select 
				className='mt-1'
				onChange={e => setFilter(e.target.value)}
			>
				<option value='title'>По заголовку</option>
				<option value='description'>По описанию</option>
				<option value='dateCreated'>По дате</option>
				<option value='commentsCount'>Самые обсуждаемые</option>
				<option value='ratingCount'>Самые интересные</option>
			</Form.Select>
		</>
	)
}

export default PostFilter