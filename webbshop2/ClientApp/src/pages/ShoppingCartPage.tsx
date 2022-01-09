import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrderItems, OrderItem, REMOVE_PRODUCT, RemoveProductAction } from '../store/ShoppingCart';

const makeList = (items: OrderItem[], handleClick: any, removeOrderItem: any) =>
    items.map((i) => {
        return (
        <tr key={i.id} onClick={() => handleClick(i.id)}>
            <td>{i.name}</td>
            <td>{i.price}</td>
            <td>{i.quantity}</td>
            <th><button onClick={() => removeOrderItem(i)}>ta bort</button></th>
        </tr>
        );
    });

export default function ShoppingCartPage() {
    const products = useSelector(selectOrderItems);
    const dispatch = useDispatch();
    function selectOrderItem(id: number) {
    }
    function removeOrderItem(orderItem: OrderItem) {
        dispatch({ type: REMOVE_PRODUCT, orderItem} as RemoveProductAction);
    }
    return (
        <table className={'table'}>
        <thead>
            <tr>
            <th scope="col">Namn</th>
            <th scope="col">Pris</th>
            <th scope="col">Antal</th>
            </tr>
        </thead>
        <tbody>{products && makeList(products, selectOrderItem, removeOrderItem)}</tbody>
        </table>
    );
}
