import { createAsyncThunk, createSlice, /*PayloadAction*/ } from '@reduxjs/toolkit';
import { RootState, /*AppThunk*/ } from './store';
import { OrderDto } from './DomainClasses';
import { fetchOrders, patchOrder } from './orders.api';
import { transformOrder } from './orders.api';

export interface OrdersState {
    isLoading: boolean;
    orders: Order[];
}

export interface Order extends OrderDto {
    uriName: string;
    localTime?: string;
    isSelected: boolean;
}

const initialState: OrdersState = {
    orders: [], isLoading: false
};

export const fetchOrdersAsync = createAsyncThunk(
    'orders/fetchAll',
    async () => {
        const response = await fetchOrders();
        return response.orders;
    }
);

export const patchOrderAsync = createAsyncThunk(
    'orders/patchOrder',
    async (order: OrderDto) => {
        const response = await patchOrder(order);
        return response.order;
    }
);

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        receive: (state, action) => {
            state.orders = [...state.orders, ...action.payload];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
            state.orders = [...action.payload];
        })
        builder.addCase(patchOrderAsync.fulfilled, (state, action) => {
            const idx = state.orders.findIndex(o => o.id === action.payload.id);
            if (idx !== -1) state.orders[idx] = transformOrder(action.payload);
        })
    }
});

export const { receive } = ordersSlice.actions;

export const selectOrders = (state: RootState) => state.orders.orders;

export default ordersSlice.reducer;
