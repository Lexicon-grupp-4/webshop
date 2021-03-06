// These types are used for for both redux storage and communicate with backend.

export interface OrderItemDto {
    id?: number;
    quantity: number;
    productId?: number;
    price?: number;
    name?: string;
}

export interface OrderDto {
    id?: number;
    items: OrderItemDto[];
    date?: string; // string for now
    status?: string; // string for now, maybe enum
}

export interface ProductDto {
    id: number;
    name: string;
    price: number;
    quantity: number;
    categoryId?: number;
    pictureUrl?: string;
}

export interface CategoryDto {
    id: number;
    name: string;
    parentId: number;
}


