import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {

	const location = useLocation();
	const navigate = useNavigate();
	const fromPage = location.state?.from?.pathname || '/';
	return (
		<LoginForm onSuccess={() => {

		 navigate(fromPage)
		 console.log(location)
		 } }/>
	)
}

export default LoginPage