import { 
    Navbar, 
    Nav,
    Container
} from 'react-bootstrap';
import CategoriesMenu from './CategoriesMenu';

export default function ProductsPage() {
    return (
        <Container>
            <CategoriesMenu />
            products page
        </Container>
    );
}