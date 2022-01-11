import { Middleware } from 'redux';
import { ApplicationState } from './';
import { push } from "connected-react-router";
import { 
    CREDENTIALS_LOGIN_SUCCESS, 
    REGISTER_ACCOUNT_SUCCESS, 
    actionCreators as authActions,
    AUTHENTICATION_DONE,
    TOKEN_VERIFICATION_SUCCESS
 } from './Auth';
import { actionCreators as productsActions } from './Products';
import { actionCreators as ordersActions } from './Orders';

export type LoaderMiddleware = Middleware<{}, ApplicationState>

export const APP_START = 'app/APP_START';

// To keep subsystems in app separated, listen for an action and translate it to notification 
// for another system. If we want even more separation, then add one middleware per subsystem.
const AppLogicMiddleware: LoaderMiddleware = storeAPI => next => action => {
    const n = next(action);
    if (action.type === APP_START) {
        // @ts-ignore: TODO fix Thunk
        storeAPI.dispatch(authActions.verifyAuthenticationToken());
        // @ts-ignore: TODO fix Thunk
        storeAPI.dispatch(productsActions.requestProducts());
    } else if (action.type === CREDENTIALS_LOGIN_SUCCESS) {
        // After successfull login move to route /
        storeAPI.dispatch(push(''));
        storeAPI.dispatch(authActions.authenticationDone);
    } else if (action.type === REGISTER_ACCOUNT_SUCCESS) {
        // After successfull login move to route /
        storeAPI.dispatch(push('/login'));
    } else if (action.type === TOKEN_VERIFICATION_SUCCESS) {
        storeAPI.dispatch(authActions.authenticationDone);
    } else if (action.type === AUTHENTICATION_DONE) {
        // wait! since local storage token might not have been updated
        setTimeout(() => {
            // @ts-ignore: TODO fix Thunk
            storeAPI.dispatch(ordersActions.requestOrders());
        }, 100)
    }
    return n;
}

export default AppLogicMiddleware;
