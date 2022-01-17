import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../app/store';
// import { fetchCount } from './counterAPI';
import { ProductDto } from '../DomainClasses';

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

export const incrementAsync = createAsyncThunk(
  'products/fetch',
  async () => {
    const response = await fetchProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

const product: Product = { id: 1, name: 'dummy', price: 1, quantity: 1, categoryId:1, display: true };

export function fetchProducts() {
    return new Promise<{ data: Product[] }>((resolve) =>
      setTimeout(() => resolve({ data: [product]}), 500)
    );
  }

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        receive: (state, action) => {
            state.products = [...state.products, product];
        }
    }
});

export const { receive } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
