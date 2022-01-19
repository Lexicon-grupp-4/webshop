import React from 'react';
// import ProductList from '../../components/ProductList';
import { Container } from 'reactstrap';
import CategoriesMenu from './CategoriesMenu';
import ProductList from  './Productlist';

function ProductPage() {
    return (
        <>
            <Container>
                <CategoriesMenu />
            </Container>
            <br />
            <ProductList />
        </>
    )
}

export default ProductPage;
