import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    // Navbar, 
    Nav,
    // Container
} from 'react-bootstrap';
import { selectCategories, Category } from '../../redux/categories.slice';

export default function CategoriesMenu() {
    const cats = useSelector(selectCategories);
    // const [openTab, setOpenTab] = useState(0);
    return (
        <Nav className={"nav-fill"}>
            {cats.map((cat:Category, idx) => {
                if (cat.parentId !== 1) return null;
                return (
                    <Nav.Link key={cat.id} as={Link} to="/produkter" >
                        {cat.name}
                    </Nav.Link>
                );
            })}
        </Nav>
    );
}