import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOrderItems } from '../store/ShoppingCart';

export default function NavShoppingCart() {
    const items = useSelector(selectOrderItems);
    const count = items.length; // TODO count item.quantity
    return (
        <NavItem>
            <NavLink tag={Link} className="text-dark" to="/cart">Varukorg ({count})</NavLink>
        </NavItem>
    )
}
