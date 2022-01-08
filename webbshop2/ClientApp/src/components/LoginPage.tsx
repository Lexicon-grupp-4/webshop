import React, { SyntheticEvent, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../store/Auth';
import './LoginPage.css';
import { Link } from "react-router-dom";
const { attemptLogin } = actionCreators;

export default function LoginPage() {
    // for now an example user
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        dispatch(attemptLogin(userName, password))
        setUserName('');
        setPassword('');
    }
    return (
        <div className="Login">
            <h2>Sign In</h2>
            <p>Tip: Login with username: user10, password: Lexicon1&</p>
            <Form className="form">
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