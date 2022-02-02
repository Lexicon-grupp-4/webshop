import React, {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Alert } from 'reactstrap';
import './LoginPage.css';
import { REGISTER_ACCOUNT_SUCCESS } from '../store/Auth';
import { useForm, SubmitHandler, } from "react-hook-form";
import { Link } from "react-router-dom";


export default function RegisterPage() {

    const {
        register,watch,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<Inputs>({ mode: "onChange" });

    type Inputs = {
        userName: string;
        email: string;
        password: string;
        passwordConfirm: string;
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
            <h2>Registrering</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <p>Tips: L&ouml;senordet kr&auml;ver minst ett nummer, ett specialtecken och en stor bokstav (min l&auml;ngd 7) </p>
                {registrationFailure && (
                    <Alert color="danger"> Gick ej att registrera</Alert>
                )}
                <br />
                <input type="text" placeholder="Anv&auml;ndarnam" {...register("userName", { required: true, maxLength: 20 })} />
                {errors.userName && <span>Anv&auml;ndarnam kr&auml;vs</span>}
                <br />
                <input type="email" placeholder="Email" {...register("email", {
                    required: true, maxLength: 30, pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Ej korrekt format Email address"
                    }})} />
                {errors.email && errors.email.message}
                <br />
                <input type="password" placeholder="********" {...register("password", { required: true, maxLength: 30 })} />
                {errors.password && <span>L&ouml;senord kr&auml;vs</span>}
                <br />
                <input type="password" placeholder="Repetera l&ouml;senord" {...register("passwordConfirm", { required: true, maxLength: 30, validate: (value) => value === watch('password') })} />
                {errors.passwordConfirm && <span>L&ouml;senorden m&aring;ste vara lika</span>}
                <br />
                
                <input type="submit" value="Registrera" disabled={!isDirty || !isValid} />

            </Form>

            <Link to="/login">Logga in</Link>
        </div>
    );
}