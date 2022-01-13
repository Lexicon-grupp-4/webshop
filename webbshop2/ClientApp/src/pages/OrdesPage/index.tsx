import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { Order } from '../../store/Orders';
import { 
    selectOrders
} from '../../store/Orders';
import OrdersTable from './OrdersTable';
import InspectOrder from './InspectedOrder';

export default function OrdersPage() {
    const orders = useSelector(selectOrders);
    const [order, setOrder] = useState<Order | undefined>(undefined);
    useEffect(() => {
        if (orders.length > 0) setOrder(orders[0]);
    }, [orders]);
    function handleSelectOrderItem(id: number) {
        const ord = orders.find(o => o.id === id);
        setOrder(ord as Order);
    }
    return (
        <Container>
            <Row>
                <Col xs="12" sm="6">
                    <OrdersTable
                        orders={orders}
                        selecteOrderId={order?order.id!:0} 
                        handleSelectOrderItem={handleSelectOrderItem} 
                    />
                </Col>
                <Col xs="12" sm="6">
                    <InspectOrder order={order}/>
                </Col>
            </Row>
        </Container>
    );
}
