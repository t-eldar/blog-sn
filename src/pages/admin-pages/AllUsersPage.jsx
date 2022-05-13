import React, { useEffect, useState } from 'react'
import UsersService from '../../api/UsersService';
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
		<div className='m-5 p-2'>		
			<UserList users={users} />
		</div>
	)
}

export default AllUsersPage