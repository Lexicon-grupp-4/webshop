import { createAsyncThunk, createSlice, /*PayloadAction*/ } from '@reduxjs/toolkit';
import { RootState, /*AppThunk*/ } from './store';
import { CategoryDto } from './DomainClasses';
import { fetchCategories } from './categories.api'

export interface CategoriesState {
    isLoading: boolean;
    categories: Category[];
    selectedCategoryId: number;
}

export interface Category extends CategoryDto {
    uriName: string;
    isSelected: boolean;
}

const rootCategoryId = 1;
const initialState: CategoriesState = {
    categories: [], isLoading: false, selectedCategoryId: rootCategoryId
};

export const fetchCategriesAsync = createAsyncThunk(
    'categories/fetchAll',
    async () => {
        const response = await fetchCategories();
        return response.categories;
    }
);


export const productsSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        receive: (state, action) => {
            state.categories = [...state.categories, ...action.payload];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategriesAsync.fulfilled, (state, action) => {
            state.categories = [...action.payload];
        })
    }
});

export const { receive } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
