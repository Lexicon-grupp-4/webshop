import { useForm, SubmitHandler, } from "react-hook-form";
import './LoginPage.css';
import { Link } from "react-router-dom";
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
import { setToken, removeToken } from '../tokenService';



export default function LoginPage() {
    // TODO Add form validation and disable submit button accordingly

    const {
        register,
        handleSubmit, 
        watch,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<Inputs>({ mode: "onChange" });
    
    type Inputs = {
        userName: string;
        password: string;
    };


    const [loginFailure, setLoginFailure] = useState(false);
    const dispatch = useDispatch();
    var [userName, setUserName] = useState('');
    var [password, setPassword] = useState('');


    const onSubmit: SubmitHandler<Inputs> = (input) => {
        // TODO fix Login stuff on submit 
        userName = input.userName;
        password = input.password;

        // your form submit function which will invoke after successful validation
        fetch(`api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: userName, password  })
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
                console.error('removing bad auth-token');
                removeToken();
            });
        dispatch({ type: ATTEMPT_LOGIN })


        //alert(JSON.stringify(userName));
    };


    //console.log(watch("userName"));
    //console.log(watch("password"))

    //Add more validations for login and make login screen better looking
    return (
        <div className="Login">
            <h2>Sign In</h2>
            <p>Tip: Login with username: user10, password: Lexicon1&</p>
            
            <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Username" {...register("userName", { required: true, maxLength: 20 })} />
                {errors.userName && <span>Username is required</span>}
                <br />
                <input type="password" placeholder="********" {...register("password", { required: true, maxLength: 30 })} />
                {errors.password && <span>Password is required</span>}
                <br />
                <input type="submit" value="Login" disabled={!isDirty || !isValid}  />
                
            </Form>

            <Link to="/register">Register new Account</Link>
        </div>
    );
}