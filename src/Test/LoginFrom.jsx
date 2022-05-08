
import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import api from './api'

export default function LoginFrom() {
   
    const [userLogin, setUserlogin] = useState({
        username: '',
        password: ''
    })

    async function logIn(username, password){
        const responce = await api.Login(username, password);
        return responce;
    }

    async function handleLogin(e){
        e.preventDefault();
        await logIn(userLogin.username, userLogin.password);
    }
    

  return (
    <div>
        <Container className='app'>
            <Form>
                <Form.Control 
                    placeholder='Login'
                    onChange = {e => setUserlogin({...userLogin, username: e.target.value})}/>
            </Form>
            <Form>
                <Form.Control 
                    placeholder = 'Password'
                    onChange={e => setUserlogin({...userLogin, password: e.target.value})}/>
            </Form>
            <Button onClick={handleLogin}>
                LogIn
            </Button>
        </Container>
    </div>
  )
}

