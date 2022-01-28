import { Middleware } from 'redux';
import { AppState } from './reducers';
// import { fetchProductsAsync } from './products.slice';
import { fetchCategriesAsync } from './categories.slice';

export type AppMiddleware = Middleware<{}, AppState>
export const APP_INIT = 'app/INIT'

const AppLogicMiddleware: AppMiddleware = storeAPI => next => action => {
    const n = next(action);
    if (action.type === APP_INIT) {
        // @ts-ignore
        // storeAPI.dispatch(fetchProductsAsync());
        // @ts-ignore
        storeAPI.dispatch(fetchCategriesAsync());
    }
    return n;
}

export default AppLogicMiddleware;