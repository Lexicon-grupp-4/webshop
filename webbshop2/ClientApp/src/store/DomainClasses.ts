// These types are used for for both redux storage and communicate with backend.

export interface OrderItemDto {
    id: number;
    quantity: number;
    productId?: number;
    price?: number;
}
export interface OrderDto {
    id?: number;
    items: OrderItemDto[];
    date?: string; // string for now
    status?: string; // string for now, maybe enum
}
export interface ProductDto {
    id: number;
    name: number;
    price: number;
    quantity: number;
}

// maybe it's just identical to product
export interface CartItem extends ProductDto {}
