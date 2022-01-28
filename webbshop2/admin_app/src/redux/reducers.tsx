import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import products, { ProductsState } from './products.slice';
import categories, { CategoriesState } from './categories.slice';

const createRootReducer = (history: History<any>) => combineReducers({
    products,
    categories,
    router: connectRouter(history)
});

export interface AppState {
    products: ProductsState,
    router: RouterState;
    categories: CategoriesState;
}

export default createRootReducer;
