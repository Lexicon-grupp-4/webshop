import React from 'react';
import { useSelector } from 'react-redux';
import ProductList from '../../components/ProductList';
import { Container, TabContent, Nav, /*NavbarToggler,*/ NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { selectTopCategorys, Category } from '../../store/Categories';

export default function CategoriesNavMenu() {
    const topCats = useSelector(selectTopCategorys);
    return (
        <>
            <Container>
                <Nav tabs className={"nav nav-pills nav-fill"}>
                    {topCats.map((cat:Category) => {
                        return (
                            <NavItem key={cat.id} >
                                <NavLink tag={Link} className="text-dark" to="/">{cat.name}</NavLink>
                            </NavItem>
                        );
                    })}
                </Nav>
            </Container>
            <br />
            <TabContent activeTab={1}>
                <Container>
                    <ProductList />
                </Container>
            </TabContent>
        </>
    )
}
