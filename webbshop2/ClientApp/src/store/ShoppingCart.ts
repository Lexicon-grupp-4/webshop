import { Action, Reducer } from 'redux';
import { ApplicationState } from './index';
import { Product } from './Products';

export interface ShoppingCartState {
    orderItems: OrderItem[];
}

// maybe it's just identical to product
export interface OrderItem extends Product {}

// ACTIONS 

export const ADD_PRODUCT = 'cart/ADD_PRODUCT';
export const REMOVE_PRODUCT = 'cart/REMOVE_PRODUCT';

interface AddProductAction {
    type: 'cart/ADD_PRODUCT';
    orderItem: OrderItem;
}

export interface RemoveProductAction {
    type: 'cart/REMOVE_PRODUCT';
    orderItem: OrderItem;
}

type KnownAction = AddProductAction | RemoveProductAction;

export const actionCreators = {

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
            const orderItems = [...state.orderItems] as OrderItem[];
            const found = orderItems.find(i => i.id === action.orderItem.id);
            if (found) found.quantity += action.orderItem.quantity;
            else orderItems.push(action.orderItem);
            return {
                ...state,
                orderItems
            };
        }
        case REMOVE_PRODUCT: {
            const items = [...state.orderItems] as OrderItem[];
            // TODO Maybe decrease quantity and remove only if quantity = 0
            const orderItems = items.filter(i => i.id !== action.orderItem.id);
            return {
                ...state,
                orderItems
            };
        }
    }

    return state;
};

// SELECTORS

export const selectOrderItems = (state: ApplicationState) => state.cart!.orderItems;