import { Order } from '../store/Orders';
import { Category, CategoryPagination } from '../store/Categories';
import { Product } from '../store/Products';
import { prepairForUrl } from './string_functions';

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
        c.pagination = { loadedPageIdx: -1, isFullyLoaded: false};
    });
}

export function transformProducts(prods: Product[]) {
    prods.sort((a, b) => a.id - b.id);
    prods.forEach(p => {
        p.display = true;
    });
}
