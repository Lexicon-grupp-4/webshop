// import { getToken } from '../services/authTokenService';
import { ProductDto } from './DomainClasses';
import { Product } from './products.slice';

export function transformProducts(prods: Product[]) {
    prods.forEach(p => {
        p.display = true
    });
    return prods;
}

export function fetchProducts() {
    return new Promise<{ products: Product[] }>((resolve) =>
        fetch(`api/products`)
            .then(response => response.json() as Promise<Product[]>)
            .then((products: ProductDto[]) => {
                resolve({ products: transformProducts(products as Product[])});
            })
    );
}
