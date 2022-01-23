import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../store/ShoppingCart';
import { 
    selectOrderItems,
    REMOVE_PRODUCT,
    ADD_PRODUCT,
    RemoveProductAction,
    AddProductAction,
    actionCreators
} from '../store/ShoppingCart';

const makeList = (items: CartItem[], handleClick: any, removeOrderItem: any, incrementOrderItem: any) =>
    items.map((i) => {
        return (
        <tr key={i.id} onClick={() => handleClick(i.id)}>
            <td>{i.name}</td>
            <td>{i.price} kr</td>
            <td>{i.quantity}</td>
            <td>
                <Button outline color="primary" onClick={() => removeOrderItem(i)}>
                    <FontAwesomeIcon icon={faMinus}/>
                </Button>
                {'\u00A0'}
                <Button outline color="primary" onClick={() => incrementOrderItem(i)}>
                    <FontAwesomeIcon icon={faPlus}/>
                </Button>
            </td>
        </tr>
        );
    });

export default function ShoppingCartPage() {
    const items = useSelector(selectOrderItems);
    const dispatch = useDispatch();
    function selectOrderItem(id: number) {
    }
    function removeOrderItem(orderItm: CartItem) {
        const orderItem = {...orderItm};
        orderItem.quantity -= 1;
        dispatch({ type: REMOVE_PRODUCT, orderItem} as RemoveProductAction);
    }
    function incrementOrderItem(orderItm: CartItem) {
        const orderItem = {...orderItm};
        orderItem.quantity += 1;
        dispatch({ type: ADD_PRODUCT, orderItem} as AddProductAction);
    }
    let totalCost = 0 
    items.forEach(p => totalCost += p.price! * p.quantity);
    return (
        <Container>
            <table className={'table'}>
                <thead>
                    <tr>
                        <th scope="col">Namn</th>
                        <th scope="col">Pris</th>
                        <th scope="col">Antal</th>
                        <th scope="col">{'\u00A0'}</th>
                    </tr>
                </thead>
                <tbody>
                    {items && makeList(items, selectOrderItem, removeOrderItem, incrementOrderItem)}
                    <tr>
                        <td>totalkostnad</td>
                        <td>{totalCost} kr</td>
                        <td>{'\u00A0'}</td>
                        <td>{'\u00A0'}</td>
                    </tr>
                </tbody>
            </table>
            <Button disabled={items.length === 0} onClick={() => dispatch(actionCreators.postOrder())}>Skicka Order</Button>
        </Container>
    );
}
