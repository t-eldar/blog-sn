import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {

	const location = useLocation();
	const navigate = useNavigate();
	const fromPage = location.state?.from?.pathname || '/';
	return (
		<div className='d-flex justify-content-center'>
			<LoginForm onSuccess={() => {
				navigate(fromPage, { replace: true })
				console.log(location)
			}} />
		</div>
	)
}

export default LoginPage