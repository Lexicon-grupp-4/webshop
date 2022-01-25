import * as React from 'react';
import NavMenu from './NavMenu';

export default (props: { children?: React.ReactNode }) => (
    <div className="produts-page">
        <NavMenu/>
        {props.children}
    </div>
);
