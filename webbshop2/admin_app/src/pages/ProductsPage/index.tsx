import { Container, Row, Col } from 'react-bootstrap';
import ProductForm from './ProductForm';

export default function ProductsPage() {
    return (
        <Container>
            <Row>
                <Col>
                    <Container>
                        <br />
                        <h1>Skapa Produkt</h1>
                        <br />
                        <ProductForm />
                    </Container>
                </Col>
                <Col>
                    <h1>Produkt Sida</h1>
                </Col>
            </Row>
        </Container>
    );
}
