import React from 'react';
import { Route, Switch } from 'react-router';
import ProductPage from './pages/ProductsPages';
import OrdersPage from './pages/OrdersPage';

import { useAppDispatch } from './redux/hooks';
// import {
//     receive,
//     fetchProductsAsync
// } from './redux/products.slice';
import {
    receive,
    fetchCategriesAsync
} from './redux/categories.slice';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/store';

import './App.css';

function App() {
    const dispatch = useAppDispatch();
    return (
        <ConnectedRouter history={history}>
            <Switch> 
            <Route path="/" exact component={ProductPage} />
            <Route path="/odrar" component={OrdersPage} />
            <Route path="/produkter" component={ProductPage} />
            </Switch>
            <button
                aria-label="Decrement value"
                onClick={() => dispatch(receive('ddd'))}
            >
                testa
            </button>
            <button
                aria-label="Decrement value"
                onClick={() => dispatch(fetchCategriesAsync())}
            > 
                    cats async
            </button>
        </ConnectedRouter>
    );
}

export default App;
