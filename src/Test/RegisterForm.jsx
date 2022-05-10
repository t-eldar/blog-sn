import React, { useState, useEffect } from 'react'
import { Card, Form, Button, InputGroup } from 'react-bootstrap'
import AuthService from '../api/AuthService'
import { useFetching } from '../hooks/useFetching'
import api from './api/api';

export default function RegisterForm() {
    const[userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        eMail: ''
    });
    
    async function registerUser(username, password, eMail,){
        const responce = await api.Register(username, eMail, password);
        console.log(responce.data);
    }

    const handleRegistration = async(e) =>{
        e.preventDefault();
        await registerUser(userInfo.username, userInfo.password, userInfo.eMail);
    }


  return (
    <Card className="m-3 p-3" style={{ width: '18rem' }}>
				<Form>
					<InputGroup className="mb-3">
						<InputGroup.Text>@</InputGroup.Text>
						<Form.Control
							placeholder="Имя пользователя"
							required
							// isInvalid={isInvalidData.username}
							onChange={e =>
								setUserInfo({ ...userInfo, username: e.target.value })
							}
						/>
						{/* <Form.Control.Feedback type="invalid">
							{invalidDataMessages.username}
						</Form.Control.Feedback> */}
					</InputGroup>
					<Form.Group className="mb-3">
						<Form.Label>Email адрес</Form.Label>
						<Form.Control
							type="email"
							placeholder="Email"
							required
							// isInvalid={isInvalidData.email}
							onChange={e =>
								setUserInfo({ ...userInfo, eMail: e.target.value })
							}
						/>
						{/* <Form.Control.Feedback type="invalid">
							{invalidDataMessages.email}
						</Form.Control.Feedback> */}
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Пароль</Form.Label>
						<Form.Control
							type="password"
							placeholder="Пароль"
							required
							// isInvalid={isInvalidData.password}
							onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
						/>
						{/* <Form.Control.Feedback type="invalid">
							{invalidDataMessages.password}
						</Form.Control.Feedback> */}
					</Form.Group>
					{/* <Form.Group className="mb-3">
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
					</Form.Group> */}
					<Button
						variant="outline-primary"
						onClick={handleRegistration}
					>
						Зарегистрироваться
					</Button>
				</Form>
			</Card>
  )
}
