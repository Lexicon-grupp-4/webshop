import { createAsyncThunk, createSlice, /*PayloadAction*/ } from '@reduxjs/toolkit';
import { RootState, /*AppThunk*/ } from './store';
import { ProductDto } from './DomainClasses';
import { fetchProducts } from './products.api';
import { transformProducts } from './products.api';

export interface ProductsState {
    isLoading: boolean;
    activeProduct?: Product;
    products: Product[]; // no used atm. maybe we will buffer some products
}

export interface Product extends ProductDto {
    display: boolean;
}

const initialState: ProductsState = {
    activeProduct: undefined, isLoading: false, products: []
};

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
        setActiveProduct: (state, action) => {
            if (!!action.payload) {
                const prods = [action.payload];
                transformProducts(prods);
                state.activeProduct = prods[0];
            } else {
                console.log('empty payload');
            }
        },
        clearActiveProduct: (state) => {
            state.activeProduct = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            state.products = [...action.payload];
        })
    }
});

export const { setActiveProduct, clearActiveProduct } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;
export const selectActiveProduct = (state: RootState) => state.products.activeProduct;

export default productsSlice.reducer;
