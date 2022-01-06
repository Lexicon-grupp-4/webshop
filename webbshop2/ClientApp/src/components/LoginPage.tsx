import React, { SyntheticEvent, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators, selectIsLogedIn, selectUser, User } from '../store/Auth';
import './LoginPage.css';
const { attemptLogin } = actionCreators;

export default function LoginPage() {
    // for now an example user
    const [email, setEmail] = useState('user1@mail.com');
    const [password, setPassword] = useState('Lexicon1&');
    const dispatch = useDispatch();
    const isLogedIn = useSelector(selectIsLogedIn);
    const user = useSelector(selectUser) as User;
    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        dispatch(attemptLogin(email, password))
        setEmail('');
        setPassword('');
    }
    return (
        <div className="App">
            <h2>Sign In</h2>
            <p> 
                {isLogedIn? 'is loged in as: ' : 'is NOT loged in'}
                {user && user.name } 
            </p>
            <Form className="form">
                <FormGroup>
                    <Label for="exampleEmail">Username</Label>
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