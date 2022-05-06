import React, { useEffect, useState } from "react";
import { Form, Card, Button, Badge } from "react-bootstrap";
import AuthService from "../api/AuthService";
import { useFetching } from "../hooks/useFetching";
import { useAuth } from "../hooks/useAuth";

const LoginForm = ({ onSuccess }) => {

	const { user, setUser } = useAuth();

	const [logError, setLogError] = useState();

	const [userInfo, setUserInfo] = useState({
		username: '',
		password: '',
	});

	const [loginUser, isLoginLoading, loginError] = useFetching(async (username, password) => {
		const response = await AuthService.login(username, password);
		if (response.status == 200 && AuthService.getCurrentUser()) {///
			setUser(response.data)
			setLogError(null);
			onSuccess();
		}
		console.log('LoginForm login response: ');
		console.log(response);
	});
	const handleLoggingIn = async (e) => {
		e.preventDefault();
		await loginUser(userInfo.username, userInfo.password);
	}
	useEffect(() => {
		setLogError(loginError);
	}, [loginError])

	return (
		<Card className="m-3 p-3" style={{ width: '18rem' }}>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Имя пользователя</Form.Label>
					<Form.Control
						type="text"
						placeholder="Имя пользователя"
						required
						onChange={e =>
							setUserInfo({ ...userInfo, username: e.target.value })
						}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Пароль</Form.Label>
					<Form.Control
						type="password"
						placeholder="Пароль"
						required
						onChange={e =>
							setUserInfo({ ...userInfo, password: e.target.value })
						}
					/>
				</Form.Group>
				{
					logError
					&& <Badge
						className='m-2'
						bg='danger'
					>
						Неверное имя пользователя или пароль
					</Badge>
				}
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