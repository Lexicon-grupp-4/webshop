import { createAsyncThunk, createSlice, /*PayloadAction*/ } from '@reduxjs/toolkit';
import { RootState, /*AppThunk*/ } from './store';
import { ProductDto } from './DomainClasses';
import { fetchProducts } from './products.api'

export interface ProductsState {
    isLoading: boolean;
    products: Product[];
}

export interface Product extends ProductDto {
    display: boolean;
}

const initialState: ProductsState = {
    products: [], isLoading: false
};

export interface ProductsState {
    isLoading: boolean;
    products: Product[];
}

export const fetchProductsAsync = createAsyncThunk(
    'products/fetch',
    async () => {
        const response = await fetchProducts();
        return response.products;
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        receive: (state, action) => {
            state.products = [...state.products, ...action.payload];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            state.products = [...action.payload];
        })
    }
});

export const { receive } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
