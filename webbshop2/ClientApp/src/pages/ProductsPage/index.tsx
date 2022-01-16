import React from 'react';
import ProductList from '../../components/ProductList';
import { Container, TabContent } from 'reactstrap';
import CategoriesMenu from './CategoriesMenu';

function ProductPage() {
    return (
        <>
            <Container>
                <CategoriesMenu />
            </Container>
            <br />
            <TabContent activeTab={1}>
                <Container>
                    <ProductList cat1={'cat1'} />
                </Container>
            </TabContent>
        </>
    )
}

export default ProductPage;
