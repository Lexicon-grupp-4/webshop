import React from 'react';
import { useSelector } from 'react-redux';
import ProductList from '../../components/ProductList';
import { Container, TabContent, Nav, /*NavbarToggler,*/ NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from "react-router";
import { selectTopCategorys, Category } from '../../store/Categories';
import { prepairForUrl } from '../../helper_functions/string_functions';

interface MatchParams {
    cat1?: string;
}

function CategoriesNavMenu({ match }: RouteComponentProps<MatchParams>) {
    const topCats = useSelector(selectTopCategorys);
    const { cat1 } = match.params;
    console.log(cat1);
    return (
        <>
            <Container>
                <Nav tabs className={"nav nav-pills nav-fill"}>
                    {topCats.map((cat:Category) => {
                        const categoryName = prepairForUrl(cat.name); // TODO find a way to 
                        return (
                            <NavItem key={cat.id} >
                                <NavLink 
                                    tag={Link} 
                                    className="text-dark" 
                                    to={`/produkter/${categoryName}/`}
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
                    <ProductList cat1={cat1} />
                </Container>
            </TabContent>
        </>
    )
}

export default withRouter(CategoriesNavMenu);

