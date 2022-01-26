import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ApplicationState } from './index';
import { CategoryDto } from './DomainClasses';
import { getToken } from '../tokenService';
import { transformCategories } from '../helper_functions/transform_functions';
import { RECEIVE_PRODUCTS, ReceiveProductsAction  } from './Products';
import apiSettings from '../config/apiSettings';

// STATE

export interface CategoriesState {
    isLoading: boolean;
    categories: Category[];
    selectedCategoryId: number;
}

export interface CategoryPagination {
    loadedPageIdx: number;
    isFullyLoaded: boolean;
}
export const categoryPaginationStart: CategoryPagination = {
    loadedPageIdx: -1, isFullyLoaded: false
}

export interface Category extends CategoryDto {
    uriName: string;
    isSelected: boolean;
    pagination: CategoryPagination;
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

type KnownAction = RequestCategoriesAction | ReceiveCategoriesAction 
| SelectCategoriesAction | ReceiveProductsAction;

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
        if (!cat1) {
            dispatch({ type: SELECT_CATEGORIES, selectedCatId: 1, selectedSubCategories: []});
        } else if (!!cat2) {
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
    },
    changeCategoryNav: (cat1Id: number, cat2Id?: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        const categories = appState.cate!.categories;
        const deepestCatId = cat2Id? cat2Id : cat1Id;
        const deepst = categories.find(c => c.id === deepestCatId);
        if (!deepst) {
            console.log("we need to load cats before page change");
        } else {
            console.log("page change");

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
        case RECEIVE_PRODUCTS: {
            const categories = [...state.categories];
            const catIdx = categories.findIndex(c => c.id === action.catId);
            if (catIdx >= 0) {
                categories[catIdx].pagination.loadedPageIdx += 1; // maybe risky
                if (action.products.length < apiSettings.pageSize) {
                    categories[catIdx].pagination = { ...categories[catIdx].pagination, isFullyLoaded: true};
                    // TODO: a fully loaded parent category should also set childern nodes to fully loaded
                }
            }
            return {
                ...state,
                categories
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

export const selectSelectedCategoryId = (state: ApplicationState) => state.cate!.selectedCategoryId;

export const selectCategoryPagination = (state: ApplicationState) => {
    const cat = state.cate!.categories.find(c => c.id === state.cate!.selectedCategoryId);
    return cat? cat.pagination : {loadedPageIdx: -10, isFullyLoaded: false }; 
}
