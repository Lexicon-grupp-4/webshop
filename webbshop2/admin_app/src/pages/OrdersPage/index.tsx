import { 
    Container
} from 'react-bootstrap';
import OrdersList from './OrdersList';

export default function OrdersPage() {
    return (
        <Container>
            <h1>Order Sida</h1>
            <OrdersList />
        </Container>
    );
}