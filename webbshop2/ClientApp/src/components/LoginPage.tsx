import { useForm, SubmitHandler, } from "react-hook-form";
import './LoginPage.css';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { Form, Alert } from 'reactstrap';
import { useDispatch } from 'react-redux';
import {
    CREDENTIALS_LOGIN_SUCCESS,
    CREDENTIALS_LOGIN_FAILURE,
    ATTEMPT_LOGIN,
    PasswordLoginResponse
} from '../store/Auth';
import './LoginPage.css';
import { setToken, removeToken } from '../tokenService';



export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<Inputs>({ mode: "onChange" });

    type Inputs = {
        userName: string;
        password: string;
    };

    const [loginFailure, setLoginFailure] = useState(false);
    const dispatch = useDispatch();
    var [userName] = useState('');
    var [password] = useState('');


    const onSubmit: SubmitHandler<Inputs> = (input) => {
        userName = input.userName;
        password = input.password;
        fetch(`api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
            .catch(() => {
                dispatch({ type: CREDENTIALS_LOGIN_FAILURE });
                removeToken();
            });
        dispatch({ type: ATTEMPT_LOGIN })

    };

    return (
        <div className="Login">
            <h2>Inloggning</h2>
                <p>Tips: Logga in med anv&auml;ndarnamnet: user10, l&ouml;senord: Lexicon1&</p>

            <Form onSubmit={handleSubmit(onSubmit)}>
                {loginFailure && (
                    <Alert color="danger">Gick inte att logga in</Alert>
                )}
                    <input type="text" placeholder="Anv&auml;ndarnamn" {...register("userName", { required: true, maxLength: 20 })} />
                {errors.userName && <span>Anv&auml;darnamn kr&auml;vs</span>}
                <br />
                <input type="password" placeholder="********" {...register("password", { required: true, maxLength: 30 })} />
                {errors.password && <span>L&ouml;senord kr&auml;vs</span>}
                <br />
                <input type="submit" value="Logga in" disabled={!isDirty || !isValid} />

            </Form>

            <Link to="/register">Registrera nytt Konto</Link>
            </div>
    );
}