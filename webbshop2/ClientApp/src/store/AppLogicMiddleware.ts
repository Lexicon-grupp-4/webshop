import { Middleware } from 'redux';
import { ApplicationState } from './';
import { push } from "connected-react-router";
import { 
    CREDENTIALS_LOGIN_SUCCESS, 
    REGISTER_ACCOUNT_SUCCESS, 
    actionCreators as authActions,
    AUTHENTICATION_DONE,
    TOKEN_VERIFICATION_SUCCESS,
    LOGOUT
 } from './Auth';
import { actionCreators as productsActions } from './Products';
import { actionCreators as ordersActions } from './Orders';
import { actionCreators as cateActions } from './Categories';

export type LoaderMiddleware = Middleware<{}, ApplicationState>

export const APP_START = 'app/APP_START';
export const APP_CLEAR_PERSONAL_DATA = 'app/APP_CLEAR_PERSONAL_DATA';
export interface ClearPeronalDataAction {
    type: 'app/APP_CLEAR_PERSONAL_DATA';
}

// To keep subsystems in app separated, listen for an action and translate it to notification 
// for another system. If we want even more separation, then add one middleware per subsystem.
const AppLogicMiddleware: LoaderMiddleware = storeAPI => next => action => {
    const n = next(action);
    // TODO fix @ts-ignore on thunk actions
    if (action.type === APP_START) {
        // @ts-ignore
        storeAPI.dispatch(authActions.verifyAuthenticationToken());
        // @ts-ignore
        storeAPI.dispatch(productsActions.requestProducts());
        // @ts-ignore
        storeAPI.dispatch(cateActions.requestCategories());
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
            // @ts-ignore
            storeAPI.dispatch(ordersActions.requestOrders());
        }, 100)
    } else if (action.type === LOGOUT) {
        storeAPI.dispatch({type: APP_CLEAR_PERSONAL_DATA});
    }
    return n;
}

export default AppLogicMiddleware;
