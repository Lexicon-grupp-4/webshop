import { Middleware } from 'redux';
import { AppState } from './reducers';
import { fetchCategriesAsync } from './categories.slice';
import { fetchUserAsync } from './auth.slice';
import { AUTHENTICATION_RESOLVED, AUTHENTICATION_FAILED } from './auth.middleware';
import { fetchOrdersAsync } from './orders.slice';
import { push } from "connected-react-router";

export type AppMiddleware = Middleware<{}, AppState>
export const APP_INIT = 'app/INIT'

const AppLogicMiddleware: AppMiddleware = storeAPI => next => action => {
    const n = next(action);
    if (action.type === APP_INIT) {
        // @ts-ignore
        storeAPI.dispatch(fetchUserAsync());
        // @ts-ignore
        storeAPI.dispatch(fetchCategriesAsync());
    }
    else if (action.type === AUTHENTICATION_RESOLVED) {
        // @ts-ignore
        storeAPI.dispatch(fetchOrdersAsync());
        storeAPI.dispatch(push('/ordrar'));
    } else if (action.type === AUTHENTICATION_FAILED) {
        storeAPI.dispatch(push('/login'));
    }
    return n;
}

export default AppLogicMiddleware;
