import React, {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Alert } from 'reactstrap';
import './LoginPage.css';
import { REGISTER_ACCOUNT_SUCCESS } from '../store/Auth';
import { useForm, SubmitHandler, } from "react-hook-form";
import { Link } from "react-router-dom";


export default function RegisterPage() {

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<Inputs>({ mode: "onChange" });

    type Inputs = {
        userName: string;
        email: string;
        password: string;
    };

    const dispatch = useDispatch();
    var [userName] = useState('');
    var [email] = useState('');
    var [password] = useState('');
    const [registrationFailure, setRegistrationFailure] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = (input) => {
        userName = input.userName;
        email = input.email;
        password = input.password;
        fetch(`api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, userName, password })
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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <p>Tip: Password requires at least one number, a special charactera and a capital letter (min length 7) </p>
                {registrationFailure && (
                    <Alert color="danger"> Failed to register</Alert>
                )}
                <br />
                <input type="text" placeholder="Username" {...register("userName", { required: true, maxLength: 20 })} />
                {errors.userName && <span>Name is required</span>}
                <br />
                <input type="email" placeholder="Email" {...register("email", {
                    required: true, maxLength: 30, pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Does not match email format"
                    }})} />
                {errors.email && errors.email.message}
                <br />
                <input type="password" placeholder="********" {...register("password", { required: true, maxLength: 30 })} />
                {errors.password && <span>Password is required</span>}
                <br />
                <input type="submit" value="Register" disabled={!isDirty || !isValid} />

            </Form>

            <Link to="/login">Login</Link>
        </div>
    );
}