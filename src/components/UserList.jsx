import React from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import UsersService from '../api/UsersService'
import { useFetching } from '../hooks/useFetching'

const UserList = ({users}) => {


	const [editUser, editLoading, editError] = useFetching(async (user) => {
		const reponse = await UsersService.editUser(user);
	})
	const [deleteUser, deleteLoading, deleteError] = useFetching(async (id) => {
		const reponse = await UsersService.deleteUserById(id);
	})
	const handleEdit = async (user) => {
		
	}
	const handleDelete = async (id) => {
		await deleteUser(id);
	}


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
					<Table>
						<thead>
							<th>id</th>
							<th>Имя пользователя</th>
							<th>Email</th>
							<th>Роль</th>
							<th>Количество постов</th>
							<th></th>
							<th></th>
						</thead>
						<tbody>
							{
								users.map(user => 
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>{user.userName}</td>
									<td>{user.email}</td>
									<td>{user.role}</td>
									<td>{user.postsCount}</td>
									<td><Button
										variant='warning'
										onClick={(e) => handleEdit(user)}
									>
										Изменить
									</Button></td>
									<td><Button
										variant='danger'
										onClick={(e) => handleDelete(user.id)}
									>
										Удалить
									</Button></td>
								</tr>)
							}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		</>
	)
}

export default UserList