import React from "react";
import { Form, Card, Button } from "react-bootstrap";

const LoginForm = () => {
	return (
		<Card className="m-3 p-3" style={{ width: '18rem' }}>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email адрес</Form.Label>
					<Form.Control type="email" placeholder="Email" required/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Пароль</Form.Label>
					<Form.Control type="password" placeholder="Пароль" required/>
				</Form.Group>
				<Button variant="outline-primary">
					Войти
				</Button>
			</Form>
		</Card>
	);
}

export default LoginForm;