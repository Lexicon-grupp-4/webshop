import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ApplicationState } from './index';
import { getToken, removeToken } from '../tokenService';
// import { createSelector } from 'reselect';

// STATE - This defines the type of data maintained in the Redux store.

export interface AuthState {
    user: User | undefined;
    isLogegdIn: boolean; // maybe redundant
    jwt: string | undefined;
}

export enum Role {
    User,
    Admin
}

export interface User {
    id: number;
    name: number;
    email: string;
    role: Role;
}

export const TOKEN_VERIFICATION_SUCCESS = 'auth/TOKEN_VERIFICATION_SUCCESS';
export const TOKEN_VERIFICATION_FAILURE = 'auth/TOKEN_VERIFICATION_FAILURE';
export const ATTEMPT_TOKEN_VERIFICATION = 'auth/ATTEMPT_TOKEN_VERIFICATION';
export const CREDENTIALS_LOGIN_SUCCESS = 'auth/CREDENTIALS_LOGIN_SUCCESS';
export const CREDENTIALS_LOGIN_FAILURE = 'auth/CREDENTIALS_LOGIN_FAILURE';
export const ATTEMPT_LOGIN = 'auth/ATTEMPT_LOGIN';
export const REGISTER_ACCOUNT_SUCCESS = 'auth/REGISTER_ACCOUNT_SUCCESS';
export const LOGOUT = 'auth/LOGOUT';

export interface PasswordLoginResponse {
  jwt: string,
  user: User
}

interface AttemptLoginAction {
    type: 'auth/ATTEMPT_LOGIN';
}

interface LogoutAction {
    type: 'auth/LOGOUT';
}

interface LoginSuccessAction {
    type: 'auth/CREDENTIALS_LOGIN_SUCCESS';
    jwt: string,
    user: User
}

interface CredentialsLoginFailureAction {
    type: 'auth/CREDENTIALS_LOGIN_FAILURE';
}

interface RegisterAccountAction {
    type: 'auth/REGISTER_ACCOUNT_SUCCESS';
}

interface TokenVerifactionDoneAction {
    type: 'auth/TOKEN_VERIFICATION_SUCCESS';
    user: User;
}

interface TokenVerifactionFailureAction {
    type: 'auth/TOKEN_VERIFICATION_FAILURE';
}

interface TokenVerificationAction {
    type: 'auth/ATTEMPT_TOKEN_VERIFICATION';
}

type KnownAction = AttemptLoginAction | RegisterAccountAction | LoginSuccessAction
| TokenVerificationAction | TokenVerifactionDoneAction | TokenVerifactionFailureAction
| LogoutAction | CredentialsLoginFailureAction;

// ACTION CREATORS

export const actionCreators = {
    verifyAuthenticationToken: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const token = getToken();
        if (appState) {
            fetch(`api/auth/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if(response.ok) {
                        return response.json() as Promise<User>
                    } else {
                        throw Error('bad response');
                    }
                })
                .then(data => {
                    dispatch({ type: TOKEN_VERIFICATION_SUCCESS, user: data! });
                })
                .catch(() => dispatch({ type: TOKEN_VERIFICATION_FAILURE }));

            dispatch({ type: ATTEMPT_TOKEN_VERIFICATION });
        }
    },
    logout: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        removeToken();
        dispatch({ type: LOGOUT });
    }
};

// REDUCER 

const unloadedState: AuthState = { user: undefined, isLogegdIn: false, jwt: undefined };

export const reducer: Reducer<AuthState> = (state: AuthState | undefined, incomingAction: Action): AuthState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case CREDENTIALS_LOGIN_SUCCESS:
            return {
                ...state,
                jwt: action.jwt,
                user: action.user,
                isLogegdIn: true,
            };
        case TOKEN_VERIFICATION_SUCCESS:
            console.log('successfully logged in with token');
            return {
                ...state,
                user: action.user,
                isLogegdIn: true,
            };
        case TOKEN_VERIFICATION_FAILURE:
            return {
                ...state,
                isLogegdIn: true,
            };
        case LOGOUT:
            return {
                ...state,
                user: undefined,
                isLogegdIn: false,
            };
    }

    return state;
};

// SELECTORS

export const selectUser = (state: ApplicationState) => state.auth!.user;
export const selectIsLoggedIn = (state: ApplicationState) => state.auth!.isLogegdIn;
