import React, { useState, useEffect } from 'react'
import { Card, Form, Button, InputGroup, Badge, FloatingLabel } from 'react-bootstrap'
import AuthService from '../api/AuthService'
import { useFetching } from '../hooks/useFetching'
import { useValidation } from '../hooks/useValidation'

const RegisterForm = ({ onSuccess, isAdminRegister = false, style }) => {

	const [isFormInvalid, setIsFormInvalid] = useState(false);
	const [userInfo, setUserInfo] = useState({
		username: '',
		email: '',
	});

	const [password, setPassword] = useState('');
	const [confirmingPassword, setConfirmingPassword] = useState('');

	const [registerUser, isRegistrationLoading, registrationError]
		= useFetching(async (username, email, password) => {

			if (isAdminRegister) {
				const response = await AuthService.registerAdmin(username, email, password);
				if (response && response?.status == 200) {
					onSuccess();
				}
			} else {
				const response = await AuthService.register(username, email, password);
				if (response && response?.status == 200) {
					onSuccess();
				}
			}
		})

	const [regError, setRegError] = useState();
	useEffect(() => {
		console.log('fdlngdlkfjnlzgfnkl;')
		setRegError(registrationError);
	}, [registrationError])
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
			const usernameRegEx = /^[A-Za-z0-9]+$/;
			return {
				message: 'Имя пользователя должно содержать только латинские буквы или цифры',
				invalid: !usernameRegEx.test(username)
			}
		},
		(username) => {
			return {
				message: 'Пользователь с таким именем существует',
				invalid: regError ? regError?.response?.data?.message.includes('exists') : false
			}
		}
	], [regError]);

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
	const [isConfirmingPasswordInvalid, confirmingPasswordErrorMessage]
		= useValidation([password, confirmingPassword], [
			([pas, confPas]) => {
				return {
					message: 'Пароли не совпадают',
					invalid: pas != confPas
				}
			}
		]);

	const handleRegistration = async (e) => {
		e.preventDefault();
		await registerUser(userInfo.username.trim(), userInfo.email.trim(), password.trim());
	}

	useEffect(() => {
		setIsFormInvalid(isEmailInvalid
			|| isUsernameInvalid
			|| isPasswordInvalid
			|| isConfirmingPasswordInvalid);
	}, [isEmailInvalid, isUsernameInvalid, isPasswordInvalid, isConfirmingPasswordInvalid]);

	return (
		<>
			<Card className="m-3 p-3" style={style}>
				<Form.Floating
					onChange={() => {
						if (regError) {
							setRegError({})
						}
					}}
				>
					<FloatingLabel label='Имя пользователя'>
						<Form.Control
							className='mb-3'
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
					</FloatingLabel>
					<Form.Group className="mb-3">
						<FloatingLabel label='Email адрес'>
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
						</FloatingLabel>
					</Form.Group>
					<Form.Group className="mb-3">
						<FloatingLabel label='Пароль'>
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
						</FloatingLabel>
					</Form.Group>
					<Form.Group className="mb-3">
						<FloatingLabel label='Подтвердите пароль'>
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
						</FloatingLabel>
					</Form.Group>
					<Button
						variant="outline-primary"
						onClick={handleRegistration}
						disabled={isFormInvalid || isRegistrationLoading}
					>
						Зарегистрироваться
					</Button>
					{
						regError && regError?.response?.data?.status === 'Error' && regError?.data?.message?.includes('exists')
						&& <Badge bg='danger'>Произошла ошибка на сервере, попробуйте позже</Badge>
					}
				</Form.Floating>
			</Card>
		</>
	)
}

export default RegisterForm;