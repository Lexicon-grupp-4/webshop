import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsSlice from '../app/redux/Product/ProductsSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
