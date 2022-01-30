import { useSelector} from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';
import { 
    ListGroup, Table, Container, Row, Col, Button, ButtonGroup 
} from 'react-bootstrap';
import { selectOrders, Order, patchOrderAsync } from '../../redux/orders.slice';
import { OrderItemDto, OrderStatus } from '../../redux/DomainClasses';

type OrderItemProps = {
    item: OrderItemDto,
}

function OrderItem({ item }: OrderItemProps) {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
        </tr>
    )
}

type OrderProps = {
    order: Order,
}

function OrderViewer({ order }: OrderProps) {
    const dispatch = useAppDispatch();
    function approveOrder(order: Order) {
        // will try make the backend to take this order to status: Delivered
        const changed = {...order, status: OrderStatus.InTransit};
        dispatch(patchOrderAsync(changed));
    }
    function cancelOrder(order: Order) {
        order.status = OrderStatus.Cancelled;
        dispatch(patchOrderAsync(order));
    }
    return (
        <ListGroup.Item>
            <Container>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Vara</th>
                                    <th>Pris</th>
                                    <th>Antal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map(i => <OrderItem key={i.id} item={i} />)}
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        Order nb: {order.id} <br />
                        Datum: {order.localTime} <br />
                        Status: {order.status} <br />

                        { order.status! === OrderStatus.Processing.toString() && (
                            <ButtonGroup aria-label="Basic example">
                                <Button onClick={() => approveOrder(order)}>Godkänn</Button>
                                <Button onClick={() => cancelOrder(order)}>Avbryt</Button>
                            </ButtonGroup>
                        )} 
                        
                        { order.status! === OrderStatus.InTransit.toString() && (
                            <ButtonGroup aria-label="Basic example">
                                <Button>Avbryt</Button>
                            </ButtonGroup>
                        )}
                        
                    </Col>
                </Row>
            </Container>
        </ListGroup.Item>
    );
}

export default function OrdersList() {
    const orders = useSelector(selectOrders);
    return (
        <ListGroup>
            {orders.map(o => <OrderViewer key={o.id} order={o} />)}
        </ListGroup>
    );
}
