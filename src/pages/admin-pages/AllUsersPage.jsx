import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import AuthService from '../../api/AuthService';
import UsersService from '../../api/UsersService';
import EditUserForm from '../../components/EditUserForm';
import UserList from '../../components/UserList';
import { useFetching } from '../../hooks/useFetching'

const AllUsersPage = () => {

	const [users, setUsers] = useState();

	const [fetchUsers, isUsersLoading, usersError] = useFetching(async () => {
		const response = await UsersService.getAll();
		setUsers(response.data);
	});

	useEffect(() => {
		const fetchAPI = async () => {
			await fetchUsers();
		}
		fetchAPI();
	}, [])

	return (
		<>
			<div className='m-5 p-2'>
			<Button
				className='m-3' 
				onClick={async () => await fetchUsers()}
				variant='outline-dark'
			>
				Обновить
			</Button>
				<UserList
					users={users}
					onSuccess={fetchUsers}
				/>
			</div>
		</>
	)
}

export default AllUsersPage