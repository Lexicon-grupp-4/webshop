import * as React from 'react';
import { connect } from 'react-redux';
import ProductList from './ProductList';

const Home = () => (
    <div>
        <ProductList />
    </div>
);

export default connect()(Home);
