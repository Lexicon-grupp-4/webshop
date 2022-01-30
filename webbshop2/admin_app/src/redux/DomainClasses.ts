// These types are used for for both redux storage and communicate with backend.

export interface OrderItemDto {
    id: number;
    quantity: number;
    productId?: number;
    price?: number;
    name?: string;
}

export enum OrderStatus {
    Processing = 'Processing',
    InTransit = 'InTransit',
    Cancelled = 'Cancelled',
    Delivered = 'Delivered',
    Problem = 'Problem'
}

export interface OrderDto {
    id?: number;
    items: OrderItemDto[];
    date?: string; // string for now
    status?: OrderStatus; // string for now, maybe enum
}

export interface ProductDto {
    id: number;
    name: string;
    price: number;
    quantity: number;
    categoryId?: number;
}

export interface CategoryDto {
    id: number;
    name: string;
    parentId: number;
}

export enum Role {
    User,
    Admin
}

export interface User {
    id: number;
    name: number;
    email: string;
    role: Role;
}

export interface PasswordLoginResponseDto {
    jwt: string,
    user: User
}

// maybe it's just identical to product
export interface CartItem extends ProductDto {}