import { Container, Row, Col } from 'react-bootstrap';
import ProductForm from './ProductForm';

export default function ProductsPage() {
    return (
        <Container>
            <Row>
                <Col>
                    <Container>
                        <br />
                        <h1>Skapa</h1>
                        <br />
                        <ProductForm />
                    </Container>
                </Col>
                <Col>
                    <br />
                    <h1>Sök</h1>
                </Col>
            </Row>
        </Container>
    );
}
