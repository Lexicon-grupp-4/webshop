import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function NavOrders() {
    // const orders = useSelector(selectOrders);
    // const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoggedIn = true;
    // const count = orders.length;
    const count = 2;
    if (!isLoggedIn) return null;
    return (
        <NavItem>
            <NavLink tag={Link} className="text-dark" to="/orders">Ordrar ({count})</NavLink>
        </NavItem>
    )
}