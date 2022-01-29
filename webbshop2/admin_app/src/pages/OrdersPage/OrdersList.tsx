import { useSelector} from 'react-redux';
import { 
    ListGroup, Table, Container, Row, Col, Button
} from 'react-bootstrap';
import { selectOrders, Order } from '../../redux/orders.slice';
import { OrderItemDto } from '../../redux/DomainClasses';

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
                        <Button >Godkänn</Button>
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
