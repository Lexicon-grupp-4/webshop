import React, { SyntheticEvent, useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import { useDispatch } from 'react-redux';
import {
    CREDENTIALS_LOGIN_SUCCESS, 
    CREDENTIALS_LOGIN_FAILURE,
    ATTEMPT_LOGIN,
    PasswordLoginResponse
} from '../store/Auth';
import './LoginPage.css';
import { Link } from "react-router-dom";
import { setToken, removeToken } from '../tokenService';

export default function LoginPage() {
    // TODO Add form validation and disable submit button accordingly
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailure, setLoginFailure] = useState(false);
    const dispatch = useDispatch();
    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        setUserName('');
        setPassword('');
        fetch(`api/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ name: userName, password })
        })
            .then(response => {
                if (!response.ok) {
                    setLoginFailure(true);
                    throw Error('login failed');
                }
                return response.json() as Promise<PasswordLoginResponse>;
            })
            .then(data => {
                dispatch({ type: CREDENTIALS_LOGIN_SUCCESS, jwt: data.jwt, user: data.user });
                setToken(data.jwt);
            })
            .catch(()=> {
                dispatch({ type: CREDENTIALS_LOGIN_FAILURE });
                console.error('removing bad auth-token');
                removeToken();
            });
        dispatch({ type: ATTEMPT_LOGIN });
    }
    return (
        <div className="Login">
            <h2>Sign In</h2>
            <p>Tip: Login with username: user10, password: Lexicon1&</p>
            <Form className="form">
                {loginFailure && (
                    <Alert color="danger"> Failed to login</Alert>
                )}
                <FormGroup>
                    <Label for="Name">Username</Label>
                    <Input
                        type="text"
                        name="email"
                        id="Name"
                        placeholder="oskar11"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="********"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup>
                <Button onClick={handleSubmit} >Submit</Button>
            </Form>
            <Link to="/register">Register new Account</Link>
      </div>
  );
}