import { OrderDto } from './DomainClasses';
import { Order } from './orders.slice';
import { getToken } from '../services/authTokenService';

export const timeOptions = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
    hour12: false
};

// @ts-ignore
const formatTimeToLocal = new Intl.DateTimeFormat('sv-SE', timeOptions);

export function transformOrder(ordersDto: OrderDto) {
    const o = ordersDto as Order;
    o.localTime = formatTimeToLocal.format(new Date(o.date as string));
    return o;
}

function transformOrders(ordersDto: OrderDto[]) {
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
    return new Promise<{ orders: Order[] }>((resolve, reject) =>
        fetch(`/api/orders`, params)
            .then(response => {
                if (!response.ok) {
                    reject([]);
                    return [];
                }
                return response.json() as Promise<OrderDto[]>
            })
            .then((orderList: OrderDto[]) => {
                resolve({ orders: transformOrders(orderList)});
            })
    );
}

export function patchOrder(sentOrder: OrderDto) {
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        method: 'PATCH',
        body: JSON.stringify(sentOrder)
    }
    return new Promise<{ order: OrderDto }>((resolve, reject) =>
        fetch(`/api/orders`, params)
            .then(response => {
                if (!response.ok) {
                    const emptyResponse = {} as OrderDto;
                    reject(emptyResponse);
                    return emptyResponse;
                }
                return response.json() as Promise<OrderDto>
            })
            .then((updatedOrder) => {
                resolve({ order: transformOrder(updatedOrder)});
            })
    );
}
