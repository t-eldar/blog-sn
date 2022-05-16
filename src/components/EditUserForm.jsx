import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import UsersService from '../api/UsersService'
import { useFetching } from '../hooks/useFetching'

const EditUserForm = ({ user, onSuccess = () => null }) => {

	const [editingUser, setEditingUser] = useState(user)
	const [editUser, editLoading, editError] = useFetching(async (u) => {
		await UsersService.editUser(u);
		onSuccess();
	})
	const handleEdit = async (e) => {
		e.preventDefault();
		await editUser(editingUser);
	}

	return (
		<>
			<Form.Control
				className='mt-3 p-3'
				defaultValue={user.userName}
				onChange={e => setEditingUser({ ...editingUser, userName: e.target.value })}
			/>
			<Form.Control
				className='mt-3 p-3'
				defaultValue={user.email}
				onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
			/>
			<Button
				className='m-3 p-3'
				onClick={handleEdit}
			>
				Редактировать
			</Button>
		</>
	)
}

export default EditUserForm