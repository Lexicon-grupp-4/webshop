import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ShoppingCartPage from './pages/ShoppingCartPage';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/cart' component={ShoppingCartPage} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
);
