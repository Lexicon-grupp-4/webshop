import { useState } from 'react';
import { useForm, SubmitHandler, } from 'react-hook-form';
import { Form, Alert, Container } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { attemptLogin, loginSuccess } from '../../redux/auth.slice';
import { setToken, removeToken } from '../../services/authTokenService';
import { PasswordLoginResponseDto } from '../../redux/DomainClasses';


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
                return response.json() as Promise<PasswordLoginResponseDto>;
            })
            .then((loginResp: PasswordLoginResponseDto) => {
                dispatch(loginSuccess(loginResp.user));
                setToken(loginResp.jwt);
            })
            .catch(() => {
                removeToken();
            });
        dispatch(attemptLogin());
    };

    return (
        <Container className="Login">
            <h2>Sign In</h2>
            <p>Tip: Login with username: admin, password: Lexicon1&</p>

            <Form onSubmit={handleSubmit(onSubmit)}>
                {loginFailure && (
                    <Alert color="danger"> Failed to login</Alert>
                )}
                <input type="text" placeholder="Username" {...register("userName", { required: true, maxLength: 20 })} />
                {errors.userName && <span>Username is required</span>}
                <br />
                <input type="password" placeholder="********" {...register("password", { required: true, maxLength: 30 })} />
                {errors.password && <span>Password is required</span>}
                <br />
                <input type="submit" value="Login" disabled={!isDirty || !isValid} />

            </Form>
        </Container>
    );
}
