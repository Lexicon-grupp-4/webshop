import React, { useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import NavLoginTab from './NavLoginTab';
import NavShoppingCart from './NavShoppingCart';
import NavOrders from './NavOrders';
import './NavMenu.css';

export default function NavMenu() {
    const [isOpen, setOpen] = useState(false);
    function toggle() {
        setOpen(!isOpen);
    }
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">webbshop2</NavbarBrand>
                    <NavbarToggler onClick={toggle} className="mr-2"/>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={isOpen} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Artiklar</NavLink>
                            </NavItem>
                            <NavOrders />
                            <NavShoppingCart />
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/aboutcontactpage">Kontakt & Info</NavLink>
                            </NavItem>
                            <NavLoginTab />
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
