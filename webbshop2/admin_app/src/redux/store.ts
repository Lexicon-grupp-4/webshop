import { createBrowserHistory } from 'history';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createRootReducer from './reducers';
import appMiddleware, { APP_INIT } from './app.middleware';

export const history = createBrowserHistory();

export const store = configureStore({
    reducer: createRootReducer(history),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([appMiddleware]),
    // devTools : {
    //     name: 'ReduxList'
    // }
});

store.dispatch({ type: APP_INIT })

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
