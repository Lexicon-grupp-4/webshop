
import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, User, actionCreators } from '../store/Auth';

export default function NavLoginTab() {
    const user = useSelector(selectUser) as User;
    const dispatch = useDispatch();
    function logout() {
        // @ts-ignore: Thunk
        dispatch(actionCreators.logout());
    }
    if (user) {
        return (
            <NavItem onClick={logout}>
                {/* maybe its risky to do action on link */}
                <NavLink tag={Link}  className="text-dark" to="/login">Logout {user.name}</NavLink>
            </NavItem>
        )
    }
    return (
        <NavItem>
            <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
        </NavItem>
    )
}