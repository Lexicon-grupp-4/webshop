import { 
    Navbar, 
    Nav,
    Container
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { removeToken } from '../services/authTokenService';
import { push } from "connected-react-router";
import { useAppDispatch } from '../redux/hooks';

export default function NavMenu() {
    const dispatch = useAppDispatch();
    function handleLogout(){
        removeToken();
        dispatch(push('/login'));
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Webbshop Admin</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/ordrar">Ordrar</Nav.Link>
                        <Nav.Link as={Link} to="/produkter">Produkter</Nav.Link>
                        <Nav.Link as={Link} to="/kunder">Kunder</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
