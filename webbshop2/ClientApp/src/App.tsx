import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import OrdersPage from './pages/OrdesPage';
import ProductsPage from './pages/ProductsPage';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={ProductsPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/cart' component={ShoppingCartPage} />
        <Route path='/orders' component={OrdersPage} />
    </Layout>
);
