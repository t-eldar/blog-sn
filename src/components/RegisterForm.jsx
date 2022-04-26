import React, { useState, useEffect } from 'react'
import { Card, Form, Button, InputGroup } from 'react-bootstrap'
import AuthService from '../api/AuthService'
import { useFetching } from '../hooks/useFetching'

const RegisterForm = () => {

	//TODO: добавить полную валидацию

	const [registerResponse, setRegisterResponse] = useState(undefined);

	const [userInfo, setUserInfo] = useState({
		username: '',
		email: '',
		password: '',
	});

	const [password, setPassword] = useState('');
	const [confirmingPassword, setConfirmingPassword] = useState('');

	const [isInvalidData, setIsInvalidData] = useState({
		username: false,
		email: false,
		password: false,
		confirmingPassword: false,
	})
	const [invalidDataMessages, setInvalidDataMessages] = useState({
		username: '',
		email: '',
		password: '',
		confirmingPassword: '',
	});


	const [registerUser, isRegistrationLoading, registraionError]
		= useFetching(async (username, email, password) => {
			const response = await AuthService.register(username, email, password);
			console.log('RegisterForm register response: ');
			console.log(response);

			setRegisterResponse(response);
		})

	/// validation
	
	const isEmail = (email) => {
		const emailRegEx =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return String(email)
			.toLowerCase()
			.match(emailRegEx)
	}
	
	//// not done
	const isFormValid = () => {
		validateEmail(userInfo.email);
		validatePassword(userInfo.password);
		validateUsername(userInfo.username);
	}
	////
	const handleRegistration = (e) => {
		e.preventDefault();
		if (userInfo && userInfo.username && userInfo.email && userInfo.password
			&& userInfo.username !== "" && userInfo.email !== "" && userInfo.password !== "") {
				
			registerUser(userInfo.username, userInfo.email, userInfo.password);
			console.log(userInfo);
		}
	}

	const validateEmail = () => {
		if (!isEmail(userInfo.email)) {
			setInvalidDataMessages({ ...invalidDataMessages, email: 'Некорректная почта' });
			setIsInvalidData({ ...isInvalidData, email: false })
		}
	}
	// изменить!
	const validateUsername = () => {
		if (registerResponse && registerResponse.status == 500) {
			setInvalidDataMessages({
				...invalidDataMessages,
				username: 'Пользователь с таким именем уже существует'
			})
			setIsInvalidData({ ...isInvalidData, username: true })
		}
	}
	const validatePassword = () => {
		
	}
	useEffect(() => { // проверка совпадения паролей
		if (password !== confirmingPassword) {
			setInvalidDataMessages({ ...invalidDataMessages, confirmingPassword: 'Пароли не совпадают' });
			setIsInvalidData({ ...isInvalidData, confirmingPassword: true })
		}
		else {
			setIsInvalidData({ ...isInvalidData, confirmingPassword: false });
			setUserInfo({ ...userInfo, password: password })
		}
	}, [password, confirmingPassword])
	
	return (
		<>
			<Card className="m-3 p-3" style={{ width: '18rem' }}>
				<Form>
					<InputGroup className="mb-3">
						<InputGroup.Text>@</InputGroup.Text>
						<Form.Control
							placeholder="Имя пользователя"
							required
							isInvalid={isInvalidData.username}
							onChange={e =>
								setUserInfo({ ...userInfo, username: e.target.value })
							}
						/>
						<Form.Control.Feedback type="invalid">
							{invalidDataMessages.username}
						</Form.Control.Feedback>
					</InputGroup>
					<Form.Group className="mb-3">
						<Form.Label>Email адрес</Form.Label>
						<Form.Control
							type="email"
							placeholder="Email"
							required
							isInvalid={isInvalidData.email}
							onChange={e =>
								setUserInfo({ ...userInfo, email: e.target.value })
							}
						/>
						<Form.Control.Feedback type="invalid">
							{invalidDataMessages.email}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Пароль</Form.Label>
						<Form.Control
							type="password"
							placeholder="Пароль"
							required
							isInvalid={isInvalidData.password}
							onChange={e => setPassword(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							{invalidDataMessages.password}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Подтвердите пароль</Form.Label>
						<Form.Control
							type="password"
							placeholder="Пароль еще раз"
							required
							isInvalid={isInvalidData.confirmingPassword}
							onChange={e => {
								setConfirmingPassword(e.target.value);
							}}
						/>
						<Form.Control.Feedback type="invalid">
							{invalidDataMessages.confirmingPassword}
						</Form.Control.Feedback>
					</Form.Group>
					<Button
						variant="outline-primary"
						onClick={handleRegistration}
					>
						Зарегистрироваться
					</Button>
				</Form>
			</Card>
		</>
	)
}

export default RegisterForm;