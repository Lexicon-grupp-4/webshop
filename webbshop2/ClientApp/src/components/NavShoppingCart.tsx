import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOrderItems } from '../store/ShoppingCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function NavShoppingCart() {
    const items = useSelector(selectOrderItems);
    let nb = 0;
    if (items.length) {
        nb = items.map(a => a.quantity)
            .reduce((a, b) => a + b); // TODO count item.quantity
    }
    
    return (
        <NavItem>
            <NavLink tag={Link} className="text-dark" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart}/>({nb})
            </NavLink>
        </NavItem>
    )
}
