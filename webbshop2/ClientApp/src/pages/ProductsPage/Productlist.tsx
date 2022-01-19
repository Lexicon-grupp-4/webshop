import React from 'react';
import { Container, Card, CardTitle, CardSubtitle, CardBody, CardImg, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, Product } from '../../store/Products';
import { ADD_PRODUCT } from '../../store/ShoppingCart';
import './ProductList.css';

type ProductViewProps = {
    product: Product
}

function ProductView({ product }: ProductViewProps) {
    const dispatch = useDispatch();
    const baseUrl = window.location.origin;
    const imglink = `${baseUrl}/images/${product.pictureUrl}`;
    const { name, quantity } = product;
    return (
        <div className="produts-list-item">
            <Card>
                <CardBody>
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
                        src={imglink}
                        top
                        width="100%"
                    />
                    <Button 
                        className="produts-list-item-buy"
                        onClick={() => dispatch({ type: ADD_PRODUCT, orderItem: product })}
                    >
                        Köp
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}

export default function ProductList() {
    const products = useSelector(selectProducts);
    const visbleProducts = products.filter(p => p.display);
    return (
        <Container>
            <div className="produts-list-container">
                {visbleProducts.map((p) => <ProductView key={p.id} product={p} />)}
            </div>
        </Container>
    );
}
