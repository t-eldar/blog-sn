import React, { useEffect, useState } from 'react'
import { Badge, Button, FloatingLabel, Form } from 'react-bootstrap'
import UsersService from '../api/UsersService'
import { useFetching } from '../hooks/useFetching'
import { useValidation } from '../hooks/useValidation'

const EditUserForm = ({ user, onSuccess = () => null }) => {

	const [newName, setNewName] = useState(user.userName);
	const [newEmail, setNewEmail] = useState(user.email);
	const [isAdmin, setIsAdmin] = useState(user.role === 'Admin');

	const handleEdit = async (e) => {
		console.log(newName);
		console.log(newEmail);
		console.log(isAdmin);

		e.preventDefault();
		if (user.userName !== newName && newName !== '') {
			await UsersService.editUsername(user.id, newName);
		}
		if (user.email !== newEmail && newEmail !== '') {
			await UsersService.editEmail(user.id, newEmail);
		}
		if (isAdmin) {
			await UsersService.updateToAdmin(user.id);
		}
		onSuccess();
	}

	const [isEmailInvalid, emailErrorMessage] = useValidation(newEmail, [
		(email) => {
			const emailRegEx =
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			return {
				message: 'Неверная почта',
				invalid: !emailRegEx.test(email)
			}
		}
	]);
	const [isUsernameInvalid, usernameErrorMessage] = useValidation(newName, [
		(username) => {
			const usernameRegEx = /^[A-Za-zА-Яа-я0-9]+$/;
			return {
				message: 'Имя пользователя должно содержать только латинские или кириллические буквы или цифры',
				invalid: !usernameRegEx.test(username)
			}
		}
	]);
	return (
		<>
			<FloatingLabel>
				<Form.Control
					className='mt-3 p-3'
					defaultValue={user.userName}
					onChange={e => setNewName(e.target.value)}
					isInvalid={isUsernameInvalid}
				/>
				<Form.Control.Feedback type='invalid'>
					{usernameErrorMessage}
				</Form.Control.Feedback>
			</FloatingLabel>
			<>
				<Form.Control
					className='mt-3 p-3'
					defaultValue={user.email}
					onChange={e => setNewEmail(e.target.value)}
					isInvalid={isEmailInvalid}
				/>
				<Form.Control.Feedback type='invalid'>
					{emailErrorMessage}
				</Form.Control.Feedback>
			
			</>
			<div className='m-3 d-flex'>
				<Form.Check
					disabled={user.role === 'Admin'}
					defaultChecked={user.role === 'Admin'}
					type='switch'
					label='Повысить роль до админа'
					onChange={e => setIsAdmin(e.target.value)}
				/>
				<Badge
					className='mx-2'
					bg='danger'
				>
					Это действие необратимо!
				</Badge>
			</div>
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