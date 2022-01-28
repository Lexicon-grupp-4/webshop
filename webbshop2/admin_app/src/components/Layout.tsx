import * as React from 'react';
import NavMenu from './NavMenu';

const Layout = (props: { children?: React.ReactNode }) => (
    <>
        <NavMenu/>
        {props.children}
    </>
);

export default Layout;
