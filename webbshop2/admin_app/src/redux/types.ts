import { Action, Middleware } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from './reducers';

// im not super confident here...
// export type AsyncAction = ThunkAction<void, RootState, unknown, Action<string>>;

// export type AppMiddleware = Middleware<{}, RootState>

// a thunk action ment to be containing a multiple subactions run with await
export type AsyncAction = ThunkAction<void, AppState, unknown, Action<string>>;

export type AppMiddleware = Middleware<{}, AppState>


