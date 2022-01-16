import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ApplicationState } from './index';
import { CategoryDto } from './DomainClasses';
import { getToken } from '../tokenService';
import { transformCategories } from '../helper_functions/transform_functions';

// STATE

export interface CategoriesState {
    isLoading: boolean;
    categories: Category[];
    selectedCategoryId: number;
}

export interface Category extends CategoryDto {
    uriName: string;
    isSelected: boolean;
}

export const REQUEST_CATEGORIES = 'cate/REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'cate/RECEIVE_CATEGORIES';
export const SELECT_CATEGORIES = 'cate/SELECT_CATEGORIES';

interface RequestCategoriesAction {
    type: 'cate/REQUEST_CATEGORIES';
}

interface ReceiveCategoriesAction {
    type: 'cate/RECEIVE_CATEGORIES';
    categories: Category[];
}

export interface SelectCategoriesAction {
    type: 'cate/SELECT_CATEGORIES';
    selectedCatId: number;
    selectedSubCategories: number[];
}

type KnownAction = RequestCategoriesAction | ReceiveCategoriesAction | SelectCategoriesAction;

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
                    transformCategories(data as Category[]);
                    dispatch({ type: RECEIVE_CATEGORIES, categories: data as Category[]});
                });
            dispatch({ type: REQUEST_CATEGORIES });
        }
    },
    selectCategories: (cat1Name: string, cat2Name: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const categories = appState.cate!.categories;
        const cat1 = categories.find(c => c.uriName === cat1Name);
        const cat2 = categories.find(c => c.uriName === cat2Name);
        if (!!cat2) {
            if (cat2.id === appState.cate!.selectedCategoryId) return; // no change
            const selectedSubCategories = [cat2.id] as number[];
            dispatch({ type: SELECT_CATEGORIES, selectedCatId: cat2.id, selectedSubCategories });
        } else if (!!cat1) {
            if (cat1.id === appState.cate!.selectedCategoryId) return; // no change
            const selectedSubCategories = [cat1.id] as number[];
            // selecting sub categories under parentcategory
            categories.forEach(c => {
                if (c.parentId === cat1.id) selectedSubCategories.push(c.id);
            })
            dispatch({ type: SELECT_CATEGORIES, selectedCatId: cat1.id, selectedSubCategories });
        }
    }
}

// REDUCER 

const rootCategoryId = 1;
const unloadedState: CategoriesState = { categories: [], isLoading: false, selectedCategoryId: rootCategoryId };

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
                ...state,
                categories: action.categories,
                isLoading: false
            };
        case SELECT_CATEGORIES: {
            const categories = [...state.categories];
            categories.forEach(c => {
                c.isSelected = !!action.selectedSubCategories.find(id => id === c.id);
            });
            return {
                categories,
                isLoading: false,
                selectedCategoryId: action.selectedCatId
            };
        } 
    }
    return state;
};

// SELECTORS

export const selectCategorys = (state: ApplicationState) => state.cate!.categories;

// TODO add reselect
export const selectTopCategorys = (state: ApplicationState) => {
    return state.cate!.categories.filter(c => c.parentId === 1);
};
