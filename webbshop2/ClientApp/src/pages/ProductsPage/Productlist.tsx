import React from 'react';
import { Container, Card, CardTitle, CardSubtitle, CardBody, CardImg, Button, Badge, Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectProducts, 
    Product, 
    selectProductsIsLoading,
    actionCreators as productsActions } from '../../store/Products';
import { selectSelectedCategoryId, selectCategoryPagination, CategoryPagination } from '../../store/Categories';
import { ADD_PRODUCT, CartItem } from '../../store/ShoppingCart';
import { Waypoint } from 'react-waypoint';
import './ProductList.css';

type ProductViewProps = {
    product: Product,
    children?: React.ReactNode
}

function ProductView({ product, children }: ProductViewProps) {
    const dispatch = useDispatch();
    const baseUrl = window.location.origin;
    const imglink = `${baseUrl}/images/${product.pictureUrl}`;
    const { name, quantity, reserved_quantity, price } = product;
    function AddProduct({name, id, reserved_quantity }: Product) {
        const quantity = reserved_quantity ? reserved_quantity + 1 : 1;
        const orderItem: CartItem = {
            id,
            productId: id,
            quantity,
            price,
            name
        }
        dispatch({ type: ADD_PRODUCT, orderItem });
    }
    return (
        <div className="produts-list-item">
            <Card>
                <CardBody className="produts-list-item-inner">
                    <CardTitle tag="h5">
                        {name}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Antal: {quantity}
                    </CardSubtitle>
                    <CardImg
                        alt="product"
                        rel="prefetch" 
                        src={imglink}
                        top
                        width="100%"
                    />
                    <Button 
                        className="produts-list-item-buy"
                        onClick={() => dispatch(() => AddProduct(product))}
                    >
                        Köp
                    </Button>
                    { reserved_quantity && (
                        <Badge
                            color="success"
                            className="produts-list-item-reserved-number"
                            pill
                        >
                            {reserved_quantity}
                        </Badge>
                    )}
                    {children}
                </CardBody>
            </Card>
        </div>
    );
}

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
    const visibleProducts = visbleProducts.map((p) => (<ProductView key={p.id} product={p} />));
    const lastVisibleProduct = !!lastVisible[0] ? lastVisible.map((p:Product) => (
        <ProductView key={p.id} product={p} >
            <TryLoadMore categoryId={selectedCategoryId} />
        </ProductView>
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
