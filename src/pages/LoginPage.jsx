import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'
import DarkLogo from '../icons/dark-logo.svg'

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
		<div className='mt-5 d-flex justify-content-center'>
			<div>
				<div className='d-flex justify-content-center'>
					<img
						width='200'
						height='200'
						src={DarkLogo}
					/>
				</div>
				<LoginForm
					style={{ width: '30vw', minWidth: 300 }}
					onSuccess={() => {
						navigate(fromPage, { replace: true })
						console.log(location)
					}}
				/>
			</div>
		</div>
	)
}

export default LoginPage