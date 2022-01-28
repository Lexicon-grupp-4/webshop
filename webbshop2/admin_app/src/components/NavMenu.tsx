import { 
    Navbar, 
    Nav,
    Container
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavMenu.css';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function NavMenu() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Webbshop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/produkter">Produkter</Nav.Link>
                        <Nav.Link as={Link} to="/ordrar">Ordrar</Nav.Link>
                        <Nav.Link as={Link} to="/varukorg"><FontAwesomeIcon icon={faShoppingCart}/></Nav.Link>
                        <Nav.Link href="#deets">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
