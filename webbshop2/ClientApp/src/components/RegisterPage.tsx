import React, { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import './LoginPage.css';
import { REGISTER_ACCOUNT_SUCCESS } from '../store/Auth';

export default function RegisterPage() {
    // for now an example user
    const dispatch = useDispatch();
    const [name, setName] = useState('user1');
    const [email, setEmail] = useState('user1@mail.com');
    const [password, setPassword] = useState('Lexicon1&');
    const [registrationFailure, setRegistrationFailure] = useState(false);
    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        fetch(`api/auth/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ email, name, password })
        })
        .then(response => {
            if (!response.ok) {
                setRegistrationFailure(true);
                throw Error('registration failed');
            }
            else return response.json()
        })
        .then(() => {
            dispatch({ type: REGISTER_ACCOUNT_SUCCESS });
        })
        .catch(() => {
            console.error('registration did fail');
        });
    }
    return (
        <div className="Login">
            <h2>Register</h2>
            <Form className="form">
                {registrationFailure && (
                    <Alert color="danger"> Failed to register account</Alert>
                )}
                <FormGroup>
                    <Label for="Name">Username</Label>
                    <Input
                      type="text"
                      name="name"
                      id="Name"
                      placeholder="username"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="example@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
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
    </div>
  );
}