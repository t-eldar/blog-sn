import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'

const LoginPage = () => {

	const { user } = useAuth();

	const location = useLocation();
	const navigate = useNavigate();
	const fromPage = location.state?.from?.pathname || '/';

	useEffect(() => {
		if (user && (!fromPage || !fromPage.state?.from)) {
			navigate('/', { replace: true })
		}
	}, [user])

	return (
		<div className='d-flex justify-content-center'>
			<LoginForm
				style={{ width: 500 }}
				onSuccess={() => {
					navigate(fromPage, { replace: true })
					console.log(location)
				}} />
		</div>
	)
}

export default LoginPage