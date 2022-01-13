import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Order } from '../../store/Orders';

type InspectOrderProps = {
    order: Order | undefined
}

export default function InspectOrder({ order }: InspectOrderProps) {
    if (!order) return (<div>no order</div>);
    const { items } = order;
    return (
        <ListGroup>
            Order: {order!.id}
            {
                items.map((o) => {
                    // TODO: add more item info
                    return (
                    <ListGroupItem key={o.id}>
                        <h4>{o.name}</h4>
                        <p>Antal: {o.quantity}</p>
                        <p>Pris: {o.price}</p>
                    </ListGroupItem>
                    );
                })
            }
        </ListGroup>
    );
}
