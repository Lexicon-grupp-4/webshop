import React from 'react';
import { Route, Switch } from 'react-router';
import ProductPage from './pages/ProductsPages';
import OrdersPage from './pages/OrdersPage';
import Layout from './components/Layout';

import { useAppDispatch } from './redux/hooks';
// import {
//     receive,
//     fetchProductsAsync
// } from './redux/products.slice';
import {
    receive,
    fetchCategriesAsync
} from './redux/categories.slice';


import './App.css';

function App() {
    const dispatch = useAppDispatch();
    return (
        <Layout>
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
        </Layout>
    );
}

export default App;
