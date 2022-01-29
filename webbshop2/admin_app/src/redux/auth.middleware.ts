import { AppMiddleware } from './app.middleware';

export const AUTHENTICATION_RESOLVED = 'auth/AUTHENTICATION_RESOLVED'; // notification
export const AUTHENTICATION_FAILED = 'auth/AUTHENTICATION_FAILED';

const AuthMiddleware: AppMiddleware = storeAPI => next => action => {
    const n = next(action);
    if (action.type === 'auth/loginSuccess' || action.type === 'auth/fetch/fulfilled') {
        // giving localstorage time to update token
        setTimeout(() => storeAPI.dispatch({ type: AUTHENTICATION_RESOLVED }), 200);
    } else if (action.type === 'auth/fetch/rejected') {
        storeAPI.dispatch({ type: AUTHENTICATION_FAILED });
    }
    return n;
}

export default AuthMiddleware;
