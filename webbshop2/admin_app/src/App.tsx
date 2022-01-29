import React from 'react';
import 'bulma/css/bulma.min.css';
import { Route, Switch } from 'react-router';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import TestPage from './pages/Testpage';
import CustomersPage from './pages/CustomersPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <Layout>
            <Switch> 
                <Route path="/" exact component={OrdersPage} />
                <Route path="/ordrar" component={OrdersPage} />
                <Route path="/produkter" component={ProductsPage} />
                <Route path="/kunder" component={CustomersPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/test" component={TestPage} />
            </Switch>
        </Layout>
    );
}

export default App;
