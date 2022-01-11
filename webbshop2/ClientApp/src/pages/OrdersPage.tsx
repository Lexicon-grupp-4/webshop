import * as React from 'react';
import { useSelector } from 'react-redux';
// import { Button } from 'reactstrap';
import { Order } from '../store/Orders';
import { 
    selectOrders
} from '../store/Orders';

const makeList = (items: Order[], handleClick: any) =>
    items.map((i) => {
        return (
        <tr key={i.id} onClick={() => handleClick(i.id)}>
            <td>{i.id}</td>
            <td>{i.localTime}</td>
            <td>{i.status}</td>
        </tr>
        );
    });

export default function ShoppingCartPage() {
    const orders = useSelector(selectOrders);
    // const dispatch = useDispatch();
    function selectOrderItem(id: number) {
    }
    return (
        <>
            <table className={'table'}>
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Datum</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>{orders && makeList(orders, selectOrderItem)}</tbody>
            </table>
        </>
    );
}
