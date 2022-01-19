import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ApplicationState } from './index';
import { getToken } from '../tokenService';
import { OrderDto, OrderItemDto } from './DomainClasses';

export interface ShoppingCartState {
    orderItems: CartItem[];
}

// maybe it's just identical to product
export interface CartItem extends OrderItemDto {
    name: string;
}

// ACTIONS 

export const ADD_PRODUCT = 'cart/ADD_PRODUCT';
export const REMOVE_PRODUCT = 'cart/REMOVE_PRODUCT';
export const SEND_ORDER = 'cart/SEND_ORDER';
export const SEND_ORDER_SUCCESS = 'cart/SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILURE = 'cart/SEND_ORDER_FAILURE';

export interface AddProductAction {
    type: 'cart/ADD_PRODUCT';
    orderItem: CartItem;
}
export interface RemoveProductAction {
    type: 'cart/REMOVE_PRODUCT';
    orderItem: CartItem;
}
interface SendOrderAction {
    type: 'cart/SEND_ORDER';
}
interface SendOrderSuccessAction {
    type: 'cart/SEND_ORDER_SUCCESS';
}
interface SendOrderFailureAction {
    type: 'cart/SEND_ORDER_FAILURE';
}

type KnownAction = AddProductAction | RemoveProductAction | SendOrderAction 
| SendOrderSuccessAction | SendOrderFailureAction;

function MakeOrder(orderItems: CartItem[]): OrderDto {
    const items = orderItems.map(o => {
        return { id: o.id, quantity: o.quantity, i:o.id}
    });
    return {
        items
    };
}

export const actionCreators = {
    postOrder: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const items = appState.cart!.orderItems;
        const token = getToken();
        const order = MakeOrder(items!);
        if (appState) {
            fetch(`api/orders`, {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if(response.ok) {
                        dispatch({ type: SEND_ORDER_SUCCESS })
                        return response.json();
                    } else {
                        throw Error('bad response');
                    }
                })
                .catch(() => dispatch({ type: SEND_ORDER_FAILURE }));

            dispatch({ type: SEND_ORDER });
        }
    },
}

// REDUCER

const unloadedState: ShoppingCartState = { orderItems: [] };

export const reducer: Reducer<ShoppingCartState> = (state: ShoppingCartState | undefined, incomingAction: Action): ShoppingCartState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case ADD_PRODUCT: {
            // TODO check closer!
            const orderItems = [...state.orderItems] as CartItem[];
            const found = orderItems.find(i => i.id === action.orderItem.id);
            if (found) found.quantity = action.orderItem.quantity;
            else orderItems.push(action.orderItem);
            return {
                ...state,
                orderItems
            };
        }
        case REMOVE_PRODUCT: {
            const items = [...state.orderItems] as CartItem[];
            // TODO Maybe decrease quantity and remove only if quantity = 0
            const orderItems = items.filter(i => i.id !== action.orderItem.id);
            return {
                ...state,
                orderItems
            };
        }
        case SEND_ORDER_SUCCESS:
            return {
            ...state,
            orderItems: []
        };
    }

    return state;
};

// SELECTORS

export const selectOrderItems = (state: ApplicationState) => state.cart!.orderItems;
