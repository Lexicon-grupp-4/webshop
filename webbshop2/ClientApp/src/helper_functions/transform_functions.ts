import { Order } from '../store/Orders';
import { Category, categoryPaginationStart } from '../store/Categories';
import { Product } from '../store/Products';
import { prepairForUrl } from './string_functions';
import { CategoryDto } from '../store/DomainClasses';

export const timeOptions = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
    hour12: false
};

// Some object from the backend might need a small transformation before being displayed

export function transformOrders(orders: Order[]) {
    orders.forEach(o => {
        // @ts-ignore
        o.localTime = new Intl.DateTimeFormat('sv-SE', timeOptions)
            .format(new Date(o.date as string));
    });
}

export function transformCategories(cats: Category[]) {
    cats.forEach(c => {
        c.uriName = prepairForUrl(c.name);
        c.isSelected = true;
        c.pagination = { ...categoryPaginationStart };
    });
}

type CategoryIdToString = {
    [key: number]: string;
}

let sortIdx = 0;
let catIdToCatName: CategoryIdToString | undefined; // lookup table

function makeMapIdToCatName(cats: Category[]) {
    catIdToCatName = {};
    cats.forEach(c => catIdToCatName![c.id] = c.name);
}


export function transformProducts(prods: Product[], cats: Category[]) {
    if (!catIdToCatName) makeMapIdToCatName(cats);
    prods.forEach(p => {
        p.display = true;
        p.sortIdx = sortIdx++;
        p.categoryName = catIdToCatName![p.categoryId!];
    });
    prods.sort((a, b) => a.sortIdx - b.sortIdx);
    
}
