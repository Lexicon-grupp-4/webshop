import { Order } from '../store/Orders';

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
