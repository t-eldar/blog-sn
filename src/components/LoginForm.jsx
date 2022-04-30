import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import AuthService from "../api/AuthService";
import { useFetching } from "../hooks/useFetching";
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {

	const { user, setUser } = useAuth();

	// TODO: добавить валидацию
	const [loggingInResponse, setLoggingInRespose] = useState();
	const [userInfo, setUserInfo] = useState({
		username: '',
		password: '',
	});

	const [isInvalidData, setIsValidData] = useState({
		username: false,
		password: false,
	})
	const [invalidDataMessages, setInvalidDataMessages] = useState({
		username: '',
		password: '',
	})
	const [loginUser, isLoginLoading, loginError] = useFetching(async (username, password) => {
		const response = await AuthService.login(username, password);
		setLoggingInRespose(response);
		console.log('LoginForm login response: ');
		console.log(response);
	});


	const handleLoggingIn = async (e) => {
		e.preventDefault();
		await loginUser(userInfo.username, userInfo.password);
		if (loggingInResponse.status == 200 && AuthService.getCurrentUser()) {///
			setUser(loggingInResponse.data.user)
		}
	}

	return (
		<Card className="m-3 p-3" style={{ width: '18rem' }}>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Имя пользователя</Form.Label>
					<Form.Control
						type="text"
						placeholder="Имя пользователя"
						required
						isInvalid={isInvalidData.username}
						onChange={e =>
							setUserInfo({ ...userInfo, username: e.target.value })
						}
					/>
					<Form.Control.Feedback type='invalid'>
						{invalidDataMessages.username}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Пароль</Form.Label>
					<Form.Control
						type="password"
						placeholder="Пароль"
						required
						isInvalid={isInvalidData.password}
						onChange={e =>
							setUserInfo({ ...userInfo, password: e.target.value })
						}
					/>
					<Form.Control.Feedback type='invalid'>
						{invalidDataMessages.password}
					</Form.Control.Feedback>
				</Form.Group>
				<Button
					variant="outline-primary"
					onClick={handleLoggingIn}
				>
					Войти
				</Button>
			</Form>
		</Card>
	);
}

export default LoginForm;