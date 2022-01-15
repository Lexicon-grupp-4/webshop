import React from 'react';
import { useSelector } from 'react-redux';
import ProductList from '../../components/ProductList';
import { Container, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { selectTopCategorys, Category } from '../../store/Categories';
import colors from '../../config/colors';

function ProductPage() {
    const topCats = useSelector(selectTopCategorys);
    const selStyle = {backgroundColor: colors.active_table_row};
    return (
        <>
            <Container>
                <Nav tabs className={"nav nav-pills nav-fill"}>
                    {topCats.map((cat:Category) => {
                        const { isSelected } = cat;
                        return (
                            <NavItem key={cat.id} >
                                <NavLink 
                                    tag={Link} 
                                    className="text-dark"
                                    style={isSelected?selStyle:undefined}
                                    to={`/produkter/${cat.uriName}/`}
                                >
                                    {cat.name}
                                </NavLink>
                            </NavItem>
                        );
                    })}
                </Nav>
            </Container>
            <br />
            <TabContent activeTab={1}>
                <Container>
                    <ProductList cat1={'cat1'} />
                </Container>
            </TabContent>
        </>
    )
}

export default ProductPage;
