import { Middleware } from 'redux';
import { ApplicationState } from './';
import { matchPath } from "react-router";
import { push, LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { 
    CREDENTIALS_LOGIN_SUCCESS, 
    REGISTER_ACCOUNT_SUCCESS, 
    actionCreators as authActions,
    AUTHENTICATION_DONE,
    TOKEN_VERIFICATION_SUCCESS,
    LOGOUT
 } from './Auth';
import { 
    SELECT_PRODUCTS_BY_CATEGORIES,
    REMOVE_ALL_RESERVATIONS,
    UPDATE_RESERVATION,
    RECEIVE_PRODUCTS,
    SelectProductsByCategoriesAction,
    UpdateProductReservationAction,
    ReceiveProductsAction,
    actionCreators as prodActions, 
 } from './Products';
import { actionCreators as ordersActions } from './Orders';
import {
    actionCreators as cateActions, 
    SELECT_CATEGORIES, 
    RECEIVE_CATEGORIES,
    SelectCategoriesAction
} from './Categories';
import {
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    SEND_ORDER_SUCCESS,
    AddProductAction
} from './ShoppingCart';

export type LoaderMiddleware = Middleware<{}, ApplicationState>

export const APP_START = 'app/APP_START';
export const APP_CLEAR_PERSONAL_DATA = 'app/APP_CLEAR_PERSONAL_DATA';
export const APP_SELECT_CATEGORIES_FROM_URL = 'app/APP_SELECT_CATEGORIES_FROM_URL';
export interface ClearPeronalDataAction {
    type: 'app/APP_CLEAR_PERSONAL_DATA';
}

export const CHANGE_CATEGORY_NAV = 'app/CHANGE_CATEGORY_NAV';
export interface ChangeCategoryNavigationAction {
    type: 'app/CHANGE_CATEGORY_NAV';
    cat1Id: number; // parent
    cat2Id: number; // subcategory1
}

// To keep subsystems in app separated, listen for an action and translate it to notification 
// for another system. If we want even more separation, then add one middleware per subsystem.
const AppLogicMiddleware: LoaderMiddleware = storeAPI => next => action => {
    const n = next(action);
    // TODO fix @ts-ignore on thunk actions
    if (action.type === APP_START) {
        // @ts-ignore
        storeAPI.dispatch(authActions.verifyAuthenticationToken());
        // @ts-ignore
        // storeAPI.dispatch(productsActions.requestProducts());
        // @ts-ignore
        storeAPI.dispatch(cateActions.requestCategories());
    } else if (action.type === CREDENTIALS_LOGIN_SUCCESS) {
        // After successfull login move to route /
        storeAPI.dispatch(push(''));
        storeAPI.dispatch(authActions.authenticationDone);
    } else if (action.type === REGISTER_ACCOUNT_SUCCESS) {
        // After successfull login move to route /
        storeAPI.dispatch(push('/login'));
    } else if (action.type === TOKEN_VERIFICATION_SUCCESS) {
        storeAPI.dispatch(authActions.authenticationDone);
    } else if (action.type === AUTHENTICATION_DONE) {
        // wait! since local storage token might not have been updated
        setTimeout(() => {
            // @ts-ignore
            storeAPI.dispatch(ordersActions.requestOrders());
        }, 100)
    } else if (action.type === LOGOUT) {
        storeAPI.dispatch({type: APP_CLEAR_PERSONAL_DATA});
    } else if (action.type === LOCATION_CHANGE) {
        const act = action as LocationChangeAction;
        const catPathMatch = matchPath(act.payload.location.pathname, {
            path: "/produkter/:cat1/:cat2?"
        });
        const noCatPathMatch = matchPath(act.payload.location.pathname, {
            path: "/", exact: true
        });
        console.log('LOCATION_CHANGE', catPathMatch, noCatPathMatch)
        if (!!catPathMatch) {
            // @ts-ignore
            storeAPI.dispatch(cateActions.selectCategories(catPathMatch.params.cat1, catPathMatch.params.cat2));
        } else if (!!noCatPathMatch) {
            // @ts-ignore
            storeAPI.dispatch(cateActions.selectCategories());
        }
    } else if (action.type === SELECT_CATEGORIES) {
        // note: maybe introduce SELECT_CATEGORIES_CHANGED
        const categories = (action as SelectCategoriesAction).selectedSubCategories;
        storeAPI.dispatch({ type: SELECT_PRODUCTS_BY_CATEGORIES, categories } as 
            SelectProductsByCategoriesAction );
    } else if (action.type === ADD_PRODUCT || action.type === REMOVE_PRODUCT) {
        const orderItem = (action as AddProductAction).orderItem;
        const { productId, quantity } = orderItem;
        storeAPI.dispatch({ type: UPDATE_RESERVATION, productId, reserved_quantity: quantity } as 
            UpdateProductReservationAction );
    } else if (action.type === SEND_ORDER_SUCCESS) {
        storeAPI.dispatch({ type: REMOVE_ALL_RESERVATIONS });
    } else if (action.type === CHANGE_CATEGORY_NAV) {
        console.log('CHANGE_CATEGORY_NAV', action);
        const categories = storeAPI.getState().cate!.categories;
        const changeCategorAction = (action as ChangeCategoryNavigationAction);
        const {cat1Id, cat2Id} = changeCategorAction;
        const deepestCatId = cat2Id? cat2Id : cat1Id;
        const deepstCategory = categories.find(c => c.id === deepestCatId);
        if (deepstCategory) {
            if (deepstCategory.pagination.loadedPageIdx === -1 ){
                console.log("we need to load cats before page change");
                // @ts-ignore
                storeAPI.dispatch(prodActions.requestProducts(deepstCategory.id, 0));
            } else {
                console.log("page change", deepestCatId);
                storeAPI.dispatch(push(`/produkter/${deepstCategory.uriName}`));
            }
        }
        
    } else if (action.type === RECEIVE_PRODUCTS) {
        const receiveProductsAction = (action as ReceiveProductsAction);
        const categories = storeAPI.getState().cate!.categories;
        const deepstCategory = categories.find(c => c.id === receiveProductsAction.catId);
        console.log('RECEIVE_PRODUCTS', deepstCategory);
        if (deepstCategory) {
            if (deepstCategory.parentId == 0) {
                console.log('RECEIVE_PRODUCTS under root')
            } else if (deepstCategory.parentId === 1) {
                storeAPI.dispatch(push(`/produkter/${deepstCategory.uriName}`));
            } else {
                const parentCat = categories.find(c => c.id === deepstCategory.parentId);
                if (!parentCat) console.error('cant find parent to', deepstCategory);
                console.log('parent cat', parentCat)
                console.log(`/produkter/${parentCat!.uriName}/${deepstCategory.uriName}`)
                storeAPI.dispatch(push(`/produkter/${parentCat!.uriName}/${deepstCategory.uriName}`));
            }
        } 
    } else if (action.type === RECEIVE_CATEGORIES) {
        storeAPI.dispatch({ type: APP_SELECT_CATEGORIES_FROM_URL});
    } else if (action.type === APP_SELECT_CATEGORIES_FROM_URL) {
        // @ts-ignore
        const router = storeAPI.getState().router;
        const catPathMatch = matchPath(router.location.pathname, {
            path: "/produkter/:cat1/:cat2?"
        });
        // @ts-ignore
        if (!!catPathMatch) storeAPI.dispatch(cateActions.selectCategories(catPathMatch.params.cat1, catPathMatch.params.cat2));
    }


    return n;
}

export default AppLogicMiddleware;
