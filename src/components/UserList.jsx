import React, { useState } from 'react'
import { Button, Card, Modal, Table } from 'react-bootstrap'
import UsersService from '../api/UsersService'
import { useFetching } from '../hooks/useFetching'
import EditUserForm from './EditUserForm'

const UserList = ({ users, onSuccess = () => null }) => {

	const [editingUser, setEditingUser] = useState();

	const [showEditUserModal, setShowEditUserModal] = useState(false);
	const handleEditUserModalClose = () => setShowEditUserModal(false);
	const handleEditUserModalOpen = () => setShowEditUserModal(true);

	const [deleteUser, deleteLoading, deleteError] = useFetching(async (id) => {
		await UsersService.deleteUserById(id);
		onSuccess();
	})
	const handleDelete = async (id) => {
		await deleteUser(id);
	}
	const handleEdit = async (user) => {
		setEditingUser(user);
		setShowEditUserModal(true);
	}

	if (!users) {
		return <h4>
			Пользователи не найдены
		</h4>
	}
	return (
		<>

			<Modal show={showEditUserModal} onHide={handleEditUserModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Редактирование пользователя</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EditUserForm 
						user={editingUser}
						onSuccess={() => {
							handleEditUserModalClose();
							onSuccess();
						}} 
					/>
				</Modal.Body>
			</Modal>
			<Card>
				<Card.Header>
					Количество пользователей: {users.length}
				</Card.Header>
				<Card.Body>
					<Table>
						<thead>
							<tr>
								<th>id</th>
								<th>Имя пользователя</th>
								<th>Email</th>
								<th>Роль</th>
								<th>Количество постов</th>
								<th></th>
								<th></th>
							</tr>
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