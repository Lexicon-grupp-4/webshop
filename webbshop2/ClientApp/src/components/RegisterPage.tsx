import React, { SyntheticEvent, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import './LoginPage.css';

export default function RegisterPage() {
    // for now an example user
    const [email, setEmail] = useState('user1@mail.com');
    const [password, setPassword] = useState('Lexicon1&');
    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        fetch(`api/auth/register`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({ email, name: email, password })
      })
          .then(response => response.json())
          .then(data => {
              console.log('register success', data);
          });
    }
    return (
        <div className="App">
            <h2>Register</h2>
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