import { OrderDto } from './DomainClasses';
import { Order } from './orders.slice';
import { getToken } from '../services/authTokenService';

export const timeOptions = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
    hour12: false
};

function transformOrders(ordersDto: OrderDto[]) {
    // @ts-ignore
    const formatTimeToLocal = new Intl.DateTimeFormat('sv-SE', timeOptions);
    const orders = ordersDto.map(c => {
        const o = c as Order;
        o.localTime = formatTimeToLocal.format(new Date(o.date as string));
        return o;
    })
    return orders;
}

export function fetchOrders() {
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    }
    return new Promise<{ categories: Order[] }>((resolve) =>
        fetch(`/api/orders`, params)
            .then(response => response.json() as Promise<OrderDto[]>)
            .then((categories: OrderDto[]) => {
                resolve({ categories: transformOrders(categories)});
            })
    );
}
