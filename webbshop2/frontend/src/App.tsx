import React from 'react';
import 'bulma/css/bulma.min.css';
import { Route, Switch } from 'react-router';
import ProductPage from './pages/ProductsPages';
import OrdersPage from './pages/OrdersPage';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <Layout>
            <Switch> 
                <Route path="/" exact component={ProductPage} />
                <Route path="/ordrar" component={OrdersPage} />
                <Route path="/produkter" component={ProductPage} />
            </Switch>
        </Layout>
    );
}

export default App;
