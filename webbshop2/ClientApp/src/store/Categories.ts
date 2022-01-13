import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ApplicationState } from './index';
import { CategoryDto } from './DomainClasses';
import { getToken } from '../tokenService';

// STATE

export interface CategoriesState {
    isLoading: boolean;
    categories: Category[];
}

export interface Category extends CategoryDto {}

export const REQUEST_CATEGORIES = 'cate/REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'cate/RECEIVE_CATEGORIES';

interface RequestCategoriesAction {
    type: 'cate/REQUEST_CATEGORIES';
}

interface ReceiveCategoriesAction {
    type: 'cate/RECEIVE_CATEGORIES';
    categories: CategoryDto[];
}

type KnownAction = RequestCategoriesAction | ReceiveCategoriesAction;

export const actionCreators = {
    requestCategories: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const token = getToken();
        if (appState) {
            fetch(`api/categories`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json() as Promise<CategoryDto[]>)
                .then((data: CategoryDto[]) => {
                    dispatch({ type: RECEIVE_CATEGORIES, categories: data as Category[]});
                });
            dispatch({ type: REQUEST_CATEGORIES });
        }
    }
}

// REDUCER 

const unloadedState: CategoriesState = { categories: [], isLoading: false };

export const reducer: Reducer<CategoriesState> = (state: CategoriesState | undefined, incomingAction: Action): CategoriesState => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case REQUEST_CATEGORIES: 
            return {
                ...state,
                isLoading: true
            };
        case RECEIVE_CATEGORIES:
            return {
                categories: action.categories,
                isLoading: false
            };
    }
    return state;
};

// SELECTORS

export const selectCategorys = (state: ApplicationState) => state.cate!.categories;

// TODO add reselect
export const selectTopCategorys = (state: ApplicationState) => {
    return state.cate!.categories.filter(c => c.parentId === 1);
};
