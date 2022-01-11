import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { CartItem } from '../store/DomainClasses';
import { 
    selectOrderItems,
    REMOVE_PRODUCT, 
    RemoveProductAction,
    actionCreators
} from '../store/ShoppingCart';

const makeList = (items: CartItem[], handleClick: any, removeOrderItem: any) =>
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
    const items = useSelector(selectOrderItems);
    const dispatch = useDispatch();
    function selectOrderItem(id: number) {
    }
    function removeOrderItem(orderItem: CartItem) {
        dispatch({ type: REMOVE_PRODUCT, orderItem} as RemoveProductAction);
    }
    return (
        <>
            <table className={'table'}>
                <thead>
                    <tr>
                    <th scope="col">Namn</th>
                    <th scope="col">Pris</th>
                    <th scope="col">Antal</th>
                    </tr>
                </thead>
                <tbody>{items && makeList(items, selectOrderItem, removeOrderItem)}</tbody>
            </table>
            <Button disabled={items.length === 0} onClick={() => dispatch(actionCreators.postOrder())}>Skicka Order</Button>
        </>
    );
}
