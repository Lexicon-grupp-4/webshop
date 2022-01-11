import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { OrderDto } from './DomainClasses';
import { getToken } from '../tokenService';
import { ApplicationState } from './index';

// STATE

export interface HistoricOrdersState {
    isLoading: boolean;
    orders: OrderDto[];
}

// ACTIONS

export const REQUEST_ORDERS = 'orders/REQUEST_ORDERS';
export const RECEIVE_ORDERS = 'orders/RECEIVE_ORDERS';

interface RequestOrdersAction {
    type: 'orders/REQUEST_ORDERS';
}

interface ReceiveOrdersAction {
    type: 'orders/RECEIVE_ORDERS';
    orders: OrderDto[];
}

type KnownAction = RequestOrdersAction | ReceiveOrdersAction;

export const actionCreators = {
    postOrder: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const token = getToken();
        if (appState) {
            fetch(`api/orders`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json() as Promise<OrderDto[]>)
                .then(data => {
                    dispatch({ type: RECEIVE_ORDERS, orders: data });
                });
            dispatch({ type: REQUEST_ORDERS });
        }
    },
}

// REDUCER 

const unloadedState: HistoricOrdersState = { orders: [], isLoading: false };

export const reducer: Reducer<HistoricOrdersState> = (state: HistoricOrdersState | undefined, incomingAction: Action): ProductsState => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case REQUEST_ORDERS: 
            return {
                ...state,
                isLoading: true
            };
        case RECEIVE_ORDERS:
            return {
                orders: action.orders,
                isLoading: false
            };
    }
    return state;
};

// SELECTORS

export const selectOrders = (state: ApplicationState) => state.orders!.orders;
