import React from 'react';
import { Container, Card, CardBody, Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectProducts, 
    Product, 
    selectProductsIsLoading,
    actionCreators as productsActions } from '../../store/Products';
import { selectSelectedCategoryId, selectCategoryPagination, CategoryPagination } from '../../store/Categories';
import { Waypoint } from 'react-waypoint';
import ProductItem from './ProductItem';
import './ProductList.css';

type LoadMoreProps = {
    categoryId: number
}

function TryLoadMore({ categoryId }: LoadMoreProps) {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectProductsIsLoading);
    const pagination = useSelector(selectCategoryPagination) as CategoryPagination;
    const { isFullyLoaded, loadedPageIdx } = pagination;
    if (isLoading) {
        return null;
    }
    if (isFullyLoaded || loadedPageIdx < -1) return null;

    function loadMore() {
        dispatch(productsActions.requestProducts(categoryId, pagination.loadedPageIdx + 1));
    }

    return (
        <Waypoint onEnter={loadMore} />
    );
}

function LoadingIndicator() {
    return (
        <div className="produts-list-item">
            <Card>
                <CardBody className="produts-list-item-inner text-center">
                    <Spinner animation="border" role="status" /> 
                </CardBody>
            </Card>
        </div>
    );
}

export default function ProductList() {
    const products = useSelector(selectProducts);
    const isLoadingProducts = useSelector(selectProductsIsLoading);
    const selectedCategoryId = useSelector(selectSelectedCategoryId);
    const visbleProducts = products.filter(p => p.display);
    // Adding <TryLoadMore /> to last product
    const lastVisible = [visbleProducts.pop()] as Product[]; 
    const visibleProducts = visbleProducts.map((p) => (<ProductItem key={p.id} product={p} />));
    const lastVisibleProduct = !!lastVisible[0] ? lastVisible.map((p:Product) => (
        <ProductItem key={p.id} product={p} >
            <TryLoadMore categoryId={selectedCategoryId} />
        </ProductItem>
    )): (<TryLoadMore categoryId={selectedCategoryId} />);
    return (
        <Container>
            <div className="produts-list-container">
                {visibleProducts}
                {lastVisibleProduct}
                {isLoadingProducts && (<LoadingIndicator />)}
            </div>
        </Container>
    );
}
