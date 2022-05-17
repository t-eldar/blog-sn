import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from '../../components/AdminNavBar';
import RegisterForm from '../../components/RegisterForm';
import { useAuth } from '../../hooks/useAuth'

const AdminPage = () => {

	const { user } = useAuth();
	const navigate = useNavigate();

	// useEffect(() => {
	// 	if (!user || user.role !== 'Admin') {
	// 		navigate('/', { replace: true })
	// 	}
	// }, [user])

	return (
		<>
			<Card className='m-5 p-3 d-flex justify-content-center'>
				<h1>
					Админка.
				</h1>
				<h4>
					Тут можно:
				</h4>
				<span>
					Удалять и изменять пользователей
				</span>
				<span>
					Регистрировать нового админа
				</span>
			</Card>
		</>

	)
}

export default AdminPage