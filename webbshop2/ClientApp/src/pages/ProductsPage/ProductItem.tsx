import React from 'react';
import { Card, CardTitle, CardSubtitle, CardBody, CardImg, Button, Badge } from 'reactstrap';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Product } from '../../store/Products';
import { ADD_PRODUCT, CartItem } from '../../store/ShoppingCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

type ProductItemProps = {
    product: Product,
    children?: React.ReactNode
}

// Children could be an TryLoadMore-component
export default function ProductItem({ product, children }: ProductItemProps) {
    const dispatch = useDispatch();
    const baseUrl = window.location.origin;
    const imglink = `${baseUrl}/images/${product.pictureUrl}`;
    const { name, reserved_quantity, price, categoryName, localPrice } = product;
    const highlightClasses = classNames({
        'produts-list-item-highlight-cart': reserved_quantity,
        'produts-list-item-highlight': !reserved_quantity
      });
    function AddProduct({name, id, reserved_quantity }: Product) {
        const quantity = reserved_quantity ? reserved_quantity + 1 : 1;
        const orderItem: CartItem = {
            id,
            productId: id,
            quantity,
            price,
            name,
        }
        dispatch({ type: ADD_PRODUCT, orderItem });
    }
    return (
        <div className="produts-list-item">
            <Card>
                <CardBody className="produts-list-item-inner">
                    <div className={highlightClasses}></div> 
                    <CardTitle tag="h5" className="produts-list-item-title">
                        {name}
                    </CardTitle>
                    {/* <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Antal: {quantity}
                    </CardSubtitle> */}
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        <span className="produts-list-item-categori">{categoryName}</span> 
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
                        { reserved_quantity ? (
                            <>
                                {'\u00A0'}
                                <FontAwesomeIcon icon={faShoppingCart}/>
                                {'\u00A0'}
                                <Badge
                                    color="success"
                                    className="produts-list-item-reserved-number"
                                    pill
                                >
                                    {reserved_quantity}
                                </Badge>
                            </>
                        ) : <> KÖP </>}
                    </Button>
                    
                    {children}
                    <div className="produts-list-item-price-tag">
                        <span className="produts-list-item-price">{localPrice}</span> <span>kr</span>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
