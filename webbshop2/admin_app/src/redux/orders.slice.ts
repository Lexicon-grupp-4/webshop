import { createAsyncThunk, createSlice, /*PayloadAction*/ } from '@reduxjs/toolkit';
import { RootState, /*AppThunk*/ } from './store';
import { OrderDto } from './DomainClasses';
import { fetchOrders } from './orders.api';

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
        return response.categories;
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
    }
});

export const { receive } = ordersSlice.actions;

export const selectOrders = (state: RootState) => state.orders.orders;

export default ordersSlice.reducer;
