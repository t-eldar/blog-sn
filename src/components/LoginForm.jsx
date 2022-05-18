import React, { useEffect, useState } from "react";
import { Form, Card, Button, Badge, FloatingLabel } from "react-bootstrap";
import AuthService from "../api/AuthService";
import { useFetching } from "../hooks/useFetching";
import { useAuth } from "../hooks/useAuth";
import { getNormalizedUserFromToken, updateServices } from "../utils";
import UsersService from "../api/UsersService";

const LoginForm = ({ style, onSuccess = () => null }) => {

	const { user, setUser, userRatings, setUserRatings } = useAuth();

	const [logError, setLogError] = useState(false);

	const [userInfo, setUserInfo] = useState({
		username: '',
		password: '',
	});

	const [fetchRatings, isRatingsLoading, ratingsError] = useFetching(async (id) => {
		const response = await UsersService.getRatingsByUserId(id);
		setUserRatings(response.data);
	})

	const [loginUser, isLoginLoading, loginError] = useFetching(async (username, password) => {
		const response = await AuthService.login(username, password);
		if (response.status == 200 && AuthService.getCurrentUserAuth()) {
			const token = AuthService.getCurrentUserAuth().token;
			const normalizedUser = getNormalizedUserFromToken(token);
			setUser(normalizedUser);
			setLogError(false);
			onSuccess();
			updateServices();
			await fetchRatings(normalizedUser.id);
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
		if (loginError) {
			AuthService.logout();
		}
	}, [loginError])
	return (
		<Card className="m-3 p-3" style={style}>
			<Form>
				<Form.Group className="mb-3">
					<FloatingLabel label="Имя пользователя">
						<Form.Control
							type="text"
							placeholder="Имя пользователя"
							required
							onChange={e =>
								setUserInfo({ ...userInfo, username: e.target.value })
							}
						/>
					</FloatingLabel>
				</Form.Group>
				<Form.Group className="mb-3">
					<FloatingLabel label="Пароль">
						<Form.Control
							type="password"
							placeholder="Пароль"
							required
							onChange={e =>
								setUserInfo({ ...userInfo, password: e.target.value })
							}
						/>
					</FloatingLabel>
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