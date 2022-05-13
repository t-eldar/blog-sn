import React from 'react'
import { Card } from 'react-bootstrap'

const UserItem = ({user}) => {
	return (
		<Card className='d-flex'>
			{user.id}
			{user.userName}
		</Card>
	);
}

export default UserItem