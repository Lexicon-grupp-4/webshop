import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ApplicationState } from './index';

// STATE - This defines the type of data maintained in the Redux store.

export interface AuthState {
  user: User | undefined;
  isLogedIn: boolean;
  jwt: string | undefined;
}

export interface User {
  id: number;
  name: number;
  email: string;
}

interface PasswordLoginResponse {
  jwt: string,
  user: User
}

interface AttemptLoginAction {
  type: 'ATTEMPT_LOGIN';
}

interface LoginSuccessAction {
  type: 'LOGIN_SUCCESS';
  jwt: string,
  user: User
}

interface RegisterAccountAction {
  type: 'REGISTER_ACCOUNT';
}

type KnownAction = AttemptLoginAction | RegisterAccountAction | LoginSuccessAction;

// ACTION CREATORS

export const actionCreators = {
    attemptLogin: (email: string, password: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        console.log('111')
        if (appState) {
            fetch(`api/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({ email, password })
            })
                .then(response => response.json() as Promise<PasswordLoginResponse>)
                .then(data => {
                  console.log('222')
                    dispatch({ type: 'LOGIN_SUCCESS', jwt: data.jwt, user: data.user });
                });

            dispatch({ type: 'ATTEMPT_LOGIN' });
        }
    }
};

// REDUCER 

const unloadedState: AuthState = { user: undefined, isLogedIn: false, jwt: undefined };

export const reducer: Reducer<AuthState> = (state: AuthState | undefined, incomingAction: Action): AuthState => {
  if (state === undefined) {
      return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
      case 'LOGIN_SUCCESS':
          return {
              ...state,
              jwt: action.jwt,
              user: action.user,
              isLogedIn: true,
          };
  }

  return state;
};

// SELECTORS

export const selectIsLogedIn = (state: ApplicationState) => state.auth!.isLogedIn;
export const selectUser = (state: ApplicationState) => state.auth!.user;