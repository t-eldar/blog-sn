import React from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../../components/RegisterForm'

const RegisterAdminPage = () => {

	const navigate = useNavigate();

	return (
		<div className='d-flex justify-content-center'>
			<RegisterForm 
				style={{width: 500}}
				onSuccess={() => navigate('/admin-page')} 
				isAdminRegister
			/>
		</div>
	)
}

export default RegisterAdminPage