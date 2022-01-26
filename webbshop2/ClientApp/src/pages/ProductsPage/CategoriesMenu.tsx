import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { selectCategorys, Category } from '../../store/Categories';
import { CHANGE_CATEGORY_NAV, ChangeCategoryNavigationAction } from '../../store/AppLogicMiddleware'; 
import classNames from 'classnames';
import { withRouter, RouteComponentProps } from "react-router";
import './CategoriesMenu.css';

// TODO: 1) close menu 2) highlight selection

type OrdersTableProps = {
    cats: Category[],
    cat: Category,
    idx: number,
    setOpenTab: (id: number) => void,
    openTab: number,
    matchCat1: boolean
}

function SubCategoryMenu({cats, cat, idx, openTab, setOpenTab, matchCat1}: OrdersTableProps) {
    const dispatch = useDispatch()
    const cssClasses = classNames({
        'categories-menu-subcat1-active': matchCat1,
        'categories-menu-cat-name': true,
        'categories-menu-subcat1-name': !matchCat1,
    });
    function handleClick(tabIdx: number, cat1Id?: number, cat2Id?: number) {
        setOpenTab(tabIdx);
        dispatch({type: CHANGE_CATEGORY_NAV, cat1Id, cat2Id} as ChangeCategoryNavigationAction);
        // console.log('CLICKKKKK')
    }
    return (
        <Dropdown isOpen={openTab === idx} toggle={() => {if(openTab !== 0) setOpenTab(0)}}>
            <DropdownToggle
                tag="span"
                style={{width: '100%'}}
                onMouseEnter={() => setOpenTab(idx)}
            >
                <NavLink 
                    // tag={Link}
                    // to={`/produkter/${cat.uriName}`}
                    className={cssClasses}
                    onClick={() => handleClick(0, cat.id)}
                >
                    {cat.name}
                </NavLink>
            </DropdownToggle>
            <DropdownMenu style={{marginTop: 0}}>
                {cats.map((cat2:Category) => {
                    if (cat2.parentId !== cat.id) return null;
                    return (
                        <DropdownItem key={cat2.id}>
                            <NavLink 
                                // tag={Link}
                                // to={`/produkter/${cat.uriName}/${cat2.uriName}`}
                                className="text-dark categories-menu-cat-name"
                                onClick={() => handleClick(0, cat.id, cat2.id)}
                            >
                                {cat2.name}
                            </NavLink>
                        </DropdownItem>
                    )
                })}
            </DropdownMenu>
        </Dropdown>
    );
}

type TParams =  { cat1: string, cat2: string};

export function CategoriesMenu({ match }: RouteComponentProps<TParams> ) {
    const cats = useSelector(selectCategorys);
    const [openTab, setOpenTab] = useState(0);
    return (
        <Nav className={"nav-fill"}>
            {cats.map((cat:Category, idx) => {
                const matchCat1 = match.params.cat1 === cat.uriName;
                // const matchCat2 = match.params.cat2 === cat.uriName;
                if (cat.parentId !== 1) return null;
                return (
                    <NavItem key={cat.id} className={"table-hover"} >
                        <SubCategoryMenu 
                            cats={cats}
                            cat={cat}
                            idx={idx}
                            matchCat1={matchCat1}
                            setOpenTab={setOpenTab} 
                            openTab={openTab} 
                        />
                    </NavItem>
                );
            })}
        </Nav>
    );
}

export default withRouter(CategoriesMenu);
