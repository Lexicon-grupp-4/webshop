import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, Product } from '../store/Products';
import { ADD_PRODUCT } from '../store/ShoppingCart';

const makeList = (products: Product[], handleClick: any, handleAdd: any) => 
    products.map((p) => {
        return (
        <tr key={p.id} onClick={() => handleClick(p.id)}>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>{p.quantity}</td>
            <th><button onClick={() => handleAdd(p)}>lägg i varukorg</button></th>
        </tr>
        );
});
    
type Props = {
    cat1?: string
}

export default function ProductList({ cat1 }: Props) {
    const products = useSelector(selectProducts);
    const visbleProducts = products.filter(p => p.display);
    const dispatch = useDispatch();
    function selectProduct(id: number) {
        dispatch({ type: 'SELECT_PRODUCT', id });
    }
    function addProductToCart(p: Product) {
        const product = {...p, quantity: 1}; // only buy one per click
        dispatch({ type: ADD_PRODUCT, orderItem: product });
    }
    return (
        <table className={'table'}>
        <thead>
            <tr>
            <th scope="col">Namn</th>
            <th scope="col">Pris</th>
            <th scope="col">Quantity</th>
            </tr>
        </thead>
        <tbody>{products && makeList(visbleProducts, selectProduct, addProductToCart)}</tbody>
        </table>
    );
}
