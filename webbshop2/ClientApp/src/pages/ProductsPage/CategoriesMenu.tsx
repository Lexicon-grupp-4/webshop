import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { selectCategorys, Category } from '../../store/Categories';
// import colors from '../../config/colors';

// TODO: 1) close menu 2) highlight selection

type OrdersTableProps = {
    cats: Category[],
    cat: Category,
    idx: number,
    setOpenTab: (id: number) => void,
    openTab: number
}

function SubCategoryMenu({cats, cat, idx, openTab, setOpenTab}: OrdersTableProps) {
    return (
        <Dropdown isOpen={openTab === idx} toggle={() => {}}>
            <DropdownToggle
                tag="span"
                style={{width: '100%'}}
                onMouseEnter={() => setOpenTab(idx)}
            >
                <NavLink 
                    tag={Link}
                    to={`/produkter/${cat.uriName}`}
                    className="text-dark"
                    onClick={() => setOpenTab(0)}
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
                                tag={Link}
                                to={`/produkter/${cat.uriName}/${cat2.uriName}`}
                                className="text-dark"
                                onClick={() => setOpenTab(0)}
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

export default function CategoriesMenu() {
    const cats = useSelector(selectCategorys);
    const [openTab, setOpenTab] = useState(0);
    return (
        <Nav className={"nav-fill"}>
            {cats.map((cat:Category, idx) => {
                if (cat.parentId !== 1) return null;
                return (
                    <NavItem key={cat.id} className={"table-hover"} >
                        <SubCategoryMenu 
                            cats={cats}
                            cat={cat}
                            idx={idx} 
                            setOpenTab={setOpenTab} 
                            openTab={openTab} 
                        />
                    </NavItem>
                );
            })}
        </Nav>
    );
}