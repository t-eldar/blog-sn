import React from 'react'
import { Card } from 'react-bootstrap'
import UserItem from './UserItem'

const UserList = ({users}) => {

	if (!users) {
		return <h4>
			Пользователи не найдены
		</h4>
	}
	return (
		<>
			<Card>
				<Card.Header>
					Количество пользователей: {users.length}
				</Card.Header>
				<Card.Body>
					{
						users.map(user => <UserItem user={user} />)
					}
				</Card.Body>
			</Card>
		</>
	)
}

export default UserList