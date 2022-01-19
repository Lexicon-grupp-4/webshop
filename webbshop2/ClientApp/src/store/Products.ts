import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ApplicationState } from './index';
import { ProductDto } from './DomainClasses';
import { transformProducts } from '../helper_functions/transform_functions';

// STATE

export interface ProductsState {
    isLoading: boolean;
    products: Product[];
}

export interface Product extends ProductDto {
    display: boolean;
    reserved_quantity?: number; // reserved for shopping cart
}

// ACTIONS

export const REQUEST_PRODUCTS = 'prods/REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'prods/RECEIVE_PRODUCTS';
export const SELECT_PRODUCTS_BY_CATEGORIES = 'prods/SELECT_PRODUCTS_BY_CATEGORIES';
export const UPDATE_SELECTION = 'prods/UPDATE_SELECTION';

interface RequestProductsAction {
    type: 'prods/REQUEST_PRODUCTS';
}

interface ReceiveProductsAction {
    type: 'prods/RECEIVE_PRODUCTS';
    products: Product[];
}

export interface SelectProductsByCategoriesAction {
    type: 'prods/SELECT_PRODUCTS_BY_CATEGORIES';
    categories: number[];
}

interface UpdateProductSelectionAction {
    type: 'prods/UPDATE_SELECTION';
    productId: number;
    reserved_quantity: number;
}

type KnownAction = RequestProductsAction | ReceiveProductsAction 
    | SelectProductsByCategoriesAction | UpdateProductSelectionAction;

// ACTION CREATORS

export const actionCreators = {
    requestProducts: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState) {
            fetch(`api/products`)
                .then(response => response.json() as Promise<Product[]>)
                .then((products: ProductDto[]) => {
                    transformProducts(products as Product[]);
                    dispatch({ type: RECEIVE_PRODUCTS, products: products as Product[] });
                });

            dispatch({ type: REQUEST_PRODUCTS });
        }
    },
    selectProductsByCategories: (categories: number[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: SELECT_PRODUCTS_BY_CATEGORIES, categories });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ProductsState = { products: [], isLoading: false };

export const reducer: Reducer<ProductsState> = (state: ProductsState | undefined, incomingAction: Action): ProductsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case REQUEST_PRODUCTS:
            return {
                products: state.products,
                isLoading: true
            };
        case RECEIVE_PRODUCTS:
            return {
                products: action.products,
                isLoading: false
            };
        case SELECT_PRODUCTS_BY_CATEGORIES: {
            const products = [...state.products];
            products.forEach(p => {
                p.display = !!action.categories.find(id => id === p.categoryId);
            });
            return {
                ...state,
                products
            };
        }
        case UPDATE_SELECTION: {
            // NOTE: too much logic here
            const prodIdx = state.products.findIndex(p => p.id === action.productId);
            if (prodIdx === -1) {
                console.log('not found', prodIdx);
                break;
            }
            const changed: Product = { ...state.products[prodIdx], reserved_quantity: action.quantity };
            const unchanged = state.products.filter(p => p.id !== action.productId);
            const prods = [...unchanged, changed] as Product[];
            prods.sort((a, b) => a.id - b.id); // expensive, a correct insert would be better
            return {
                ...state,
                products: prods
            };       
        }
    }

    return state;
};

// SELECTORS 

export const selectProducts = (state: ApplicationState) => state.products!.products;
