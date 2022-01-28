import { 
    Container
} from 'react-bootstrap';
import CategoriesMenu from './CategoriesMenu';
import ProductList from './ProductList';

export default function ProductsPage() {
    return (
        <Container>
            <br />
            <CategoriesMenu />
            <br />
            <ProductList />
        </Container>
    );
}
