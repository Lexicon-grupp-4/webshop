import { CategoryDto } from './DomainClasses';
import { Category } from './categories.slice';
import { prepairForUrl } from '../helpers/string_functions';

function transformCategories(cats: CategoryDto[]) {
    const categories = cats.map(c => {
        const d = c as Category;
        d.uriName = prepairForUrl(c.name);
        d.isSelected = true;
        return d;
    })
    return categories;
}

export function fetchCategories() {
    return new Promise<{ categories: Category[] }>((resolve) =>
        fetch(`/api/categories`)
            .then(response => response.json() as Promise<CategoryDto[]>)
            .then((categories: CategoryDto[]) => {
                resolve({ categories: transformCategories(categories)});
            })
    );
}
