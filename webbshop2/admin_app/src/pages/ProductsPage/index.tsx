import { Container, Row, Col } from 'react-bootstrap';
import ProductForm from './ProductForm';
import SearchProducts from './SearchProducts';

export default function ProductsPage() {
    // function test(){
    //     console.log('running test');
    // }
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
                    <br />
                    <SearchProducts />
                </Col>
            </Row>
        </Container>
    );
}
