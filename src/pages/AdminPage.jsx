import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../hooks/useAuth'

const AdminPage = () => {

	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user || user.role !== 'Admin') {
			navigate('/', { replace: true })
		}
	}, [user])

	return (
		<RegisterForm isAdminRegister/>
	)
}

export default AdminPage