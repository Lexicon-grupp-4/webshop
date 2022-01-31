import { CategoryDto } from './DomainClasses';
import { Category } from './categories.slice';
import { prepairForUrl } from '../helpers/string_functions';

function setHierarchicalName(cat: Category, cats: CategoryDto[]) {
    if (cat.parentId !== 0) {
        const parent = cats.find(p => p.id === cat.parentId);
        cat.hierarchicalName = `${cat.name}`;
        if (!!parent && parent.parentId !== 1) {
            // top categories, 1 step under root
            cat.hierarchicalName = `${cat.name}`;
        } else if (!!parent) {
            cat.hierarchicalName = `${parent.name} > ${cat.name}`;
        }
    } else {
        cat.hierarchicalName = 'root';
    }
}

function transformCategories(cats: CategoryDto[]) {
    const categories = cats.map(c => {
        const d = c as Category;
        d.uriName = prepairForUrl(c.name);
        setHierarchicalName(d, cats);
        d.isSelected = true;
        console.log(d.hierarchicalName);
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
