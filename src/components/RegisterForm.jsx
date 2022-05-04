import React, { useState, useEffect } from 'react'
import { Card, Form, Button, InputGroup } from 'react-bootstrap'
import AuthService from '../api/AuthService'
import { useFetching } from '../hooks/useFetching'
import { useValidation } from '../hooks/useValidation'

const RegisterForm = () => {

	//TODO: добавить полную валидацию

	const [registerResponse, setRegisterResponse] = useState(null);

	const [userInfo, setUserInfo] = useState({
		username: '',
		email: '',
		password: '',
	});

	const [password, setPassword] = useState('');
	const [confirmingPassword, setConfirmingPassword] = useState('');

	const [registerUser, isRegistrationLoading, registraionError]
		= useFetching(async (username, email, password) => {
			const response = await AuthService.register(username, email, password);
			console.log('RegisterForm register response: ');
			console.log(response);

			setRegisterResponse(response);
		})

	/// validation

	const [isEmailInvalid, emailErrorMessage] = useValidation(userInfo.email, [
		(email) => {
			const emailRegEx =
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			return {
				message: 'Неверная почта',
				invalid: !emailRegEx.test(email)
			}
		}
	]);
	const [isUsernameInvalid, usernameErrorMessage] = useValidation(userInfo.username, [
		(username) => {
			const usernameRegEx = /[A-Za-z0-9]/;
			return {
				message: 'Имя пользователя должно содержать латинские буквы или цифры',
				invalid: !usernameRegEx.test(username)
			}
		},
		(username) => {
			return {
				message: 'Пользователь с таким именем существует',
				invalid: registerResponse?.data?.message.includes('exists')
			}
		}
	]);
	const [isPasswordInvalid, passwordErrorMessage] = useValidation(password, [
		(pass) => {
			const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
			return {
				message: `Пароль должен быть длиной не менее 6 символов и содержать: 
					хотя бы одну цифру, 
					хотя бы один заглавный и 
					хотя бы один строчный латинский символ`,
				invalid: !passwordRegEx.test(pass)
			}
		}
	]);
	// const [isConfirmingPasswordInvalid, confirmingPasswordErrorMessage]
	// 	= useValidation({ password, confirmingPassword }, [
	// 		({ pas, confPas }) => {
	// 			return {
	// 				message: 'Пароли не совпадают',
	// 				invalid: !pas && !confPas && pas != confPas
	// 			}
	// 		}
	// 	]);

	const handleRegistration = (e) => {
		e.preventDefault();
		if (userInfo && userInfo.username && userInfo.email && userInfo.password
			&& userInfo.username !== "" && userInfo.email !== "" && userInfo.password !== "") {

			registerUser(userInfo.username, userInfo.email, userInfo.password);
			console.log(userInfo);
		}
	}

	return (
		<>
			<Card className="m-3 p-3" style={{ width: '18rem' }}>
				<Form>
					<InputGroup className="mb-3">
						<InputGroup.Text>@</InputGroup.Text>
						<Form.Control
							placeholder="Имя пользователя"
							required
							isInvalid={isUsernameInvalid}
							onChange={e =>
								setUserInfo({ ...userInfo, username: e.target.value })
							}
						/>
						<Form.Control.Feedback type="invalid">
							{usernameErrorMessage}
						</Form.Control.Feedback>
					</InputGroup>
					<Form.Group className="mb-3">
						<Form.Label>Email адрес</Form.Label>
						<Form.Control
							type="email"
							placeholder="Email"
							required
							isInvalid={isEmailInvalid}
							onChange={e =>
								setUserInfo({ ...userInfo, email: e.target.value })
							}
						/>
						<Form.Control.Feedback type="invalid">
							{emailErrorMessage}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Пароль</Form.Label>
						<Form.Control
							type="password"
							placeholder="Пароль"
							required
							isInvalid={isPasswordInvalid}
							onChange={e => setPassword(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							{passwordErrorMessage}
						</Form.Control.Feedback>
					</Form.Group>
					{/* <Form.Group className="mb-3">
						<Form.Label>Подтвердите пароль</Form.Label>
						<Form.Control
							type="password"
							placeholder="Пароль еще раз"
							required
							isInvalid={isConfirmingPasswordInvalid}
							onChange={e => {
								setConfirmingPassword(e.target.value);
							}}
						/>
						<Form.Control.Feedback type="invalid">
							{confirmingPasswordErrorMessage}
						</Form.Control.Feedback>
					</Form.Group> */}
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