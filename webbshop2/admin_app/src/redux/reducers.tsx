import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import products, { ProductsState } from './products.slice';
import categories, { CategoriesState } from './categories.slice';
import orders, { OrdersState } from './orders.slice';
import auth, { AuthState } from './auth.slice';

const createRootReducer = (history: History<any>) => combineReducers({
    products,
    categories,
    orders,
    auth,
    router: connectRouter(history)
});

export interface AppState {
    products: ProductsState,
    router: RouterState;
    categories: CategoriesState;
    orders: OrdersState;
    auth: AuthState;
}

export default createRootReducer;
