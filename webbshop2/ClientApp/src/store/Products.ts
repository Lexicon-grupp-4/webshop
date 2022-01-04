import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ApplicationState } from './index';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ProductsState {
    isLoading: boolean;
    products: Product[];
}

export interface Product {
    id: number;
    name: number;
    price: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestProductsAction {
    type: 'REQUEST_PRODUCTS';
}

interface ReceiveProductsAction {
    type: 'RECEIVE_PRODUCTS';
    products: Product[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestProductsAction | ReceiveProductsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestProducts: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState) {
            fetch(`api/products`)
                .then(response => response.json() as Promise<Product[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_PRODUCTS', products: data });
                });

            dispatch({ type: 'REQUEST_PRODUCTS' });
        }
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
        case 'REQUEST_PRODUCTS':
            return {
                products: state.products,
                isLoading: true
            };
        case 'RECEIVE_PRODUCTS':
            return {
                products: action.products,
                isLoading: false
            };
            break;
    }

    return state;
};

// SELECTORS 

export const selectProducts = (state: ApplicationState) => state.products!.products;
