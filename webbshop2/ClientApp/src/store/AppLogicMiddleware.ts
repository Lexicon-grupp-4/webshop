import { Middleware } from 'redux';
import { ApplicationState } from './';
import { push } from "connected-react-router";
import { CREDENTIALS_LOGIN_SUCCESS, REGISTER_ACCOUNT_SUCCESS, actionCreators } from './Auth';
import { actionCreators as productsActionCreators } from './Products';

export type LoaderMiddleware = Middleware<{}, ApplicationState>

export const APP_START = 'app/APP_START';

const AppLogicMiddleware: LoaderMiddleware = storeAPI => next => action => {
    const n = next(action);
    if (action.type === APP_START) {
        // @ts-ignore: TODO fix Thunk
        storeAPI.dispatch(actionCreators.verifyAuthenticationToken());
        // @ts-ignore: TODO fix Thunk
        storeAPI.dispatch(productsActionCreators.requestProducts());
    } else if (action.type === CREDENTIALS_LOGIN_SUCCESS) {
        // After successfull login move to route /
        storeAPI.dispatch(push(''));
    } else if (action.type === REGISTER_ACCOUNT_SUCCESS) {
        // After successfull login move to route /
        storeAPI.dispatch(push('/login'));
    }
    return n;
}

export default AppLogicMiddleware;
